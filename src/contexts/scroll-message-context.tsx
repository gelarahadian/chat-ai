'use client'

import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const INITIAL_RENDER = 20;
const LOAD_MORE = 20;

interface ScrollMessagesContextType {
    containerRef: RefObject<HTMLDivElement | null>;
    visibleMessages: any[];
    setMessages: Dispatch<SetStateAction<any[]>>
    shouldAutoScrollRef: RefObject<boolean>
}

const ScrollMessagesContext = createContext<ScrollMessagesContextType | null>(null)

export const ScrollMessageProvider = ({children}: {children: ReactNode}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER);
    const [messages, setMessages] = useState<any[]>([]);
    const loadingRef = useRef(false);
    const shouldAutoScrollRef = useRef<boolean>(true);
    const pendingRestoreRef = useRef<{
      prevHeight: number;
      prevScrollTop: number;
    } | null>(null);


    const visibleMessages = messages?.slice(
        Math.max(messages.length - visibleCount, 0)
    );


    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      
      const THRESHOLD = 0.2; // 20%

      const onScroll = () => {
        const scrollableHeight = el.scrollHeight - el.clientHeight;

        // kalau konten belum cukup tinggi, jangan load
        if (scrollableHeight <= 0) return;

        const scrollRatio = el.scrollTop / scrollableHeight;

        if (scrollRatio <= THRESHOLD) {
          loadMore();
        }
      };

      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }, [messages.length, visibleCount]);

    useEffect(() => {
      setVisibleCount(INITIAL_RENDER);
    }, [messages]);

    useEffect(() => {
      shouldAutoScrollRef.current = true;
    }, [messages.length]);

    useLayoutEffect(() => {
      if (!pendingRestoreRef.current) return;

      const el = containerRef.current;
      if (!el) return;

      const { prevHeight, prevScrollTop } = pendingRestoreRef.current;

      const newHeight = el.scrollHeight;

      el.scrollTop = newHeight - prevHeight + prevScrollTop;

      pendingRestoreRef.current = null;
      loadingRef.current = false;
    }, [visibleCount]);

    const loadMore = () => {
      if (loadingRef.current) return;
      if (visibleCount >= messages.length) return;

      const el = containerRef.current;
      if (!el) return;

      loadingRef.current = true;
      shouldAutoScrollRef.current = false;

      pendingRestoreRef.current = {
        prevHeight: el.scrollHeight,
        prevScrollTop: el.scrollTop,
      };

      setVisibleCount((prev) => Math.min(prev + LOAD_MORE, messages.length));
    };

    return (
      <ScrollMessagesContext.Provider
        value={{ containerRef, visibleMessages, setMessages, shouldAutoScrollRef }}
      >{children}</ScrollMessagesContext.Provider>
    );
}

export const useScrollMessages = () => {
    const context = useContext(ScrollMessagesContext)
    if(!context) {
        throw new Error("useScrollMessages must be used within a ScrollMessagesProvider");
    }
    return context
}