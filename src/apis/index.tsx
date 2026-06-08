import axios from "axios";

const BaseURL: string = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

      try {
        const response = await axios.post(
          `${BaseURL}/auth/token/refresh`,
          {},
          { withCredentials: true }, //쿠키 보내기
        );

        const newAccessToken: string = response.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(config);
      } catch (error) {
        console.log(error);

        const errorCode = error.response?.data?.code;

        if (
          errorCode === "REFRESH_TOKEN_EXPIRED" ||
          errorCode === "REFRESH_TOKEN_INVALID" ||
          errorCode === "REFRESH_TOKEN_REUSED"
        ) {
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
          window.location.href = "/login";
        } else {
          alert("인증 갱신에 실패했습니다. 다시 시도해 주세요.");
          window.location.href = "/login";
        }

        localStorage.removeItem("accessToken");
        throw error;
      }
    }
    return Promise.reject(error);
  },
);
