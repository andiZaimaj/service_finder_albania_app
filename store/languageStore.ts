import { create } from "zustand";
import i18n from "@/lib/i18n";

interface LanguageState {
  locale: "en" | "sq";
  setLocale: (locale: "en" | "sq") => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: "en",
  setLocale: (locale) => {
    i18n.locale = locale;
    set({ locale });
  },
}));
