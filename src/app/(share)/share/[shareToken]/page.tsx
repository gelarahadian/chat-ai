"use client";

import Header from "../../../(chat)/components/Header";
import { use } from "react";
import { useGetShareConversation } from "@/src/hooks/use-share";
import FormQuestion from "../../../(chat)/components/FormQuestion";
import { useCreateChat } from "@/src/hooks/use-chat";
import ShareListChat from "./components/ShareListChat";

const page = ({ params }: { params: Promise<{ shareToken: string }> }) => {
  const { shareToken } = use(params);

  const { data } = useGetShareConversation(shareToken);
  const createChatMutation = useCreateChat();

  const conversation = data?.data.data.conversation;
  const chatIds = conversation?.messages.map((chat: any) => chat._id);

  return (
    <>
      <div className="relative w-full lg:px-4 pt-12 ">
        <Header />
        <ShareListChat messages={conversation?.messages} />
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
