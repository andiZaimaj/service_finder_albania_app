import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_KEY = "sf_saved_workers";

interface SavedState {
  savedWorkerIds: string[];
  isLoaded: boolean;
  toggleSaved: (workerId: string) => void;
  isSaved: (workerId: string) => boolean;
  loadSaved: () => Promise<void>;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedWorkerIds: [],
  isLoaded: false,

  toggleSaved: (workerId) => {
    const current = get().savedWorkerIds;
    const next = current.includes(workerId)
      ? current.filter((id) => id !== workerId)
      : [...current, workerId];
    set({ savedWorkerIds: next });
    AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
  },

  isSaved: (workerId) => get().savedWorkerIds.includes(workerId),

  loadSaved: async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_KEY);
      if (raw) {
        set({ savedWorkerIds: JSON.parse(raw), isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch {
      set({ isLoaded: true });
    }
  },
}));
