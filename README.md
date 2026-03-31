# Beauty Salon Website

Site source for the beauty salon (Next.js App Router).

Repository: https://github.com/Barre-Beavogui/my-v0-project

Quick start (local)

1. Copy `.env.example` to `.env.local` and fill your values (Supabase, SMTP, etc.).
2. Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Deploy to Vercel (recommended)

The easiest way to get a live site is to import this repository into Vercel. Click the button below and follow the prompts:

https://vercel.com/new/git/import?repository-url=https://github.com/Barre-Beavogui/my-v0-project

Environment variables required (set these in Vercel or in `.env.local` during local testing):

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- (optional, for emails) SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM
- NOTIFICATION_EMAIL (defaults to eliebarresbeavogui3@gmail.com)

Notes

- This project uses Next.js (App Router). Vercel will handle deploys automatically when connected to this GitHub repository.
- If you want me to create the Vercel project and deploy automatically, provide a Vercel token and I can add a GitHub Action to deploy on push.
