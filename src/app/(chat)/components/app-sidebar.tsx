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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { useGetConversations } from "../../../hooks/use-conversation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiConversation } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ChevronUp, MessageSquareMore, User2 } from "lucide-react";
import { useMe } from "../../../hooks/use-auth";

export function AppSidebar() {
  const { open } = useSidebar();
  const router = useRouter();

  const meMutation = useMe();
  const getConversationsMutation = useGetConversations();

  useEffect(() => {
    meMutation.mutate();
    getConversationsMutation.mutate();
  }, []);

  const user = meMutation.data?.data.user;
  const conversations = getConversationsMutation.data?.data.conversations;

  const handleSingOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          {open && <span>Chat AI</span>}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className={`${!open && "p-2"}`}>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <MessageSquareMore />
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
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.name ? user.name : "Username"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[240px]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSingOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
