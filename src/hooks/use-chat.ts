import { useMutation } from "@tanstack/react-query";
import { createChat } from "../services/chatService";

export const useCreateChat = () => {
  return useMutation({
    mutationFn: createChat,
  });
};
