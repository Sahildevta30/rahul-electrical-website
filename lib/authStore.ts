import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User { id: string; name: string; phone: string; email?: string; role: string; }

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => { localStorage.setItem("token", token); set({ user, token }); },
      logout: () => { localStorage.removeItem("token"); set({ user: null, token: null }); },
      isLoggedIn: () => !!get().token,
    }),
    { name: "rew-auth" }
  )
);
