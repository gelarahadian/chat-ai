"use client";

import { AppSidebar } from "@/src/components/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
