'use client'

import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const INITIAL_RENDER = 20;
const LOAD_MORE = 20;

interface ScrollConversationContextType {
    containerRef: RefObject<HTMLDivElement | null>;
    visibleConversations: any[];
    setConversations: Dispatch<SetStateAction<any[]>>
    shouldAutoScrollRef: RefObject<boolean>
}

const ScrollConversationContext = createContext<ScrollConversationContextType | null>(null)

export const ScrollConversationProvider = ({children}: {children: ReactNode}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER);
    const [conversations, setConversations] = useState<any[]>([]);
    const loadingRef = useRef(false);
    const shouldAutoScrollRef = useRef<boolean>(true);
    const pendingRestoreRef = useRef<{
      prevHeight: number;
      prevScrollTop: number;
    } | null>(null);


    const visibleConversations = conversations?.slice(0,
        Math.min(conversations.length, visibleCount)
    );


    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      
      const THRESHOLD = 0.8; 

      const onScroll = () => {
        const scrollableHeight = el.scrollHeight - el.clientHeight;

        if (scrollableHeight <= 0) return;

        const scrollRatio = el.scrollTop / scrollableHeight;

        if (scrollRatio <= THRESHOLD) {
          loadMore();
        }
      };

      el.addEventListener("scroll", onScroll);
      return () => el.removeEventListener("scroll", onScroll);
    }, [conversations.length, visibleCount]);

    useEffect(() => {
      setVisibleCount(INITIAL_RENDER);
    }, [conversations]);

    useEffect(() => {
      shouldAutoScrollRef.current = true;
    }, [conversations.length]);

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
        console.log('loadmore')
      if (loadingRef.current) return;
      if (visibleCount >= conversations.length) return;

      const el = containerRef.current;
      if (!el) return;

      loadingRef.current = true;
      shouldAutoScrollRef.current = false;

      pendingRestoreRef.current = {
        prevHeight: el.scrollHeight,
        prevScrollTop: el.scrollTop,
      };

      setVisibleCount((prev) => Math.min(prev + LOAD_MORE, conversations.length));
    };

    return (
      <ScrollConversationContext.Provider
        value={{ containerRef, visibleConversations, setConversations, shouldAutoScrollRef }}
      >{children}</ScrollConversationContext.Provider>
    );
}

export const useScrollConversation = () => {
    const context = useContext(ScrollConversationContext)
    if(!context) {
        throw new Error("useScrollConversation must be used within a ScrollConversationProvider");
    }
    return context
}