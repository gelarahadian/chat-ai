import { useQuery } from "@tanstack/react-query";
import { getConversationByShareToken } from "../services/shareService";

export const useGetShareConversation = (shareToken: string) => {
  return useQuery({
    queryKey: ["share", shareToken],
    queryFn: () => getConversationByShareToken(shareToken),
  });
};
