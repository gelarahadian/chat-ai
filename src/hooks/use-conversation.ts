import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteConversationById,
  getConversationById,
  getConversations,
  searchConversation,
  shareConversation,
} from "../services/conversationService";
import { useEffect } from "react";

export const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
};

export const useGetConversationById = (id: string) => {
  const query = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => getConversationById(id),
    enabled: !!id,
  });

  // useEffect(() => {
  //   if (query.data) {
  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: document.body.scrollHeight,
  //         behavior: "instant",
  //       });
  //     }, 10);
  //   }
  // }, [query.data]);

  return query;
};

export const useSearchConversation = () => {
  return useMutation({
    mutationFn: (q: string) => searchConversation(q),
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

export const useShareConversation = () => {
  return useMutation({
    mutationFn: shareConversation,
  });
};