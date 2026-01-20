import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor (Token)
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (credentials) => api.post("/api/auth/login", credentials),
  getProfile: () => api.get("/api/auth/me"),
  forgotPassword: (email) => api.post("/api/auth/forgotpassword", { email }),
  resetPassword: (data) => api.post("/api/auth/resetpassword", { ...data }),
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

export const mediaAPI = {
  getAll: (params) => api.get("/api/media", { params }),
  getById: (id) => api.get(`/api/media/${id}`),
  create: (data, config = {}) => api.post("/api/media", data, config),
  update: (id, data, config = {}) => api.put(`/api/media/${id}`, data, config),
  delete: (id) => api.delete(`/api/media/${id}`),
};

export const videoTestimonialsAPI = {
  getAll: (params) => api.get("/api/videos", { params }),
  getById: (id) => api.get(`/api/videos/${id}`),
  create: (data) => api.post("/api/videos", data),
  update: (id, data) => api.put(`/api/videos/${id}`, data),
  delete: (id) => api.delete(`/api/videos/${id}`),
};

export const screenshotsAPI = {
  getAll: (params) => api.get("/api/screenshots", { params }),
  getById: (id) => api.get(`/api/screenshots/${id}`),
  create: (data, config = {}) => api.post("/api/screenshots", data, config),
  update: (id, data, config = {}) =>
    api.put(`/api/screenshots/${id}`, data, config),
  delete: (id) => api.delete(`/api/screenshots/${id}`),
};

export const programsAPI = {
  getAll: () => api.get("/api/programs"),
  create: (formData) => api.post("/api/programs", formData),
  update: (id, formData) => api.put(`/api/programs/${id}`, formData),
  delete: (id) => api.delete(`/api/programs/${id}`),
  reorder: (items) => api.put("/api/programs/reorder", { items }),
};

export const partnersAPI = {
  getAll: (params) => api.get("/api/partners", { params }),
  getById: (id) => api.get(`/api/partners/${id}`),
  create: (data, config = {}) => api.post("/api/partners", data, config),
  update: (id, data, config = {}) =>  api.put(`/api/partners/${id}`, data, config),
  delete: (id) =>  api.delete(`/api/partners/${id}`),
};


export default api;
