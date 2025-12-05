# X Store

built with Next.js 16, featuring dynamic pricing based on product size and quality selections, and automated price synchronization.

## Features

- **Dynamic Pricing**: Real-time price calculation based on selected size and quality combinations
- **Serverless Database**: Uses Neon PostgreSQL with Kysely ORM
- **Price Synchronization**: Automatic price updates from external API via Vercel cron jobs every 20 minutes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Neon PostgreSQL
- **ORM**: Kysely
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **Deployment**: Vercel (with cron jobs)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts              # GET/POST products
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts          # GET product by ID
│   │   │   │   └── price/route.ts    # GET price calculation
│   │   └── sync-prices/
│   │       └── route.ts              # Price synchronization endpoint
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components/
│   ├── ProductCard.tsx           # Individual product display
│   ├── ProductListClient.tsx     # Product grid with data fetching
│   └── ui/
│       └── animated-theme-toggler.tsx  # Theme toggle component
├── lib/
│   ├── db.ts                     # Database configuration
│   ├── price.ts                  # Price calculation utility
│   └── utils.ts                  # Utility functions
├── vercel.json                   # Vercel configuration with cron jobs
└── public/                       # Static assets
```
