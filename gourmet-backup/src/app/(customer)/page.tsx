import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"
import DishCard from "@/components/ui/DishCard"
import { getFeaturedDishes } from "@/sanity/queries"

export default async function HomePage() {
  const featured = await getFeaturedDishes()

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt="Restaurant ambiance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.85) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest"
              style={{ background: "rgba(209,255,77,0.1)", color: "var(--lime)", border: "1px solid var(--border-lime)" }}>
              <Star size={12} fill="currentColor" />
              AWARD WINNING CUISINE
            </div>
            <h1 className="font-black text-5xl md:text-7xl leading-none tracking-tight mb-6">
              DELICIOUS<br />FOOD{" "}
              <span className="neon-text">DELIVERED</span><br />
              TO YOUR DOOR
            </h1>
            <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
              Experience fine dining from the comfort of your home. Premium ingredients,
              expertly crafted dishes — ready in 30 minutes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/menu" className="neon-btn px-8 py-4 rounded-xl font-black text-sm tracking-widest flex items-center gap-2">
                ORDER NOW <ChevronRight size={16} />
              </Link>
              <Link href="/menu" className="px-8 py-4 rounded-xl font-bold text-sm tracking-widest transition-colors"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                VIEW MENU
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 opacity-30"
            style={{ background: "linear-gradient(to bottom, transparent, var(--lime))" }} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--lime)" }}>OUR SELECTION</p>
            <h2 className="font-black text-4xl md:text-5xl">CROWD FAVORITES</h2>
          </div>
          <Link href="/menu" className="hidden md:flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--text-secondary)" }}>
            View all dishes <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "124+", label: "Menu Items" },
            { value: "4", label: "Active Menus" },
            { value: "30min", label: "Avg. Delivery" },
            { value: "4.9★", label: "Customer Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-black text-3xl mb-1 neon-text">{stat.value}</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
