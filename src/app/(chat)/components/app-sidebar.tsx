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
import {
  ChevronUp,
  MessageSquareMore,
  Search,
  SquarePen,
  User2,
} from "lucide-react";
import { useMe } from "../../../hooks/use-auth";

export function AppSidebar() {
  const { open } = useSidebar();
  const router = useRouter();

  const meMutation = useMe();
  const { data, isLoading } = useGetConversations();

  useEffect(() => {
    meMutation.mutate();
  }, []);

  const user = meMutation.data?.data.user;
  const conversations = data?.data.conversations;

  const handleSingOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          {open && (
            <SidebarMenuButton onClick={() => router.push("/")}>
              Chat AI
            </SidebarMenuButton>
          )}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className={`${!open && "p-2"}`}>
        <SidebarMenu>
          <SidebarMenuButton asChild onClick={() => router.push("/")}>
            <div className="cursor-pointer">
              <SquarePen />
              <span>New Chat</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuButton asChild onClick={() => router.push("/")}>
            <div className="cursor-pointer">
              <Search />
              <span>Search chats</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
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
                  {conversations?.map((conversation: any) => (
                    <SidebarMenuButton
                      key={conversation._id}
                      className="cursor-pointer"
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
