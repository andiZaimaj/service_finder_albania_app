import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import * as authApi from "@/lib/api/auth";
import { router } from "expo-router";

export function useLogin() {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: authApi.LoginData) => authApi.login(data),
    onSuccess: async (response) => {
      await loginStore(response.accessToken, response.refreshToken, response.user);
      router.replace("/(tabs)");
    },
  });
}

export function useRegister() {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: authApi.RegisterData) => authApi.register(data),
    onSuccess: async (response) => {
      await loginStore(response.accessToken, response.refreshToken, response.user);
      router.replace("/(tabs)");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      authApi.resetPassword(data.token, data.newPassword),
    onSuccess: () => {
      router.replace("/(auth)/login");
    },
  });
}

export function useLogout() {
  const logoutStore = useAuthStore((s) => s.logout);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  return useMutation({
    mutationFn: () => authApi.logout(refreshToken || ""),
    onSuccess: async () => {
      await logoutStore();
      router.replace("/(auth)/welcome");
    },
  });
}
