# Fix: Wrong Deploy Command in Cloudflare Pages

## 🔍 The Problem

The build succeeds ✅, but deployment fails ❌ because Cloudflare Pages is using the wrong deploy command.

**Error:** `It looks like you've run a Workers-specific command in a Pages project. For Pages, please run 'wrangler pages deploy' instead.`

**Current (wrong) command:** `npx wrangler deploy`  
**Should be:** `wrangler pages deploy` (or no custom deploy command at all)

---

## ✅ Solution: Remove or Fix Custom Deploy Command

### Step 1: Go to Cloudflare Pages Settings

1. **Cloudflare Dashboard** → **Pages** → **xtechs-website** project
2. Click **Settings** tab (at the top)
3. Scroll to **"Builds & deployments"** section

### Step 2: Check for Custom Deploy Command

Look for a field called:
- **"Deploy command"** or
- **"Custom deploy command"** or
- **"Deploy script"** or
- Something similar in the build settings

### Step 3: Remove or Fix It

**Option A: Remove Custom Deploy Command (Recommended)**

1. If there's a **"Deploy command"** field with `npx wrangler deploy`:
   - **Delete it** or **clear the field**
   - Leave it **empty/blank**
   - Cloudflare Pages will use its default deployment (which is correct)

2. Click **"Save changes"**

**Option B: Fix the Command (If you need a custom one)**

1. If the field can't be removed, change it to:
   - **Deploy command:** `wrangler pages deploy .next --project-name=xtechs-website`
   - Or just leave it empty

### Step 4: Verify Other Settings

While you're there, make sure:
- **Framework preset:** **Next.js** (if available)
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Deploy command:** (empty/blank) ← This is the key fix!

### Step 5: Save and Redeploy

1. Click **"Save changes"**
2. Go to **Deployments** tab
3. Click **"Retry deployment"** on the failed deployment
4. Or wait for the next automatic deployment

---

## ✅ Expected Result

After removing the custom deploy command:
- Build will still succeed ✅
- Deployment will use Cloudflare Pages' default (correct) method ✅
- Your site will deploy successfully! 🎉

---

## 📋 Quick Checklist

- [ ] Go to Settings → Builds & deployments
- [ ] Find "Deploy command" or similar field
- [ ] Remove/clear any `npx wrangler deploy` command
- [ ] Leave deploy command empty
- [ ] Save changes
- [ ] Retry deployment

---

## 🎯 That's It!

The fix is simple - just remove the custom deploy command and let Cloudflare Pages handle deployment automatically. It knows how to deploy Next.js properly without any custom commands!

