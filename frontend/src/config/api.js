const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL_PROD;

export const API_HEALTH_ENDPOINT = `${API_BASE_URL.replace("/api", "")}/api/health`;
