"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Clock } from "lucide-react"
import { Dish } from "@/types"
import { useCartStore } from "@/store/cart"

interface DishCardProps {
  dish: Dish
}

export default function DishCard({ dish }: DishCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAdd = () => {
    addItem(dish)
  }

  return (
    <div className="glass-card overflow-hidden group cursor-pointer">
      {/* Image */}
      <Link href={`/product/${dish.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {dish.badge && (
            <span
              className="absolute top-3 left-3 text-xs font-black tracking-widest px-2 py-1 rounded-md"
              style={{ background: "var(--lime)", color: "#0A0A0A" }}
            >
              {dish.badge}
            </span>
          )}
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg font-black text-sm"
            style={{ background: "rgba(10,10,10,0.85)", color: "var(--lime)" }}
          >
            ${dish.price.toFixed(2)}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${dish.id}`}>
          <h3 className="font-bold text-white leading-tight hover:text-[var(--lime)] transition-colors mb-1">
            {dish.name}
          </h3>
        </Link>

        <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {dish.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
            <Clock size={12} />
            <span className="text-xs">{dish.prepTime}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 neon-border hover:neon-btn"
            style={{ color: "var(--lime)" }}
          >
            <Plus size={14} />
            Add to Order
          </button>
        </div>
      </div>
    </div>
  )
}
