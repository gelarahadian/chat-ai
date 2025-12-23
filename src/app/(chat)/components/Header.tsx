'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/menubar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/src/components/ui/navigation-menu";

import { useSidebar } from "@/src/components/ui/sidebar";
import { useDeleteConversationById } from "@/src/hooks/use-conversation";
import { Ellipsis, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

type HeaderProps = {
  conversationId?: string
}

const Header: FC<HeaderProps> = ({conversationId}) => {
  const { open } = useSidebar();

  const router = useRouter();

  let mutationDeleteConversationById: ReturnType <typeof useDeleteConversationById>

  if(conversationId){
    mutationDeleteConversationById = useDeleteConversationById(conversationId);
  }

  

  const handleDeleteConv = () => {
    mutationDeleteConversationById.mutate();
    router.push("/");
  };
  return (
    <div
      className={` ${
        open ? "left-64" : "left-12"
      } flex transition-all duration-200 ease-linear bg-white z-10 border-b fixed top-0 right-0 `}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className="flex flex-row items-center"><Share/> Share</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Menubar className="border-none justify-end">
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
  );
};

export default Header