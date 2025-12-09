import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteConversationById,
  getConversationById,
  getConversations,
} from "../services/conversationService";

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
};

export const useGetConversationById = (id: string) => {
  return useMutation({
    mutationFn: () => getConversationById(id),
    onSuccess: () => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "auto",
        });
      }, 10);
    },
  });
};

export const useDeleteConversationById = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteConversationById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};
