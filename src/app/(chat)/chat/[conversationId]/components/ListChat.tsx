import { Badge } from '@/src/components/ui/badge';
import { FC, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ListChatProps {
  messages: any;
}

const ListChat: FC<ListChatProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);
  return (
    <div ref={bottomRef} className="max-w-4xl mx-auto space-y-5 pb-28">
      {messages?.map((message: any) => (
        <div key={message._id}>
          {message.role === "user" ? (
            <div className="flex justify-end w-full ">
              <div className="max-w-xl bg-gray-200 px-3 py-1.5 rounded-md">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="prose prose-neutral max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
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