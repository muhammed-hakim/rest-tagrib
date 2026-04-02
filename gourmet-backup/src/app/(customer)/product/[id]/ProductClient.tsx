"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Clock, CheckCircle, Minus, Plus, ArrowLeft } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { Dish } from "@/types"

export default function ProductClient({ dish }: { dish: Dish }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(dish)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/menu" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: "var(--text-secondary)" }}>
        <ArrowLeft size={16} /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image src={dish.image} alt={dish.name} fill className="object-cover" priority />
          <div className="absolute top-4 right-4 px-4 py-2 rounded-xl font-black text-xl"
            style={{ background: "rgba(10,10,10,0.9)", color: "var(--lime)" }}>
            ${dish.price.toFixed(2)}
          </div>
        </div>

        <div>
          {dish.badge && (
            <p className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--lime)" }}>{dish.badge}</p>
          )}
          <h1 className="font-black text-4xl md:text-5xl leading-tight mb-4">{dish.name}</h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{dish.description}</p>

          <div className="glass-card p-5 mb-6">
            <p className="text-xs font-black tracking-widest mb-4" style={{ color: "var(--lime)" }}>KEY INGREDIENTS</p>
            <div className="grid grid-cols-2 gap-2">
              {dish.ingredients.map((ing) => (
                <div key={ing} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--lime)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ color: "var(--text-secondary)" }}>
                <Minus size={18} />
              </button>
              <span className="font-black text-lg w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ color: "var(--text-secondary)" }}>
                <Plus size={18} />
              </button>
            </div>
            <button onClick={handleAddToCart}
              className="neon-btn flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-sm">
              <ShoppingCart size={18} />
              Add to Cart — ${(dish.price * quantity).toFixed(2)}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} style={{ color: "#22C55E" }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: "#22C55E" }}>AVAILABLE NOW</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
              <Clock size={14} />
              <span className="text-xs font-bold tracking-widest">{dish.prepTime} PREP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
