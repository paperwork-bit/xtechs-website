# Enable Node.js Compatibility Flag

## 🔴 The Error:

"Node.JS Compatibility Error - no nodejs_compat compatibility flag set"

This happens because some dependencies in your Next.js app still require Node.js compatibility, even though we've set routes to Edge runtime.

## ✅ Solution: Enable nodejs_compat Flag

### Step 1: Go to Cloudflare Pages Settings

1. **Cloudflare Dashboard** → **Pages** → Your project (`xtechs-website`)
2. Click **"Settings"** tab
3. Scroll down to **"Compatibility Flags"** section

### Step 2: Add nodejs_compat Flag

1. In the **"Compatibility Flags"** section, you'll see:
   - **Production** environment flags
   - **Preview** environment flags

2. For **BOTH** Production and Preview:
   - Click **"+ Add flag"** or **"Edit"**
   - Type: `nodejs_compat`
   - Click **"Save"**

### Step 3: Redeploy

1. After saving the flags, trigger a new deployment:
   - Go to **"Deployments"** tab
   - Click **"Retry deployment"** on the latest deployment
   - Or push a new commit to trigger auto-deploy

---

## 📋 Quick Steps:

1. **Dashboard** → **Pages** → `xtechs-website` → **Settings**
2. **Compatibility Flags** section
3. **Add `nodejs_compat`** to **Production**
4. **Add `nodejs_compat`** to **Preview**
5. **Save**
6. **Trigger new deployment**

---

## ✅ What This Does:

- Enables Node.js compatibility in Cloudflare Workers/Pages
- Allows Edge runtime to use Node.js-compatible APIs
- Required for some Next.js dependencies to work

---

**Add the `nodejs_compat` flag in Cloudflare Pages settings now!**

