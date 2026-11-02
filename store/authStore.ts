import { create } from "zustand";
import type { User } from "@/types/api";
import { saveTokens, clearTokens, getAccessToken, getRefreshToken } from "@/lib/secureStorage";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
}

interface AuthActions {
  login: (accessToken: string, refreshToken: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setUser: (user: User) => void;
  setGuest: (isGuest: boolean) => void;
  loadStoredAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: true,
  isGuest: false,

  login: async (accessToken, refreshToken, user) => {
    await saveTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken, user, isGuest: false });
  },

  logout: async () => {
    await clearTokens();
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isGuest: false,
    });
  },

  setTokens: async (accessToken, refreshToken) => {
    await saveTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken });
  },

  setUser: (user) => set({ user }),

  setGuest: (isGuest) => set({ isGuest }),

  setLoading: (isLoading) => set({ isLoading }),

  loadStoredAuth: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
      ]);
      if (accessToken && refreshToken) {
        set({ accessToken, refreshToken });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
