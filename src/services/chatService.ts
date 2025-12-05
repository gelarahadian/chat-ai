import api from "../lib/api";

export const createChat = (data: {conversationId: string, input: string}) => {
  return api.post("/chat", data);
};
