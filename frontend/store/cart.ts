import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: "S" | "M" | "L";
  quantity: number;
  sugarLevel: number;
  iceLevel: number;
  toppings: string[];
  basePrice: number;
  toppingPrice: number;
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id" | "subtotal">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

const sizeMultiplier = { S: 0.85, M: 1, L: 1.2 };

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const subtotal =
          (item.basePrice * sizeMultiplier[item.size] + item.toppingPrice) *
          item.quantity;
        const id = `${item.productId}-${item.size}-${item.sugarLevel}-${item.iceLevel}-${item.toppings.sort().join(",")}`;

        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                      subtotal:
                        (i.basePrice * sizeMultiplier[i.size] +
                          i.toppingPrice) *
                        (i.quantity + item.quantity),
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, id, subtotal }] };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id
                    ? {
                        ...i,
                        quantity,
                        subtotal:
                          (i.basePrice * sizeMultiplier[i.size] +
                            i.toppingPrice) *
                          quantity,
                      }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, item) => sum + item.subtotal, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "milktea-iku-cart" }
  )
);
