import api from "../lib/api"

export const getConversations = () => {
    return api.get('/conversations')
}

export const getConversationById = (id: string) => {
    return api.get(`/conversation/${id}`)
}

export const deleteConversationById = (id: string) => {
  return api.delete(`/conversation/${id}`);
};