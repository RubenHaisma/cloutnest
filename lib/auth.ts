import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    name: string;
    role: 'brand' | 'influencer';
  };
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
