import axios from "axios";

const BaseURL: string = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


let currentRefreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const skipUrls = [
    "/auth/login",
    "/auth/signup",
    "/auth/email/verify",
    "/auth/email/send",
    "/auth/token/refresh",
  ];

  if (skipUrls.some((url) => config.url?.includes(url))) return config;

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        if (!currentRefreshPromise) {
          currentRefreshPromise = axios
            .post(
              `${BaseURL}/auth/token/refresh`,
              {},
              { withCredentials: true },
            )
            .then((res) => {
              const newAccessToken = res.data.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);
              return newAccessToken;
            })
            .finally(() => {
              currentRefreshPromise = null;
            });
        }

        const newAccessToken = await currentRefreshPromise;

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(config);
      } catch (refreshError: any) {
        console.log(refreshError);
        const errorCode = refreshError.response?.data?.data?.code;

        if (
          [
            "REFRESH_TOKEN_EXPIRED",
            "REFRESH_TOKEN_INVALID",
            "REFRESH_TOKEN_REUSED",
          ].includes(errorCode)
        ) {
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        } else {
          alert("인증 갱신에 실패했습니다. 다시 시도해 주세요.");
        }

        localStorage.removeItem("accessToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);