"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './auth-store';
import { setAuthHeaders } from './requestHeaders';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string, size?: string, color?: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  syncCartWithBackend: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      // Add item
      addItem: async (newItem) => {
        const auth = useAuthStore.getState();
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === newItem.id &&
              item.size === newItem.size &&
              item.color === newItem.color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id &&
                  item.size === newItem.size &&
                  item.color === newItem.color
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });

        // Sync with backend if logged in
        if (auth.user) {
          try {
            await fetch('/api/cart/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: auth.user.id,
                variantId: newItem.id,
                quantity: 1,
              }),
            });
          } catch (error) {
            console.error('Add to cart backend failed', error);
          }
        }
      },

      // Remove item
      removeItem: async (id, size, color) => {
        const auth = useAuthStore.getState();
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          ),
        }));

        if (auth.user) {
          try {
            await fetch('/api/cart', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json',  ...setAuthHeaders(auth.user.id) },
              body: JSON.stringify({
                userId: auth.user.id,
                variantId: id,
              }),
            });
          } catch (error) {
            console.error('Remove from cart backend failed', error);
          }
        }
      },

      // Update quantity
      updateQuantity: async (id, quantity, size, color) => {
        if (quantity <= 0) {
          return get().removeItem(id, size, color);
        }

        const auth = useAuthStore.getState();
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        }));
        
        if (auth.user) {
          try {
            await fetch('/api/cart', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: auth.user.id,
                variantId: id,
                quantity,
              }),
            });
          } catch (error) {
            console.error('Update cart backend failed', error);
          }
        }
      },

      // Clear cart
      clearCart: async () => {
        const auth = useAuthStore.getState();
        set({ items: [] });

        if (auth.user) {
          try {
            await fetch('/api/cart/clear', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: auth.user.id }),
            });
          } catch (error) {
            console.error('Clear cart backend failed', error);
          }
        }
      },

      // Get total price
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      // Get total items
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      // Sync local cart with backend on login
      syncCartWithBackend: async () => {
        const auth = useAuthStore.getState();
        if (!auth.user) return;

        set({ loading: true });
        try {
          // fetch backend cart
         

          const res = await fetch(`/api/cart`, {
            headers: setAuthHeaders(auth.user.id)
          });

          if (!res.ok) throw new Error('Failed to fetch backend cart');

          const backendItems: any = await res.json();
console.log("backendItems", backendItems.cart.items);
          // Merge frontend cart with backend cart
          set((state) => {
            const merged: CartItem[] = [...backendItems.cart.items];

            state.items.forEach((localItem) => {
              const existing = merged.find(
                (item) =>
                  item.id === localItem.id &&
                  item.size === localItem.size &&
                  item.color === localItem.color
              );
              if (existing) {
                existing.quantity += localItem.quantity;
              } else {
                merged.push(localItem);
              }
            });

            return { items: merged };
          });

          // Optionally, send merged cart to backend to persist
          await fetch('/api/cart/merge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: auth.user.id, items: get().items }),
          });
        } catch (error) {
          console.error('Cart sync failed', error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
