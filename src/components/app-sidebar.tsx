'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useGetConversations } from "../hooks/use-conversation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiConversation } from "react-icons/bi";

export function AppSidebar() {
  const {open} = useSidebar();
    const router = useRouter();

    const getConversationsMutation = useGetConversations();

    useEffect(() => {
        getConversationsMutation.mutate();
    }, []);

    const conversations = getConversationsMutation.data?.data.conversations;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>

          <div className="flex justify-between items-center">
            {open && <span>Chat AI</span>}
            <SidebarTrigger/>
          </div>

      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <BiConversation />
                  <span>Your Conversations</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {getConversationsMutation.status === "success" &&
                    conversations?.map((conversation: any) => (
                      <SidebarMenuButton
                        key={conversation._id}
                        onClick={() => router.push(`/chat/${conversation._id}`)}
                      >
                        {" "}
                        <span className="block w-full truncate">
                          {conversation.title}
                        </span>
                      </SidebarMenuButton>
                    ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton>Item 1</SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
