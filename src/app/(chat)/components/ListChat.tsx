import React, { FC, useEffect, useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import ChatResponse from "./ChatResponse";
import { useScrollMessages } from "@/src/contexts/scroll-message-context";

interface ListChatProps {
  conversationId?: string;
}

const ListChat: FC<ListChatProps> = ({ conversationId }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { visibleMessages, shouldAutoScrollRef } = useScrollMessages();

  useEffect(() => {
    if (!bottomRef.current) return;

    const container = bottomRef.current.parentElement;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!shouldAutoScrollRef.current) return;

      bottomRef.current?.scrollIntoView({
        behavior: "auto",
      });
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

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
    <div className="max-w-4xl w-full mx-auto space-y-5 pb-4">
      {visibleMessages?.map((message: any) => (
        <div key={message._id}>
          {message.role === "user" ? (
            <div className="flex justify-end w-full ">
              <div className="max-w-xl bg-gray-200 px-3 py-1.5 rounded-md">
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
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
                    return <>{children}</>;
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
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
      {conversationId && <ChatResponse conversationId={conversationId} />}
      <div ref={bottomRef} />
      <div />
    </div>
  );
};

export default ListChat;
