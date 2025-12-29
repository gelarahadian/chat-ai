'use client'

import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { useToken } from "@/src/hooks/use-token";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {token} = useToken();

  return (
    <SidebarProvider className="flex">
      {token && (
        <AppSidebar /> 
      )}
      {children}
    </SidebarProvider>
  );
}
