# Fix: wrangler command not found

## 🔍 The Problem

The error shows:
```
/bin/sh: 1: wrangler: not found
```

The `wrangler` command isn't available in the build environment. We need to use `npx wrangler` instead.

---

## ✅ Solution: Use npx wrangler

### Step 1: Update Deploy Command

1. Go to **Settings** → **Build** section
2. Click the **edit icon** next to "Build configuration"
3. In the **"Deploy command"** field, change it to:

```
npx wrangler pages deploy .next --project-name=xtechs-website
```

**Key change:** Add `npx` before `wrangler`

### Step 2: Click Update

1. Click **"Update"** button
2. Settings will be saved

### Step 3: Retry Deployment

1. Go to **"Deployments"** tab
2. Click **"Retry deployment"** on the failed build
3. It should work now! ✅

---

## 📋 What to Enter

**In "Deploy command" field:**
```
npx wrangler pages deploy .next --project-name=xtechs-website
```

**NOT:**
- ❌ `wrangler pages deploy .next --project-name=xtechs-website` (wrangler not found)

**BUT:**
- ✅ `npx wrangler pages deploy .next --project-name=xtechs-website` (uses npx to find wrangler)

---

## 🎯 Why This Works

- `npx` will automatically find and run `wrangler` from node_modules
- `npx` is available in the Cloudflare build environment
- This is the standard way to run wrangler in CI/CD environments

---

## ✅ After This

Once you update the deploy command to use `npx wrangler` and click "Update", the deployment should succeed!

