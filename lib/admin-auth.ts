"use client";
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useAuthStore } from '@/lib/auth-store';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { getUser } = useAuthStore();

  useEffect(() => {
    const userData = getUser();

    if (userData && userData?.role === 'ADMIN') {


      setUser(userData);

    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return { user, loading, logout, isAdmin: user?.role === 'ADMIN' };
}