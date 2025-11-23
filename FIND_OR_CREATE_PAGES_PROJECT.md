# Find or Create Pages Project

## 🔍 The Problem

`xtechs-website` is not showing in the Pages list, which means it might be configured as a **Worker** instead of a **Pages** project.

---

## ✅ Solution: Create a New Pages Project

Since `xtechs-website` appears to be a Worker, we need to create it as a **Pages** project.

### Step 1: Create New Pages Project

1. In the **Workers & Pages** page you're on
2. Click the blue **"Create application"** button (top right)
3. Select **"Pages"** (not Workers)
4. Click **"Connect to Git"**

### Step 2: Connect Your Repository

1. Select **GitHub** (or your Git provider)
2. Authorize Cloudflare if needed
3. Select repository: **`paperwork-bit/xtechs-website`**
4. Click **"Begin setup"**

### Step 3: Configure Build Settings

**Important settings:**

- **Project name:** `xtechs-website` (or `xtechs-website-pages` to avoid conflict)
- **Production branch:** `master`
- **Framework preset:** **Next.js** (should auto-detect)
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Deploy command:** `true` (or leave empty if possible)
- **Root directory:** (leave empty)

### Step 4: Add Environment Variables

1. Scroll to **"Environment variables"** section
2. Add all your Firebase and other environment variables
3. (You already set these up before, so you can copy them)

### Step 5: Save and Deploy

1. Click **"Save and Deploy"**
2. Cloudflare will build and deploy your site
3. Wait for it to complete

---

## 🔄 Alternative: Check if Project Exists with Different Name

Before creating new, let's check:

1. In the **Pages** list, try:
   - **Search** for "xtechs" in the search bar
   - Check if there's a project with a similar name
   - Look at all projects (not just Pages filter)

2. Check the **filter dropdown:**
   - Make sure "Pages" filter is selected
   - Try "All" to see if it shows up

---

## 📋 After Creating Pages Project

Once the Pages project is created:

1. Go to the new **Pages** project
2. Click **"Custom domains"** tab
3. Add: `xtechsrenewables.com.au`
4. Remove the domain from the Worker (to avoid conflicts)

---

## 🆘 If You See "Project Already Exists" Error

If Cloudflare says the project name already exists:

1. Use a different name: `xtechs-website-pages` or `xtechs-site`
2. Or delete the Worker project first (if you don't need it)

---

## ✅ Quick Steps

1. **Click "Create application"** button
2. **Select "Pages"**
3. **Connect to Git** → Select `paperwork-bit/xtechs-website`
4. **Configure build settings** (Next.js, build command, etc.)
5. **Add environment variables**
6. **Save and Deploy**
7. **Add custom domain** in the new Pages project

---

**Let's create it as a Pages project now!**

