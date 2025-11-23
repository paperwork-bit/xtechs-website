# Fix Required Deploy Command

## 🔍 The Problem

The "Deploy command" field is marked as **"Required"**, so you can't leave it blank. But the current value `npx wrangler deploy` is wrong (it's a Workers command, not Pages).

---

## ✅ Solution: Use the Correct Pages Deploy Command

Since the field is required, we need to put the **correct Pages command** in it.

### Step 1: In the "Build" Dialog

1. Find the **"Deploy command"** field (currently empty in the modal)
2. Enter this command:
   ```
   wrangler pages deploy .next --project-name=xtechs-website
   ```

### Step 2: Click Update

1. Click the **"Update"** button (blue button at bottom)
2. Settings will be saved

### Step 3: Retry Deployment

1. Go to **"Deployments"** tab
2. Click **"Retry deployment"** on the failed build
3. It should work now! ✅

---

## ✅ Alternative: Simpler Command (Try This First)

If the above doesn't work, try just:
```
wrangler pages deploy
```

Cloudflare should auto-detect the project and output directory.

---

## 📋 What You Should Enter

**In the "Deploy command" field, enter:**
```
wrangler pages deploy .next --project-name=xtechs-website
```

**NOT:**
- ❌ `npx wrangler deploy` (Workers command - wrong!)
- ❌ `wrangler deploy` (Workers command - wrong!)

**BUT:**
- ✅ `wrangler pages deploy .next --project-name=xtechs-website` (Pages command - correct!)

---

## 🎯 Key Difference

- **Workers command:** `wrangler deploy` ← Wrong for Pages
- **Pages command:** `wrangler pages deploy` ← Correct!

The key is adding **"pages"** in the command!

---

## 🔄 After This

Once you update the deploy command to the correct Pages command and click "Update", the deployment should succeed!

