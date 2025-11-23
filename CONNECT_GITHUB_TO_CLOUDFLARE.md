# Connect GitHub Repository to Cloudflare Pages

## ✅ Your Repository

GitHub Repository: https://github.com/paperwork-bit/xtechs-website

---

## 🚀 Step-by-Step: Connect to Cloudflare Pages

### Step 1: Go to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** in the left sidebar
3. Click **"Create a project"** button (or **"Connect to Git"** if you see it)

### Step 2: Connect to GitHub

1. Click **"Connect to Git"** button
2. You'll see options for Git providers:
   - Click **GitHub** (or the GitHub logo)
3. **Authorize Cloudflare** to access your repositories:
   - Click **"Authorize Cloudflare"** or **"Install Cloudflare Pages"**
   - Select the repositories you want to give access to (or select all)
   - Click **"Install"** or **"Authorize"**

### Step 3: Select Your Repository

1. After authorization, you'll see a list of your GitHub repositories
2. Find and click on **`paperwork-bit/xtechs-website`**
3. Click **"Begin setup"** or **"Continue"**

### Step 4: Configure Build Settings

Fill in the build configuration:

#### Basic Settings:
- **Project name:** `xtechs-website` (already set, keep as is)
- **Production branch:** `master` (or `main` - check your GitHub repo to see which branch you have)
- **Root directory:** (leave empty unless your Next.js app is in a subfolder)

#### Build Settings:
- **Framework preset:** **Next.js** (should auto-detect, but select it if not)
- **Build command:** `npm run build` (or leave as auto-detected)
- **Build output directory:** `.next` (or leave as auto-detected)

#### Important: Update Build Command for Cloudflare

Since you're using Turbopack, you might need to adjust the build command. Try:
- Build command: `npm run build` 
- Or: `npm install && npm run build`

**Note:** Cloudflare Pages will build Next.js with proper runtime support automatically!

### Step 5: Add Environment Variables

1. Scroll down to **"Environment variables"** section
2. Click **"Add variable"** for each one you need

**Add all your Firebase and other environment variables:**

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 510037402813
NEXT_PUBLIC_FIREBASE_APP_ID = 1:510037402813:web:a7b976c4bdf58c852d83d4
FIREBASE_PROJECT_ID = xtechsrenewables
FIREBASE_CLIENT_EMAIL = [your service account email]
FIREBASE_PRIVATE_KEY = [your private key]
```

**You can add these now, or add them later in Settings → Environment Variables**

### Step 6: Save and Deploy

1. Review all your settings
2. Click **"Save and Deploy"** button
3. Wait for the build to complete (usually 2-5 minutes)

### Step 7: Monitor Build Progress

1. You'll be taken to the **Deployments** tab
2. Watch the build progress in real-time
3. Check for any build errors in the logs
4. When complete, you'll see your site URL

---

## ✅ After Deployment

### Your Site Will Be Live At:

- **Cloudflare Pages URL:** `https://xtechs-website.pages.dev` (or similar)
- **Deployment URL:** A unique URL for each deployment

### Set Up Custom Domain:

1. Go to **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: `xtechsrenewables.com.au`
4. Cloudflare will configure DNS automatically (if domain is on Cloudflare)

---

## 🔧 Troubleshooting

### Build Fails?

1. **Check build logs:**
   - Go to **Deployments** tab
   - Click on the failed deployment
   - Review the build logs for errors

2. **Common issues:**
   - Missing environment variables → Add them in Settings → Environment Variables
   - Build command error → Check if `npm run build` works locally
   - Node version mismatch → Cloudflare uses Node 18 by default

3. **Fix and redeploy:**
   - Fix any errors
   - Push to GitHub (if you fixed code)
   - Cloudflare will automatically redeploy

### Site Still Shows 404?

1. **Wait for build to complete** - can take 5-10 minutes
2. **Check deployment status** - should show "Success"
3. **Try the deployment URL** - click on the deployment to see its URL
4. **Clear browser cache** - try in incognito mode

---

## 📋 Quick Checklist

- [ ] Authorized Cloudflare to access GitHub
- [ ] Selected repository: `paperwork-bit/xtechs-website`
- [ ] Set Framework preset: **Next.js**
- [ ] Set Build command: `npm run build`
- [ ] Set Build output directory: `.next`
- [ ] Added environment variables (or add later)
- [ ] Clicked "Save and Deploy"
- [ ] Waited for build to complete
- [ ] Verified deployment shows "Success"
- [ ] Tested the site URL

---

## 🎉 Benefits of Git Integration

✅ **Automatic deployments** - Every push to main/master deploys automatically  
✅ **Preview deployments** - Pull requests get preview URLs  
✅ **Proper Next.js support** - Cloudflare builds Next.js with correct runtime  
✅ **Build logs** - Easy to debug build issues  
✅ **Rollback** - Easy to rollback to previous deployments  

---

## 🚀 After Setup

Once connected:

1. **Every push to master/main** will automatically trigger a new deployment
2. **Pull requests** will get preview deployment URLs
3. **Your site will be live** with proper Next.js runtime support

---

Need help with any step? Let me know!

