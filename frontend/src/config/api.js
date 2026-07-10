const isDev = import.meta.env.DEV;

const getApiUrl = () => {
  const devUrl = import.meta.env.VITE_API_BASE_URL;
  const prodUrl = import.meta.env.VITE_API_BASE_URL_PROD;

  const url = isDev ? devUrl : prodUrl;

  if (!url) {
    console.error(`Missing ${isDev ? 'VITE_API_BASE_URL' : 'VITE_API_BASE_URL_PROD'} environment variable`);
  }

  return url;
};

export const API_BASE_URL = getApiUrl();

export const API_HEALTH_ENDPOINT = API_BASE_URL
  ? `${API_BASE_URL.replace("/api", "")}/api/health`
  : null;
