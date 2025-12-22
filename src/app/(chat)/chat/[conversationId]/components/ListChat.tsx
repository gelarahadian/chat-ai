import { Badge } from '@/src/components/ui/badge';
import React, { FC, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface ListChatProps {
  messages: any;
}

const ListChat: FC<ListChatProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
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

  // console.log(messages[1]?.content);

  return (
    <div ref={bottomRef} className="max-w-4xl mx-auto space-y-5 pb-28">
      {messages?.map((message: any) => (
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
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
      <div />
    </div>
  );
};

export default ListChat