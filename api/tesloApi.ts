import axios from "axios";
import { useAuthStore } from "../stores/auth/auth.store";

const tesloApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
