# Fix Cloudflare Pages Deployment Error

## 🔍 The Problem

The build succeeds ✅, but deployment fails ❌ because Cloudflare Pages doesn't know how to serve the Next.js output.

**Error:** "Failed: error occurred while running deploy command"

The issue is with the **build command** and **output directory** configuration in Cloudflare Pages.

---

## ✅ Solution: Update Build Settings in Cloudflare Dashboard

### Step 1: Go to Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **xtechs-website** project
3. Click **Settings** tab (at the top)

### Step 2: Update Build Configuration

Scroll to **"Builds & deployments"** section and update these settings:

#### Current Settings (likely wrong):
- Build command: `npm run build`
- Build output directory: `.next`
- Framework preset: (might not be set correctly)

#### Correct Settings for Next.js on Cloudflare Pages:

**Option 1: Use Cloudflare's Next.js Adapter (Recommended)**

- **Build command:** `npx @cloudflare/next-on-pages@1`
- **Build output directory:** `.vercel/output/static`
- **Framework preset:** **Next.js** (or leave empty if not available)

**Option 2: If Option 1 doesn't work, try:**

- **Build command:** `npm run build && npx @cloudflare/next-on-pages`
- **Build output directory:** `.vercel/output/static`
- **Framework preset:** **Next.js**

**Option 3: Use Native Cloudflare Pages Next.js Support (if available):**

- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Framework preset:** **Next.js** (make sure this is set!)

---

### Step 3: Install Cloudflare Next.js Adapter (if using Option 1)

If you're using `@cloudflare/next-on-pages`, you need to install it first:

1. I'll add it to your package.json
2. Push to GitHub
3. Cloudflare will build with the adapter

---

### Step 4: Save and Redeploy

1. Click **"Save changes"** button
2. Go to **Deployments** tab
3. Click **"Retry deployment"** on the failed deployment
   - Or wait for the next automatic deployment

---

## 🆘 Which Option Should You Use?

**Check your Cloudflare Pages Settings first:**

1. Go to Settings → Builds & deployments
2. Check if **Framework preset** shows **Next.js**
3. If yes → Use **Option 3** (simplest)
4. If no → Use **Option 1** (requires adapter)

---

## 📋 Quick Checklist

- [ ] Go to Settings → Builds & deployments
- [ ] Check Framework preset (should be Next.js)
- [ ] Update Build command
- [ ] Update Build output directory
- [ ] Save changes
- [ ] Retry deployment

---

Need help? Check what your current settings show and let me know!

