//Base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// API Configuration
export const API_BASE_URL = BASE_URL.endsWith("/")
  ? BASE_URL.slice(0, -1)
  : BASE_URL;

export const IMAGE_BASE_URL = API_BASE_URL;



