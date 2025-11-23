# Fix 404 Error - Cloudflare Pages Configuration

## 🔴 The Problem:

Deployment succeeds but website shows 404 because Next.js with API routes needs the Cloudflare adapter.

## ✅ The Solution:

Use `npx @cloudflare/next-on-pages@1` in the build command (no installation needed - runs via npx).

---

## 🚀 Cloudflare Pages Settings - UPDATE REQUIRED:

### Build Configuration:

**Build command:**
```bash
npm run build && find .next -name '*.map' -type f -delete && find .next/server -name '*.map' -type f -delete && find .next/server/chunks -name '*.map' -type f -delete 2>/dev/null || true && npx @cloudflare/next-on-pages@1
```

**Or use the script:**
```bash
npm run build && npm run clean:sourcemaps && npx @cloudflare/next-on-pages@1
```

**Build output directory:**
```
.vercel/output/static
```

**Framework preset:**
```
Next.js
```

**Root directory:**
```
(leave empty)
```

**Deploy command:**
```
true
```

---

## 📋 Step-by-Step:

1. **Go to Cloudflare Dashboard** → Pages → Your project
2. **Settings** → **Builds & deployments**
3. **Edit build configuration**
4. **Build command:** 
   ```bash
   npm run build && npm run clean:sourcemaps && npx @cloudflare/next-on-pages@1
   ```
5. **Build output directory:** `.vercel/output/static`
6. **Save**
7. **Trigger new deployment**

---

## ✅ What This Does:

1. **Builds Next.js** - Standard Next.js build
2. **Removes source maps** - Deletes all .map files to avoid size limits
3. **Runs Cloudflare adapter** - Converts Next.js output to Cloudflare Pages format via npx (no install needed)
4. **Outputs to `.vercel/output/static`** - Cloudflare Pages-compatible format
5. **Enables API routes** - Your API routes will work on Cloudflare Pages
6. **SSR support** - Server-side rendering works via Cloudflare Workers

---

## 🔍 Why `.vercel/output/static`?

- The `@cloudflare/next-on-pages` adapter outputs to `.vercel/output/static`
- This is the format Cloudflare Pages understands
- Contains both static files and Workers functions for API routes

---

## ⚠️ Note:

The `@cloudflare/next-on-pages` package is deprecated but still works. The warning suggests using OpenNext adapter in the future, but for now, this adapter works fine.

---

**Update the build command and output directory in Cloudflare Pages now!**

