# VVVF India — Vishwa Vijeta Vision Foundation

NGO website for Vishwa Vijeta Vision Foundation (vvvfindia.com).

## Tech Stack

- **Frontend:** Next.js 16 (App Router), Tailwind CSS v4, Shadcn UI
- **Backend:** Supabase (PostgreSQL + Storage)
- **Payments:** Razorpay (coming soon)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=your_strong_admin_password
```

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/schema.sql`
3. Copy your project URL and keys into `.env.local`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, mission, impact, latest campaigns |
| `/about` | About the organization |
| `/campaigns` | All active campaigns |
| `/campaigns/[slug]` | Campaign detail |
| `/stories` | Success stories |
| `/stories/[slug]` | Story detail |
| `/donate` | Donation page (Razorpay TBD) |
| `/contact` | Contact form |
| `/admin` | Password-protected admin dashboard |

## Admin Panel

Access at `/admin` with the `ADMIN_PASSWORD` you set. Allows:
- Create/edit/delete campaigns
- Create/edit/delete stories
- Upload images to Supabase Storage
