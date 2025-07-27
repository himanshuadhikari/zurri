import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      getUser: () => {
        return get()?.user;
      },
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
            set({ user: userData?.data?.user });
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

      resetPassword: async (email: string) => {
        try {
          // const { error } = await supabase.auth.resetPasswordForEmail(email, {
          //   redirectTo: `${window.location.origin}/reset-password`,
          // });
          //todo:: add code for logout
          console.log("resetPassword called with emai =======", email)

          // if (error) {
          //   throw new Error(error.message);
          // }
        } catch (error) {
          console.error('Password reset error:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);