# Create Pages Project - Step by Step

## ✅ Verified: xtechs-website Doesn't Exist in Pages Yet

I checked and `xtechs-website` is **NOT** in your Pages projects list. Let's create it properly now!

---

## 🚀 Step-by-Step: Create Pages Project

### Step 1: Go to Create Application

1. **Cloudflare Dashboard** → **Workers & Pages** (main page you're on)
2. Click the blue **"Create application"** button (top right)

### Step 2: Select Pages

1. You should see options: **"Workers"** and **"Pages"**
2. **Click "Pages"** (NOT Workers!)
3. Click **"Connect to Git"**

### Step 3: Authorize GitHub (if needed)

1. If prompted, **authorize Cloudflare** to access GitHub
2. Make sure you grant access to `paperwork-bit/xtechs-website`

### Step 4: Select Repository

1. In the repository list, find: **`paperwork-bit/xtechs-website`**
2. **Click on it**
3. Click **"Begin setup"** or **"Continue"**

### Step 5: Configure Build Settings

Fill in these **exact settings**:

**Basic Settings:**
- **Project name:** `xtechs-website` (or if it says already exists, use `xtechs-site`)
- **Production branch:** `master` (check your GitHub repo to confirm)
- **Root directory:** (leave empty)

**Build Settings:**
- **Framework preset:** **Next.js** (should auto-detect, but select it if not)
- **Build command:** `npm run build`
- **Build output directory:** `.next`

**Deploy Command:**
- **Deploy command:** `true`
- (This is our fix to avoid authentication errors)

### Step 6: Add Environment Variables

1. Scroll to **"Environment variables"** section
2. Click **"+ Add variable"** for each one:

**Copy these from your earlier setup:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=510037402813
NEXT_PUBLIC_FIREBASE_APP_ID=1:510037402813:web:a7b976c4bdf58c852d83d4
FIREBASE_PROJECT_ID=xtechsrenewables
FIREBASE_CLIENT_EMAIL=[your service account email]
FIREBASE_PRIVATE_KEY=[your private key]
```

### Step 7: Complete Setup

1. **Review all settings**
2. Click **"Save and Deploy"** or **"Connect"** button
3. **DO NOT close the page** - wait for it to redirect to your project
4. You should see the project dashboard with deployment starting

---

## ✅ After Creation

Once the project is created:

1. **Go to the project** (you'll be redirected or see it in the list)
2. **Wait for first deployment** (2-5 minutes)
3. **Check Deployments tab** - make sure build succeeds
4. **Go to Custom domains tab** - add `xtechsrenewables.com.au`

---

## 🆘 If You See "Project Already Exists" Error

If Cloudflare says the name already exists (because of the Worker):

1. Use a **different name:**
   - `xtechs-site`
   - `xtechs-website-pages`
   - `xtechsrenewables`

2. After it's created, you can potentially rename it later

---

## 📋 Important Checklist

When creating:
- [ ] Select **"Pages"** (not Workers)
- [ ] Connect to **`paperwork-bit/xtechs-website`** repository
- [ ] Framework preset: **Next.js**
- [ ] Build command: `npm run build`
- [ ] Build output: `.next`
- [ ] Deploy command: `true`
- [ ] Add all environment variables
- [ ] Click **"Save and Deploy"** (not just Save)
- [ ] Wait for setup to complete (don't close page)

---

## 🎯 After Project is Created

1. Go to **Custom domains** tab
2. Add: `xtechsrenewables.com.au`
3. Remove domain from the Worker project (to avoid conflicts)
4. Wait 15-30 minutes for DNS/SSL
5. Your site will be live! 🎉

---

**Follow these steps carefully and let me know when the project is created!**

