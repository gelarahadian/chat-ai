import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../components/providers/ReactQueryProvider";
import ToasterProvider from "../components/providers/ToasterProvider";
import EventBusProvider from "../components/providers/EventBusProvider";
import ContextProvider from "../components/providers/ContextProvider";
import { ScrollMessageProvider } from "../contexts/scroll-message-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat AI",
  description: "Chat AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen overflow-hidden ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ContextProvider>
            <ToasterProvider>
              <EventBusProvider>
                <ScrollMessageProvider>{children}</ScrollMessageProvider>
              </EventBusProvider>
            </ToasterProvider>
          </ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
