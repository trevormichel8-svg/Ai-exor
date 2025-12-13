# Aiexor – AI Logo Generator

Aiexor is a SaaS-style AI logo generator built with **Next.js 14 (App Router)**, **OpenAI**, **Stripe**, and **Supabase**.

It lets users:

- Generate logo concepts using AI (OpenAI Images API)
- Choose from many logo styles and primary colors
- Download PNG and SVG (vectorized) versions
- Use a dark/light theme with a toggle
- (Optionally) sign up, subscribe, and manage logos via dashboard/admin (wire-up needed)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Theming:** next-themes (light/dark)
- **AI:** OpenAI Images (gpt-image-1)
- **Vectorization:** External vectorization API (configurable)
- **Database/Auth:** Supabase
- **Payments:** Stripe subscriptions
- **Analytics:** Google Analytics (GA4)
- **SEO:** Metadata, sitemap, robots

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create `.env.local` and fill in:

```bash
OPENAI_API_KEY=sk-...
VECTORIZE_API_URL=https://api.vectorizer.ai/v1/vectorize
VECTORIZE_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_URL=http://localhost:3000
```

### 3. Run dev server

```bash
npm run dev
```

Visit http://localhost:3000 for the marketing page and `/app` for the logo studio.

## Deployment

- Push this repo to GitHub
- Import into Vercel
- Add the same environment variables in Vercel dashboard
- Deploy
