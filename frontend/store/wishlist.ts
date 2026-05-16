import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      toggleItem: (item) => {
        const { items } = get();
        if (items.some((i) => i.id === item.id)) {
          set({ items: items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...items, item] });
        }
      },
      isInWishlist: (id) => get().items.some((i) => i.id === id),
      clearAll: () => set({ items: [] }),
    }),
    { name: "iku-wishlist" }
  )
);
