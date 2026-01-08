'use client'

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { useChat } from "@/src/contexts/chat-context";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

const NewChatForm = () => {
  const [input, setInput] = useState<string>("");
  const { sendMessage, status } = useChat();

  const handleChat = (e: any) => {
    e.preventDefault();
    sendMessage({ input });
  };
  return (
    <div className="max-w-3xl w-full bg-gray-100 rounded-4xl">
      <form id="form-question" onSubmit={handleChat}>
        <div className="flex justify-between items-end space-x-4 px-3">
          <Textarea
            onChange={(e: any) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="border-none max-h-96 focus-visible:ring-0"
          />
          <Button
            size={"icon-lg"}
            className={`mb-3 rounded-full cursor-pointer ${
              status === "pending" ? "animate-pulse" : ""
            }`}
            disabled={status === "pending" || !input}
            type="submit"
          >
            <ArrowUp />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewChatForm