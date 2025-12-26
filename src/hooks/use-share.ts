import { useQuery } from "@tanstack/react-query";
import { getConversationByShareToken } from "../services/shareService";
import { useEffect } from "react";

export const useGetShareConversation = (shareToken: string) => {
  const query = useQuery({
    queryKey: ["share", shareToken],
    queryFn: () => getConversationByShareToken(shareToken),
  });

  useEffect(() => {
    if (query.data) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 10);
    }
  }, [query.data]);

  return query;
};
