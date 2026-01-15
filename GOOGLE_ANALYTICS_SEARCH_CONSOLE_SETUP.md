# Google Analytics (GA4) + Google Search Console + Cloudflare Analytics Setup

This site supports **both**:

- **Google Analytics 4 (GA4)**: conversions, funnels, marketing attribution
- **Cloudflare Analytics**: baseline traffic + performance insights on Cloudflare

It also supports **Google Search Console** for indexing + SEO monitoring.

---

## 1) Google Analytics 4 (GA4)

### Create GA4 + get Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create (or open) your property
3. Add a **Web data stream** for your domain
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Configure environment variable

Set this in **Cloudflare Pages → Project → Settings → Environment variables**:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

### How it works in this repo

- GA script is loaded **only after analytics consent** via:
  - `src/components/compliance/consent-scripts.tsx`
- Page views are sent on Next.js App Router navigation via:
  - `src/components/analytics/pageview-tracker.tsx`

### Verify GA4 is working

1. Deploy
2. Visit the site, accept **Analytics** in the cookie banner
3. In GA4: **Reports → Realtime** should show your visit within ~seconds

---

## 2) Google Search Console (Webmaster / Search Console)

### Add your property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property**
3. Choose **Domain** (recommended) or **URL prefix**

### Verification options

#### Option A (recommended here): HTML meta tag

1. Choose **URL prefix** property
2. Copy the verification string from the meta tag content (example: `abc123...`)
3. Set this environment variable in Cloudflare Pages:
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = `abc123...`
4. Deploy, then click **Verify** in Search Console

This repo outputs the verification tag via Next.js metadata in:

- `src/app/layout.tsx`

#### Option B: DNS verification (Domain property)

Add the TXT record Search Console gives you to your DNS zone in Cloudflare, then verify.

### Submit sitemap

After verification:

1. Search Console → **Sitemaps**
2. Submit: `/sitemap.xml`

This repo serves:

- `src/app/sitemap.ts` → `/sitemap.xml`
- `src/app/robots.ts` → `/robots.txt` with sitemap reference

---

## 3) Cloudflare Analytics (recommended alongside GA4)

### Option A: Cloudflare Pages / Cloudflare dashboard analytics (no code)

If your site is on Cloudflare Pages, you can use the built-in analytics from the Cloudflare dashboard.
No code or env vars needed.

### Option B: Cloudflare Web Analytics (optional beacon script)

If you enable **Cloudflare Web Analytics**, Cloudflare gives you a **token**.

Set this environment variable in Cloudflare Pages:

- `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` = `your_token_here`

In this repo, the beacon is loaded **only after analytics consent** (same toggle as GA4) in:

- `src/components/compliance/consent-scripts.tsx`

### Verify Cloudflare Web Analytics

1. Deploy
2. Visit the site and accept **Analytics**
3. Cloudflare Web Analytics dashboard should show traffic shortly after

---

## Cloudflare Pages environment variables checklist

- `NEXT_PUBLIC_SITE_URL` = `https://www.xtechsrenewables.com.au` (or your canonical domain)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = `...` (for Search Console meta verification)
- `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` = `...` (optional; only if using Cloudflare Web Analytics beacon)


