import axios from "axios";
import { toast } from "sonner";
import { eventBus } from "./eventBus";
import { tokenStore } from "./tokenStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStore.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      toast.warning('Token Expired');
      eventBus.emit("token-expired")
    }
    return Promise.reject(err);
  }
);


export default api