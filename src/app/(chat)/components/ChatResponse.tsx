"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import { useChat } from "@/src/contexts/chat-context";
import { useQueryClient } from "@tanstack/react-query";

const TYPING_SPEED = 25;
const INTERVAL = 1000 / TYPING_SPEED;

const ChatResponse = ({conversationId}: {conversationId: string}) => {
  const queryClient = useQueryClient();
  const { bufferRef, status, setStatus } = useChat();
  const [typingFinished, setIsTypingFinished] = useState(false)
  const [message, setMessage] = useState("");
  const lastLengthRef = useRef(0);

  useEffect(() => {
    if (status !== "pending" && status !== "stream_done") return;

    const interval = setInterval(() => {
      if (bufferRef.current.length === 0) return 

      const fullText = bufferRef.current;

      // ambil HANYA teks baru
      if (fullText.length > lastLengthRef.current) {
          const currentLength = lastLengthRef.current;

          const speed = currentLength < 50 ? 1 : currentLength < 200 ? 2 : 4;
          const newText = fullText.slice(
            lastLengthRef.current,
            lastLengthRef.current + speed
          );
        setMessage((prev) => prev + newText);
        lastLengthRef.current += newText.length;
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "pending") {
      setMessage("");
      lastLengthRef.current = 0;
    }
  }, [status]);

  useEffect(() => {
    if (
      status === "stream_done" &&
      message.length === bufferRef.current.length &&
      message.length > 0
    ) {
      setIsTypingFinished(true);
    }
  }, [message, status]);

  useEffect(() => {
    if (typingFinished) {
      setStatus("finished");
    }
  }, [typingFinished]);

  useEffect(() => {
    if (status === "finished") {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });

      setIsTypingFinished(false);
      setMessage("");
    }
  }, [status]);

  function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return extractText(element.props.children);
    }
    return "";
  }

  return (
    <>
      {status !== "finished" ? (
        <p className="whitespace-pre-wrap">{message}</p>
      ) : (
        <div className="prose prose-neutral max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p({ children }) {
                if (
                  Array.isArray(children) &&
                  children.some(
                    (child: any) =>
                      child?.type === "pre" || child?.type === "div"
                  )
                ) {
                  return <>{children}</>;
                }
                return <p>{children}</p>;
              },

              code({ className, children }) {
                const lang = className?.replace("language-", "") ?? "text";

                return (
                  <CodeBlock language={lang} code={extractText(children)} />
                );
              },
              pre({ children }) {
                return <>{children}</>;
              },
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default ChatResponse;
