'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/menubar";
import { useSidebar } from "@/src/components/ui/sidebar";
import { useDeleteConversationById, useGetConversations } from "@/src/hooks/use-conversation";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

type HeaderProps = {
  conversationId: string
}

const Header: FC<HeaderProps> = ({conversationId}) => {
  const { open } = useSidebar();

  const router = useRouter();

  const mutationDeleteConversationById =
    useDeleteConversationById(conversationId);

  const handleDeleteConv = () => {
    mutationDeleteConversationById.mutate();
    router.push("/");
  };
  return (
    <div
      className={` ${
        open ? "left-64" : "left-12"
      } transition-all duration-200 ease-linear bg-white z-10 border-b fixed top-0 right-0 `}
    >
      <Menubar className="border-none justify-end">
        <MenubarMenu>
          <MenubarTrigger>
            <Ellipsis />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Share</MenubarItem>
            <MenubarItem onClick={handleDeleteConv} className="text-red-500">
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Header