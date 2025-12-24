import api from "../lib/api";

export const getConversationByShareToken= (token: string) => {
  return api.get(`/share/${token}`);
};
