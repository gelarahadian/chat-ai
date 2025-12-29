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
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronUp,
  MessageSquareMore,
  Search,
  SquarePen,
  User2,
} from "lucide-react";
import { useMe } from "../hooks/use-auth";
import SearchDialog from "../app/(chat)/components/search-dialog";
import { Skeleton } from "@/src/components/ui/skeleton";

export function AppSidebar() {
  const { open } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const { data: meResponse, isLoading: meLoading } = useMe();
  const { data: conversationsResponse, isLoading } = useGetConversations();

  const user = meResponse?.data.user;
  const conversations = conversationsResponse?.data.conversations;

  const handleSingOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          }`}
        >
          {open && (
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={() => router.push("/")}
            >
              Chat AI
            </SidebarMenuButton>
          )}
          <SidebarTrigger className="cursor-pointer" />
        </div>
      </SidebarHeader>
      <SidebarContent className={`p-2`}>
        <SidebarMenu>
          <SidebarMenuButton asChild onClick={() => router.push("/")}>
            <div className="cursor-pointer">
              <SquarePen />
              <span>New Chat</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu>
          <SearchDialog>
            <SidebarMenuButton asChild>
              <div className="cursor-pointer">
                <Search />
                <span>Search chats</span>
              </div>
            </SidebarMenuButton>
          </SearchDialog>
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
                  {isLoading ? (
                    <>
                      <SidebarMenuButton>
                        <Skeleton className="h-3 w-full bg-gray-200" />
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Skeleton className="h-3 w-full bg-gray-200" />
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Skeleton className="h-3 w-full bg-gray-200" />
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Skeleton className="h-3 w-full bg-gray-200" />
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Skeleton className="h-3 w-full bg-gray-200" />
                      </SidebarMenuButton>
                    </>
                  ) : (
                    conversations?.map((conversation: any) => {
                      const isActive = pathname.includes(conversation._id);
                      return (
                        <SidebarMenuButton
                          isActive={isActive}
                          key={conversation._id}
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/chat/${conversation._id}`)
                          }
                        >
                          {" "}
                          <span className="block w-full truncate">
                            {conversation.title}
                          </span>
                        </SidebarMenuButton>
                      );
                    })
                  )}
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
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> {user?.name ? user.name : "Username"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[240px]">
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleSingOut}
                >
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
