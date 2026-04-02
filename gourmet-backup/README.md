# 🍽️ Gourmet Express — Neon-Eco Edition

A premium dark-themed restaurant platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎨 Design
- **Theme:** Premium Dark Mode (`#0A0A0A`)
- **Accent:** Soft Lime Neon (`#D1FF4D`)
- **Style:** Glassmorphism cards with neon glow effects

## 📄 Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero + Featured Dishes |
| `/menu` | Full menu with category filtering |
| `/product/[id]` | Product detail with quantity selector |
| `/contact` | Contact form + location info |
| `/admin` | GastroAdmin dashboard |

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

## 🗂️ Project Structure
```
src/
├── app/
│   ├── (customer)/         # Customer-facing pages
│   │   ├── page.tsx        # Home / Landing
│   │   ├── menu/           # Menu page
│   │   ├── product/[id]/   # Product detail
│   │   └── contact/        # Contact page
│   ├── admin/              # Admin dashboard
│   ├── globals.css         # Global styles + CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # DishCard and reusable components
├── data/
│   └── dishes.ts           # Mock data (replace with Sanity CMS)
├── store/
│   └── cart.ts             # Zustand cart store
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🔜 Next Steps (Backend)
- Connect Sanity CMS for real menu data
- Add tRPC for API layer
- Add Auth.js for admin authentication
- Add order management with PostgreSQL + Drizzle
