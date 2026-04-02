"use client"

// ============================================
// Gourmet Express — Cart Page
// مع زر WhatsApp لإرسال الطلب
// ============================================

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react"
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/store/cart"

// ضع رقم واتساب المطعم هنا (مع كود الدولة بدون +)
const WHATSAPP_NUMBER = "905369842743"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const totalItems = useCartStore(selectTotalItems)
  const totalPrice = useCartStore(selectTotalPrice)

  // بناء رسالة WhatsApp
  const buildWhatsAppMessage = () => {
    let message = "🍽️ *طلب جديد من Gourmet Express*\n\n"
    items.forEach((item) => {
      message += `• ${item.dish.name} × ${item.quantity} — $${(item.dish.price * item.quantity).toFixed(2)}\n`
    })
    message += `\n💰 *الإجمالي: $${totalPrice.toFixed(2)}*`
    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = () => {
    const message = buildWhatsAppMessage()
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  // سلة فارغة
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: "rgba(209,255,77,0.1)" }}
        >
          <ShoppingBag size={32} style={{ color: "var(--lime)" }} />
        </div>
        <h1 className="font-black text-3xl mb-3">Your Cart is Empty</h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          Add some dishes to get started!
        </p>
        <Link href="/menu" className="neon-btn px-8 py-4 rounded-xl font-black text-sm inline-block">
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Back */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={16} />
        Back to Menu
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-black tracking-widest mb-1" style={{ color: "var(--lime)" }}>
            YOUR ORDER
          </p>
          <h1 className="font-black text-4xl">Cart ({totalItems})</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          Clear All
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.dish.id}
            className="glass-card p-4 flex items-center gap-4"
          >
            {/* Image */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={item.dish.image}
                alt={item.dish.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate">{item.dish.name}</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {item.dish.category}
              </p>
            </div>

            {/* Quantity */}
            <div
              className="flex items-center gap-3 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }}
            >
              <button
                onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                style={{ color: "var(--text-secondary)" }}
              >
                <Minus size={14} />
              </button>
              <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                style={{ color: "var(--text-secondary)" }}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Price */}
            <div className="font-black text-sm w-16 text-right" style={{ color: "var(--lime)" }}>
              ${(item.dish.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.dish.id)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        className="glass-card p-6 mb-6"
        style={{ borderColor: "var(--border-lime)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
          <span style={{ color: "var(--text-secondary)" }}>Delivery</span>
          <span className="font-bold" style={{ color: "var(--lime)" }}>Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-black text-lg">Total</span>
          <span className="font-black text-2xl neon-text">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* WhatsApp Order Button */}
      <button
        onClick={handleWhatsAppOrder}
        className="w-full flex items-center justify-center gap-3 py-5 rounded-xl font-black text-sm tracking-wide transition-all"
        style={{
          background: "#25D366",
          color: "white",
          boxShadow: "0 0 20px rgba(37,211,102,0.3)",
        }}
      >
        <MessageCircle size={20} />
        Order via WhatsApp — ${totalPrice.toFixed(2)}
      </button>
    </div>
  )
}
