"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCartStore, selectTotalItems } from "@/store/cart"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/menu", label: "MENU" },
  { href: "/contact", label: "CONTACT" },
]

export default function Navbar() {
  const pathname = usePathname()
  const totalItems = useCartStore(selectTotalItems)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ background: "var(--lime)", color: "#0A0A0A" }}
          >
            G
          </div>
          <span className="font-black text-lg tracking-tight">
            <span style={{ color: "var(--lime)" }}>FIERY</span>
            <span className="text-white">BISTRO</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-widest transition-colors duration-200"
              style={{ color: pathname === link.href ? "var(--lime)" : "#9CA3AF" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart Icon — يفتح صفحة السلة */}
        <Link href="/cart" className="relative p-2 rounded-lg transition-colors hover:bg-white/5">
          <ShoppingCart
            size={20}
            style={{ color: totalItems > 0 ? "var(--lime)" : "#9CA3AF" }}
          />
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center"
              style={{ background: "var(--lime)", color: "#0A0A0A" }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}
