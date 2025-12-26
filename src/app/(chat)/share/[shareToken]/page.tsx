"use client";

import Header from "../../components/Header";
import { use } from "react";
import { useGetShareConversation } from "@/src/hooks/use-share";
import ListChat from "../../components/ListChat";

const page = ({ params }: { params: Promise<{ shareToken: string }> }) => {
  const { shareToken } = use(params);

  const { data, isLoading } = useGetShareConversation(shareToken);

  const conversation = data?.data.data.conversation;

  return (
    <>
      <Header />
      <div className="relative w-full lg:px-4 pt-12 ">
        <ListChat messages={conversation?.messages} />
      </div>
    </>
  );
};

export default page;
