'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/src/components/ui/navigation-menu";

import { useDeleteConversationById } from "@/src/hooks/use-conversation";
import { Ellipsis, Share, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ShareDialog from "./share-dialog";
import { Button } from "@/src/components/ui/button";
import { useMe } from "@/src/hooks/use-auth";

type HeaderProps = {
  conversationId?: string;
};

const Header: FC<HeaderProps> = ({ conversationId }) => {
  const router = useRouter();
  const { data: me } = useMe();

  let mutationDeleteConversationById: ReturnType<
    typeof useDeleteConversationById
  >;

  if (conversationId) {
    mutationDeleteConversationById = useDeleteConversationById(conversationId);
  }

  const handleDeleteConv = () => {
    mutationDeleteConversationById.mutate();
    router.push("/");
  };

  return (
    <div
      className={`flex justify-between items-center transition-all duration-200 ease-linear bg-white z-10 border-b sticky top-0 right-0 `}
    >
      <h2 className="ml-3 my-1">Chat AI</h2>
      {conversationId && (
        <div className="flex">
          <NavigationMenu className="h-10">
            <NavigationMenuList>
              <NavigationMenuItem>
                <ShareDialog conversationId={conversationId}>
                  <NavigationMenuLink className="flex flex-row items-center cursor-pointer">
                    <Share /> Share
                  </NavigationMenuLink>
                </ShareDialog>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Menubar className="border-none justify-end h-10">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <Ellipsis />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={handleDeleteConv}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  Delete
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      )}
      {!me && (
        <div className="flex p-2 space-x-3">
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={() => router.push("/auth/sign-up")}
          >
            <User /> Register
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.push("/auth/sign-in")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header