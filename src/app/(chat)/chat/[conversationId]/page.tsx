'use client'

import { useGetConversationById } from "@/src/hooks/use-conversation";
import { use, useEffect } from "react";
import ListChat from "../../components/ListChat";
import FormQuestion from "../../components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";
import Header from "../../components/Header";

const page = ({ params }: { params: Promise<{ conversationId: string }> }) => {
  const { conversationId } = use(params);

  const { data, isLoading } = useGetConversationById(conversationId);
  const createChatMutation = useCreateChat();

  const conversation = data?.data.conversation;
  return (
    <>
      <Header conversationId={conversationId} />
      <div className="relative w-full lg:px-4 pt-12 ">
        <ListChat messages={conversation?.messages} />
        {conversation && (
          <FormQuestion
            conversationId={conversation._id}
            createChatMutation={createChatMutation}
          />
        )}
      </div>
    </>
  );
};

export default page