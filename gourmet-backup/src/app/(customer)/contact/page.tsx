"use client"

import { useState } from "react"
import { MapPin, Phone, Send, Facebook, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="font-black text-5xl md:text-6xl mb-4">Get In Touch</h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Have questions about our menu or want to book a private event?
          We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h2 className="font-black text-xl mb-6">Send us a message</h2>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(209,255,77,0.1)", color: "var(--lime)" }}>
                <Send size={24} />
              </div>
              <p className="font-bold text-lg mb-2">Message Sent!</p>
              <p style={{ color: "var(--text-secondary)" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Full Name</label>
                  <input type="text" placeholder="John Doe" value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white" }} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Email Address</label>
                  <input type="email" placeholder="john@example.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white" }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Your Message</label>
                <textarea placeholder="Tell us how we can help..." value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white" }} />
              </div>
              <button type="submit" className="neon-btn w-full py-4 rounded-xl font-black text-sm tracking-widest">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8">
            <h2 className="font-black text-xl mb-6">Visit Us</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} style={{ color: "var(--lime)", marginTop: 2 }} />
                <p style={{ color: "var(--text-secondary)" }}>TÜGVA Erkek Öğrenci Yurdu. STAD BÜFE KARŞISI, Kültür, 17524.Sokak No:2, 23100 Elazığ Merkez/Elazığ</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} style={{ color: "var(--lime)" }} />
                <p style={{ color: "var(--text-secondary)" }}>+90(536) 9842743</p>
              </div>
            </div>
            <div className="my-6 border-t" style={{ borderColor: "var(--border)" }} />
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg" style={{ color: "var(--text-secondary)" }}>
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card overflow-hidden" style={{ height: 240 }}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <MapPin size={32} style={{ color: "var(--lime)", opacity: 0.5 }} />
              <p className="text-xs font-black tracking-widest" style={{ color: "var(--text-muted)" }}>INTERACTIVE MAP PLACEHOLDER</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Gourmet City, GC 54321</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}