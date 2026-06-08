import axios from "axios";

const BaseURL: string = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const skipUrls = ["/login", "/signup"];

  if (skipUrls.some((url) => config.url?.includes(url))) {
    return config;
  }

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      localStorage.removeItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response: any = await api.post(`/api/v1/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken: string = response.data.accessToken;
        const newRefreshToken: string = response.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(config);
      } catch (error) {
        console.log(error);
        alert("다시 시도해주세요");
        throw error;
      }
    }
    return Promise.reject(error);
  },
);
