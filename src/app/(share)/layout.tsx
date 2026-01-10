'use client'

import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { useAuth } from "@/src/contexts/auth-context";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token } = useAuth();

  return (
    <SidebarProvider className="flex h-screen ">
      {token && <AppSidebar />}
      {children}
    </SidebarProvider>
  );
}
