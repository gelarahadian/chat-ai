"use client";

import Header from "../../../(chat)/components/Header";
import { use, useEffect } from "react";
import { useGetShareConversation } from "@/src/hooks/use-share";
import FormQuestion from "../../../(chat)/components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";
import { useScrollMessages } from "@/src/contexts/scroll-message-context";
import ListChat from "@/src/app/(chat)/components/ListChat";

const page = ({ params }: { params: Promise<{ shareToken: string }> }) => {
  const { shareToken } = use(params);
  const { setMessages, containerRef } = useScrollMessages();

  const { data } = useGetShareConversation(shareToken);
  const createChatMutation = useCreateChat();

  const messages = data?.data.data.conversation.messages;

  useEffect(() => {
    if (messages) {
      setMessages(messages);
    }
  }, [messages]);

  const chatIds = messages?.map((chat: any) => chat._id);

  return (
    <div ref={containerRef} className="overflow-y-auto w-full">
      <Header />
      <div className="relative w-full h-full flex flex-col justify-between lg:px-4 pt-4 ">
        <ListChat />
        {messages && (
          <FormQuestion
            createChatMutation={createChatMutation}
            chatIds={chatIds}
          />
        )}
      </div>
    </div>
  );
};

export default page;
