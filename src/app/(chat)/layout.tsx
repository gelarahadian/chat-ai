import { AppSidebar } from "@/src/app/(chat)/components/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
