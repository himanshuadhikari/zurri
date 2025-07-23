import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      checkAuth: async () => {
        try {
          set({ loading: true });
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            set({ user: userData, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ user: null, loading: false });
        }
      },

      login: async (email: string, password: string): Promise<boolean> => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const userData = await response.json();
            set({ user: userData.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },

      register: async (name: string, email: string, password: string): Promise<boolean> => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          if (response.ok) {
            const userData = await response.json();
            set({ user: userData.user });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration failed:', error);
          return false;
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          set({ user: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);