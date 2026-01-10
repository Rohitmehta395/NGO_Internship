import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor (Token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (credentials) => api.post("/api/auth/login", credentials),
  getProfile: () => api.get("/api/auth/me"),
};

export const membersAPI = {
  getAll: () => api.get("/api/members"),
  create: (formData) => api.post("/api/members", formData),
  update: (id, formData) => api.put(`/api/members/${id}`, formData),
  delete: (id) => api.delete(`/api/members/${id}`),
};

export const blogsAPI = {
  getAll: () => api.get("/api/blogs"),
  create: (formData) => api.post("/api/blogs", formData),
  update: (id, formData) => api.put(`/api/blogs/${id}`, formData),
  delete: (id) => api.delete(`/api/blogs/${id}`),
  subscribe: (email) => api.post("/api/blogs/subscribe", { email }),
};

export const educationImagesAPI = {
  getAll: () => api.get("/api/education-images"),
  upload: (formData) => api.post("/api/education-images", formData),
  delete: (id) => api.delete(`/api/education-images/${id}`),
};

export const eventsAPI = {
  getAll: (params) => api.get("/api/events", { params }),
  getById: (id) => api.get(`/api/events/${id}`),
  create: (data, config = {}) => api.post("/api/events", data, config),
  update: (id, data, config = {}) => api.put(`/api/events/${id}`, data, config),
  delete: (id) => api.delete(`/api/events/${id}`),
};



export default api;
