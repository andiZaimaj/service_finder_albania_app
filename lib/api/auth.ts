import { apiClient } from "./client";
import { mockLogin, mockRegister } from "./mock";
import type { AuthResponse } from "@/types/api";

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === "true";

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "CLIENT" | "WORKER";
}

export interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  if (USE_MOCK) {
    const result = mockLogin(data.email, data.password);
    if (!result) throw new Error("Invalid credentials");
    return result;
  }
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  if (USE_MOCK) {
    return mockRegister(data);
  }
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
}

export async function forgotPassword(email: string): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post("/auth/reset-password", { token, newPassword });
}

export async function logout(refreshToken: string): Promise<void> {
  if (USE_MOCK) return;
  await apiClient.post("/auth/logout", { refreshToken });
}

export async function refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  if (USE_MOCK) return { accessToken: "mock-access", refreshToken: "mock-refresh" };
  const response = await apiClient.post("/auth/refresh", { refreshToken });
  return response.data;
}
