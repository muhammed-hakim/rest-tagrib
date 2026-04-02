"use client"

import { useState, useEffect } from "react"
import DishCard from "@/components/ui/DishCard"
import { getAllDishes } from "@/sanity/queries"
import { Dish } from "@/types"

const categories = ["All", "Main Course", "Starters", "Drinks", "Desserts"]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllDishes().then((data) => {
      setDishes(data)
      setLoading(false)
    })
  }, [])

  const filtered = activeCategory === "All"
    ? dishes
    : dishes.filter((d) => d.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--lime)" }}>EXPLORE</p>
        <h1 className="font-black text-5xl mb-4">OUR MENU</h1>
        <p style={{ color: "var(--text-secondary)" }}>Crafted with the finest ingredients, prepared by our award-winning chefs.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
            style={activeCategory === cat
              ? { background: "var(--lime)", color: "#0A0A0A" }
              : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-card overflow-hidden animate-pulse" style={{ height: 320 }}>
              <div className="w-full h-48" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="p-4 space-y-2">
                <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "70%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-24" style={{ color: "var(--text-muted)" }}>No items in this category yet.</div>
      )}
    </div>
  )
}
