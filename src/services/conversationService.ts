import api from "../lib/api"

export const getConversations = () => {
    return api.get('/conversations')
}

export const getConversationById = (id: string) => {
    return api.get(`/conversation/${id}`)
}

export const searchConversation = (q: string) => {
  return api.post("/conversations/search", { q });
};

export const deleteConversationById = (id: string) => {
  return api.delete(`/conversation/${id}`);
};

export const shareConversation = (id: string) => {
  return api.post(`conversation/${id}/share`);
};