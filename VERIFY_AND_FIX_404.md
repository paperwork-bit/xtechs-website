# Verify and Fix 404 Error - Step by Step

## 🔍 First: Check Current Cloudflare Pages Settings

Before making changes, **verify your current settings**:

1. **Go to Cloudflare Dashboard** → Pages → Your project (`xtechs-website-pages` or similar)
2. **Settings** → **Builds & deployments**
3. **Check these values:**

### Current Build Command:
```
(What does it say?)
```

### Current Build Output Directory:
```
(What does it say?)
```

### Current Framework Preset:
```
(What does it say?)
```

---

## ✅ Correct Settings (Copy These Exactly):

### Build Command:
```bash
npm run build && npm run clean:sourcemaps && npx @cloudflare/next-on-pages@1
```

### Build Output Directory:
```
.vercel/output/static
```

### Framework Preset:
```
Next.js
```

### Root Directory:
```
(leave empty)
```

### Deploy Command:
```
true
```

---

## 📋 Step-by-Step Fix:

### Step 1: Verify You're Looking at the Right Project

- Make sure you're in **Pages** project (not Workers)
- Check the project name in the URL: `.../pages/view/xtechs-website/...`
- If you see "Workers" in the sidebar, you're in the wrong project

### Step 2: Update Build Command

1. Click **"Edit build configuration"** or pencil icon
2. Find **"Build command"** field
3. **Delete** whatever is there
4. **Paste this:**
   ```bash
   npm run build && npm run clean:sourcemaps && npx @cloudflare/next-on-pages@1
   ```

### Step 3: Update Build Output Directory

1. Find **"Build output directory"** field
2. **Delete** `.next` (if it's there)
3. **Type exactly:** `.vercel/output/static`
   - Don't include quotes
   - Make sure there are no spaces
   - Starts with a dot

### Step 4: Verify Framework Preset

1. Check **"Framework preset"** dropdown
2. Should say **"Next.js"**
3. If not, select it

### Step 5: Save and Deploy

1. Click **"Save"** or **"Save and Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Check deployment status

---

## 🔍 Check Deployment Logs:

After the new deployment starts:

1. Go to **"Deployments"** tab
2. Click on the **newest deployment**
3. Check the **logs** - look for:
   - ✅ `@cloudflare/next-on-pages` running
   - ✅ `Building...` messages
   - ✅ `Output directory: .vercel/output/static`
   - ❌ Any errors about missing files or directories

---

## 🆘 If Still Not Working:

### Option 1: Check if Build Command is Running

In the deployment logs, look for:
- Does it show `@cloudflare/next-on-pages` running?
- Does it show `.vercel/output/static` being created?

### Option 2: Verify Output Directory Exists

Check the deployment logs - it should show:
```
Validating asset output directory
Found output directory: .vercel/output/static
```

If it says `.next` instead, the settings weren't saved correctly.

### Option 3: Try Alternative Build Command

If the adapter doesn't work, try:
```bash
npm run build && npm run clean:sourcemaps && npx @cloudflare/next-on-pages@1 --experimental-minify
```

---

## ✅ Expected Result:

After updating settings and deploying:

1. **Build should complete successfully**
2. **Deployment should show "Ready" or "Active"**
3. **Website should load** at `xtechs-website.pages.dev`
4. **No more 404 errors**

---

## 📸 Quick Verification Checklist:

- [ ] Build command contains `@cloudflare/next-on-pages`
- [ ] Output directory is `.vercel/output/static` (not `.next`)
- [ ] Framework preset is "Next.js"
- [ ] Settings are saved
- [ ] New deployment triggered
- [ ] Deployment logs show adapter running
- [ ] No errors in deployment logs

---

**Please verify your current settings first, then update them if they don't match the correct values above!**

