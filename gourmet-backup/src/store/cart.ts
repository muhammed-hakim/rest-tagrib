"use client"

// ============================================
// Gourmet Express — Cart Store (Zustand)
// مُصلح: totalItems و totalPrice كـ computed values
// ============================================

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Dish } from "@/types"

export interface CartItem {
  dish: Dish
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (dish: Dish) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (dish: Dish) => {
        const items = get().items
        const existing = items.find((item) => item.dish.id === dish.id)
        if (existing) {
          set({
            items: items.map((item) =>
              item.dish.id === dish.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { dish, quantity: 1 }] })
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.dish.id !== id) })
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((item) =>
            item.dish.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "gourmet-cart",
    }
  )
)

// Selectors منفصلة - هذا الحل الصحيح مع Zustand
export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0)
