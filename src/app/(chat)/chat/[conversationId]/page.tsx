'use client'

import { useGetConversationById } from "@/src/hooks/use-conversation";
import { use, useEffect } from "react";
import ListChat from "../../components/ListChat";
import FormQuestion from "../../components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";
import Header from "../../components/Header";
import { useScrollMessages } from "@/src/contexts/scroll-message-context";

const page = ({ params }: { params: Promise<{ conversationId: string }> }) => {
  const { conversationId } = use(params);
  const { data, isLoading } = useGetConversationById(conversationId);
  const createChatMutation = useCreateChat();
  const { setMessages, containerRef } = useScrollMessages();

  const messages = data?.data?.data.messages;

  useEffect(() => {
    if (messages) {
      setMessages(messages);
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="overflow-y-auto w-full">
      <Header conversationId={conversationId} />
      <div className="relative w-full min-h-full flex flex-col justify-between lg:px-4 pt-4 ">
        <ListChat conversationId={conversationId} />
        {!isLoading && (
          <FormQuestion
            conversationId={conversationId}
            createChatMutation={createChatMutation}
          />
        )}
      </div>
    </div>
  );
};

export default page