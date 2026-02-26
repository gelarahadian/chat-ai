"use client";

import { useMe } from "@/src/hooks/use-auth";
import NewChatForm from "./components/new-chat-form";
import Header from "./components/Header";

export default function Home() {
  const { data: me } = useMe();
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Chat AI {me?.data.name}
          </h1>
          <p className="text-lg mb-4">
            Ask anything and get intelligent responses
          </p>
          <NewChatForm />
        </div>
      </div>
    </div>
  );
}
