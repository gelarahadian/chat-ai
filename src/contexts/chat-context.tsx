'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

type ChatStatus = "idle" | "pending" | "stream_done" | "typing" | "finished";

interface ChatContextType {
  sendMessage: ({
    input,
    conversationId,
    chatIds,
  }: {
    input: string;
    conversationId?: string | null;
    chatIds?: string[];
  }) => void;
  bufferRef: React.RefObject<string>;
  status: ChatStatus;
  setStatus: Dispatch<SetStateAction<ChatStatus>>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const bufferRef = useRef("");
  const { token } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const sendMessage = async ({
    input,
    conversationId,
    chatIds,
  }: {
    input: string;
    conversationId?: string | null;
    chatIds?: string[];
  }) => {
    if (!token) {
      toast.error("You are not logged in");
      router.push("/auth/sign-in");
      return;
    }
    setStatus("pending");

    bufferRef.current = "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/stream`, {
      method: "POST",
      body: JSON.stringify({ input, conversationId, chatIds }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        decoder.decode();
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n\n");

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const data = JSON.parse(line.replace("data: ", ""));

        console.log(bufferRef);

        if (data.type === "meta") {
          router.push(`/chat/${data.conversationId}`);
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          queryClient.invalidateQueries({
            queryKey: ["conversation", conversationId],
          });
        } else if (data.type === "token") {
          bufferRef.current += data.token;
        } else if (data.type === "done") {
          setStatus("stream_done");
        }
      }
    }
  };
  return (
    <ChatContext.Provider value={{ sendMessage, bufferRef, status, setStatus }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
    const context =  useContext(ChatContext);
    if(!context) {
        throw new Error("useChat must be used within a ChatContextProvider");
    }
    return context;
}