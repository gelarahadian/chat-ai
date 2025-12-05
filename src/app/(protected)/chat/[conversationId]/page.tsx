'use client'

import { useGetConversationById } from "@/src/hooks/use-conversation";
import { use, useEffect } from "react";
import ListChat from "./components/ListChat";
import FormQuestion from "./components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";


const page = ({params}: {params: Promise<{conversationId: string}>}) => {
  const {conversationId} = use(params);

  const getConversationByIdMutation = useGetConversationById(conversationId);
  const createChatMutation = useCreateChat();

  useEffect(() => {
    getConversationByIdMutation.mutate();
  }, []);

  const conversation = getConversationByIdMutation.data?.data.conversation;
  return (
    <div className="relative w-full lg:px-4 pt-4">
      <ListChat messages={conversation?.messages} />
      {conversation && (
        <FormQuestion
          conversationId={conversation._id}
          createChatMutation={createChatMutation}
          getConversationByIdMutation={getConversationByIdMutation}
        />
      )}
    </div>
  );
}

export default page