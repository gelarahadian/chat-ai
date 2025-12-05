import { useMutation } from "@tanstack/react-query"
import { getConversationById, getConversations } from "../services/conversationService"

export const useGetConversations = () => {
    return useMutation({
        mutationFn: getConversations
    })
}

export const useGetConversationById = (id: string) => {
    return useMutation({
      mutationFn: () => getConversationById(id),
      onSuccess: () => {
        console.log(document.body.scrollHeight);
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "auto",
          });
        }, 10);
      },
    });
}