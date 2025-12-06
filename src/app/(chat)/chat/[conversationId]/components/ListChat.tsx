import { Badge } from '@/src/components/ui/badge';
import { FC, useEffect, useRef } from "react";

interface ListChatProps {
  messages: any;
}

const ListChat: FC<ListChatProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);
  return (
    <div ref={bottomRef} className="max-w-5xl mx-auto space-y-5 pb-28">
      {messages?.map((message: any) => (
        <div key={message._id}>
          {message.role === "user" ? (
            <div className="flex justify-end w-full ">
              <Badge variant={"secondary"} className="text-base">
                {message.content}
              </Badge>
            </div>
          ) : (
            <div>{message.content}</div>
          )}
        </div>
      ))}
      <div />
    </div>
  );
};

export default ListChat