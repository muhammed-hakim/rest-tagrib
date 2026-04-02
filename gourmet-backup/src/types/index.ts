// ============================================
// Gourmet Express — Type Definitions
// ============================================

export interface Dish {
  id: string
  name: string
  price: number
  image: string
  category: "Main Course" | "Drinks" | "Desserts" | "Starters"
  ingredients: string[]
  description: string
  prepTime: string
  isAvailable: boolean
  isChefSpecial?: boolean
  badge?: string
}

export interface CartItem {
  dish: Dish
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  addItem: (dish: Dish) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export interface AdminMenuItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  status: "Available" | "Low Stock" | "Unavailable"
  image: string
}

export interface ContactForm {
  fullName: string
  email: string
  message: string
}
