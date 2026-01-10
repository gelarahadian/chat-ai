import { ChatProvider } from '@/src/contexts/chat-context'
import { ScrollConversationProvider } from "@/src/contexts/scroll-conversation-context";
import { ScrollMessageProvider } from "@/src/contexts/scroll-message-context";
import React from "react";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      <ScrollMessageProvider>
        <ScrollConversationProvider>{children}</ScrollConversationProvider>
      </ScrollMessageProvider>
    </ChatProvider>
  );
};

export default ContextProvider