# Kuber Seth Foundation

The official website for the **Kuber Seth Foundation** — a citizen-volunteer NGO based in Gole Market, Karan Nagar, Srinagar. _Relief is our belief._

A fast, fully static, zero-cost React site with:

- **UPI donations** — a unique QR code per initiative, plus a receipt request form that emails the donor and notifies the foundation.
- **Volunteer sign-up** — an embedded registration form with proof-of-work upload.
- **Points leaderboard** — a live volunteer ranking read from a published Google Sheet.

## Tech stack

Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · motion.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc` |

## Configuration

Every editable setting lives in **`src/config.ts`** — foundation details, UPI ID, initiatives, and the integration keys below. Replace the demo photos in `src/assets/` with real ones. Placeholder values start with `YOUR_`; each integration stays in a safe fallback state until its value is filled in.

| Value in `src/config.ts` | How to get it |
| --- | --- |
| `EMAILJS` | Create a free [EmailJS](https://www.emailjs.com/) account, add an email service and two templates (donor receipt + foundation notification), then copy the public key, service ID and template IDs. |
| `VOLUNTEER_FORM_URL` | Build a Google Form with a file-upload question and paste its embed URL (Send → Embed HTML). |
| `LEADERBOARD_CSV_URL` | In the form's responses sheet, make a summary tab with columns `name, points, badges, proof`, then File → Share → Publish to web → CSV and copy the URL. |

## Deployment

The build output in `dist/` is fully static. Deploy it to any free host — [Vercel](https://vercel.com), [Netlify](https://netlify.com) or [Cloudflare Pages](https://pages.cloudflare.com) — for automatic HTTPS and an optional custom domain.
