'use client'

import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { useMe } from "@/src/hooks/use-auth";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: me } = useMe();
  return (
    <SidebarProvider className="flex h-screen ">
      {me && <AppSidebar />}
      {children}
    </SidebarProvider>
  );
}
