import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { getRefreshToken } from "@/lib/secureStorage";
import { router } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.100:3000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => {
    // Backend wraps every success response as { data, message, statusCode }.
    // Unwrap once so callers receive the actual payload via response.data.
    const body = response.data;
    if (body && typeof body === "object" && "data" in body) {
      response.data = body.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const url: string = originalRequest?.url ?? "";
    // Auth endpoints return 401 for bad credentials, not for an expired token.
    // Never run the token-refresh/redirect flow for them.
    const isAuthEndpoint =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh");

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token");

      const { data: refreshBody } = await axios.post(`${API_URL}/auth/refresh`, {
        refreshToken,
      });

      // Same { data, ... } envelope as every other response; unwrap it.
      const refreshPayload = refreshBody?.data ?? refreshBody;
      const { accessToken } = refreshPayload;
      await useAuthStore.getState().setTokens(accessToken, refreshToken);

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await useAuthStore.getState().logout();
      router.replace("/(auth)/welcome");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
