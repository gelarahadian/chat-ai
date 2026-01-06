import api from "../lib/api";

export const createChat = (data: {
  conversationId?: string | null;
  input: string;
  chatIds?: string[];
}) => {
  return api.post("/chat", data);
};
