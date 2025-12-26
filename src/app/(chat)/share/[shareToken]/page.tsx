"use client";

import Header from "../../components/Header";
import { use } from "react";
import { useGetShareConversation } from "@/src/hooks/use-share";
import ListChat from "../../components/ListChat";
import FormQuestion from "../../components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";

const page = ({ params }: { params: Promise<{ shareToken: string }> }) => {
  const { shareToken } = use(params);

  const { data, isLoading } = useGetShareConversation(shareToken);
  const createChatMutation = useCreateChat();

  const conversation = data?.data.data.conversation;
  const chatIds = conversation?.messages.map((chat: any) => chat._id);

  return (
    <>
      <Header />
      <div className="relative w-full lg:px-4 pt-12 ">
        <ListChat messages={conversation?.messages} />
        {conversation && (
          <FormQuestion
            createChatMutation={createChatMutation}
            chatIds={chatIds}
          />
        )}
      </div>
    </>
  );
};

export default page;
