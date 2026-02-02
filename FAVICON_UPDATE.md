# Favicon / logo still showing old image

## What we changed

1. **`public/favicon.ico`** – A **physical file** was added (copy of the company logo). On Cloudflare Pages (static deploy), Next.js rewrites don’t run, so Google’s request to `/favicon.ico` must hit a real file. This file is now in `public/` and is deployed as `/favicon.ico`.
2. **Cache-busting** – Icon URLs use `?v=2` so browsers and CDNs fetch the new logo.
3. **Layout** – The first icon in metadata is `/favicon.ico` so the HTML has `<link rel="icon" href="/favicon.ico">` for Google.
4. **Old `app/favicon.ico` removed** – The previous generic icon was deleted so only the company logo is used.

## You need to redeploy

The live site only updates after a new deploy. From the **xtechs-website** folder:

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
CLOUDFLARE_API_TOKEN="your-token" npm run cf:deploy
```

## After deploying: check what’s live

1. **In an incognito/private window** open:
   - `https://www.xtechsrenewables.com.au/xlogo.png?v=2`
   - `https://www.xtechsrenewables.com.au/favicon.ico`
   If you see the old icon, the new build isn’t live yet or Cloudflare is caching.

2. **Purge Cloudflare cache** (if you use it):
   - Cloudflare Dashboard → Caching → Configuration → Purge Everything (or purge the URLs above).

3. **Browser**: Hard refresh (Cmd+Shift+R or Ctrl+Shift+R) or clear cache for the site.

## Google Search results

The small icon next to your site in **Google Search** is cached by Google. It often takes **a few days to a few weeks** to update.

### Why "Sponsored" box shows the logo but "Sponsored result" shows a generic icon

- **Top "Sponsored" box** – The icon there usually comes from **Google Ads** or **Google Business Profile** (e.g. the business logo you uploaded). So it’s correct and not tied to the site’s favicon.
- **"Sponsored result" rows** – Those use the **website’s favicon** (from your live site). Google caches that separately, so they can still show an old icon (e.g. grey globe) until Google recrawls and updates the cache. There’s no separate setting for this; it’s the same `/favicon.ico` we fixed. Once the new build is live and Google recrawls, the "Sponsored result" favicon should update to the company logo.

To try to speed up favicon updates in search (including "Sponsored result"):

1. Open [Google Search Console](https://search.google.com/search-console).
2. Select the property for `xtechsrenewables.com.au`.
3. Use **URL Inspection** for `https://www.xtechsrenewables.com.au/`.
4. Click **Request indexing**.

That can trigger a recrawl; the favicon may still take days or weeks to refresh everywhere.
