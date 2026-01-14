# Atlas Digitalize - Next.js Frontend

A modern, SEO-optimized Next.js 14 website for Atlas Digitalize, an IT consulting and custom software development company.

## Features

- 🚀 **Next.js 14** with App Router
- 📱 **Responsive Design** with Tailwind CSS
- 🌐 **Bilingual Support** (English & Indonesian)
- 🔍 **SEO Optimized** with metadata, sitemap, and robots.txt
- 🎨 **Modern UI** with shadcn/ui components
- ⚡ **Performance** optimized with Next.js Image and Font optimization
- 🔧 **TypeScript** for type safety

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Icons:** Lucide React
- **Animations:** Tailwind CSS Animate
- **HTTP Client:** Axios
- **Toast Notifications:** Sonner

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Dynamic language routes
│   │   ├── about/         # About page
│   │   ├── case-studies/  # Case studies page
│   │   ├── contact/       # Contact page
│   │   ├── insights/      # Insights listing
│   │   │   └── [slug]/    # Individual insight article
│   │   ├── solutions/     # Solutions page
│   │   ├── layout.tsx     # Language-specific layout
│   │   └── page.tsx       # Homepage
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt
│   └── manifest.ts        # PWA manifest
├── components/
│   ├── common/            # Shared components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── pages/             # Page-specific client components
│   ├── sections/          # Homepage sections
│   └── ui/                # UI primitives
├── context/               # React contexts
├── hooks/                 # Custom hooks
└── lib/                   # Utilities and API
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Laravel backend running at `http://127.0.0.1:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_URL=https://atlasdigitalize.com
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Routes

| Route | Description |
|-------|-------------|
| `/en` | English homepage |
| `/id` | Indonesian homepage |
| `/en/about` | About page (English) |
| `/en/solutions` | Solutions page |
| `/en/case-studies` | Case studies |
| `/en/insights` | Articles listing |
| `/en/insights/[slug]` | Individual article |
| `/en/contact` | Contact page |

## SEO Features

- **Metadata API**: Dynamic page titles and descriptions
- **Open Graph**: Social media sharing optimization
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine directives
- **Structured Data**: JSON-LD for rich results
- **Canonical URLs**: Proper URL handling for i18n

## i18n (Internationalization)

The site supports English (`/en`) and Indonesian (`/id`) using dynamic route segments:

- Root `/` redirects to `/en`
- Language context provides `t()` function for translations
- All pages have proper `hreflang` alternate links

## Backend API

The frontend expects a Laravel backend with these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/about` | GET | Company information |
| `/api/solutions` | GET | Solutions list |
| `/api/projects` | GET | Projects/case studies |
| `/api/clients` | GET | Client logos |
| `/api/insights` | GET | Articles listing |
| `/api/insights/:slug` | GET | Individual article |
| `/api/contacts` | POST | Contact form submission |

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Add proper types for all props and states
4. Test responsive design on mobile and desktop
5. Ensure SEO metadata is complete for new pages

## License

Private - Atlas Digitalize © 2024
