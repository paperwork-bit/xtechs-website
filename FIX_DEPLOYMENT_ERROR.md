# Fix Cloudflare Pages Deployment Error

## 🔍 Current Issue

The build is now **succeeding** ✅ (dependency issue fixed!), but the **deployment is failing** ❌.

**Error:** "Failed: error occurred while running deploy command"

This is a configuration issue with Cloudflare Pages build settings.

---

## ✅ Solution: Update Build Configuration in Cloudflare Dashboard

### Step 1: Go to Project Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **xtechs-website** project
3. Click on **Settings** tab (at the top)

### Step 2: Check Build Settings

1. Scroll down to **"Builds & deployments"** section
2. Look for these settings:

#### Current Settings (likely wrong):
- **Build command:** `npm run build`
- **Build output directory:** `.next` ❌ (This might be wrong)
- **Root directory:** (empty)

#### Correct Settings for Next.js:

For Next.js 15 on Cloudflare Pages, try one of these:

**Option 1 (Recommended):**
- **Build command:** `npm run build`
- **Build output directory:** `.next` (keep as is)
- **Root directory:** (leave empty)

**Option 2 (If Option 1 doesn't work):**
- **Build command:** `npm run build`
- **Build output directory:** `.vercel/output/static` (if using Vercel output)
- **Root directory:** (leave empty)

**Option 3 (If still failing):**
- **Build command:** `npm install && npm run build`
- **Build output directory:** `.next`
- **Root directory:** (leave empty)

### Step 3: Check Framework Preset

1. In **"Builds & deployments"** section
2. Make sure **Framework preset** is set to: **Next.js**
3. If it's not set, select **Next.js** from the dropdown

### Step 4: Save and Redeploy

1. Click **"Save changes"** button
2. Go to **"Deployments"** tab
3. Click **"Retry deployment"** on the failed deployment
   - Or wait for the next automatic deployment after saving

---

## 🔧 Alternative: Check if Using Static Export

If the above doesn't work, we might need to configure Next.js for static export:

1. Update `next.config.ts` to add static export
2. Change build output directory to `out`

But this would remove API routes and SSR, so only use if necessary.

---

## 📋 Quick Checklist

- [ ] Go to Settings → Builds & deployments
- [ ] Check Framework preset is **Next.js**
- [ ] Verify Build command: `npm run build`
- [ ] Verify Build output directory: `.next`
- [ ] Check Root directory is empty (or correct path)
- [ ] Save changes
- [ ] Retry deployment

---

## 🆘 If Still Failing

Share the error logs from the deployment tab and I'll help debug further!

