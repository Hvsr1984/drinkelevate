# ELEVATE — Premium Natural Alkaline Water

A luxury digital storefront and interactive brand experience for ELEVATE, a premium Himalayan mineral and alkaline drinking water brand.

---

## 📌 Overview

**ELEVATE** delivers an immersive digital showcase highlighting pristine hydration sourced from the Himalayas. Designed with fluid liquid micro-animations, glassmorphism, and responsive e-commerce flows, the application provides an interactive deep-dive into water purity, mineral profiles, lab certification transparency, and product selection.

---

## ✨ Features

- **Liquid Interactive Interface:** Ambient water particle effects, dynamic wave transitions, and fluid physics powered by Framer Motion.
- **Product Showcase & Mineral Metrics:** Detailed profiles for Natural Spring, Sparkling, and High-Alkaline variants with live pH balances and electrolyte breakdowns.
- **Purity & Quality Transparency:** Interactive analytical report displaying lab certification parameters, batch test histories, and source provenance.
- **Shopping Cart & Checkout Flow:** Fluid cart drawer with real-time quantity calculations, dynamic pricing, and local state persistence.
- **Accessible Component Design:** High-contrast, keyboard-navigable UI built with Radix UI primitives and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Primitives:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Database / Backend:** [Supabase](https://supabase.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) + [TanStack Query](https://tanstack.com/query)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Live Demo

- **Live Web Application:** [https://elevatewater.vercel.app/](https://elevatewater.vercel.app/)

---

## 📂 Project Structure

```
drinkelevate/
├── src/
│   ├── components/         # Hero, product catalog, cart drawer, lab metrics
│   ├── pages/              # Product and information views
│   ├── hooks/              # Custom interaction and cart hooks
│   ├── lib/                # Supabase client and utility helpers
│   └── App.tsx             # Root router and providers
├── public/                 # High-resolution brand assets
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite build configuration
```

---

## 💻 Installation & Local Setup

### Prerequisites
- Node.js (v18.x or later)
- npm or bun

### 1. Clone the Repository
```bash
git clone https://github.com/Hvsr1984/drinkelevate.git
cd drinkelevate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👤 Author

**Harshvardhan Singh Rajawat**  
*CSE Student • Web Developer • AI Builder*  
Poornima Institute of Engineering and Technology, Jaipur

- **GitHub:** [@Hvsr1984](https://github.com/Hvsr1984)
- **Live Demo:** [elevatewater.vercel.app](https://elevatewater.vercel.app/)
- **Email:** [2025pietcsharshvardhan063@poornima.org](mailto:2025pietcsharshvardhan063@poornima.org)