import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LangStore {
  lang: string;
  setLang: (lang: string) => void;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "rew-lang" }
  )
);
