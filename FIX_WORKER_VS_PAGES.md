# Fix: Domain Configured in Worker Instead of Pages

## 🔍 The Problem

I can see `xtechsrenewables.com.au` is listed under **"Domains & Routes"** in a **Worker** project.

**But your Next.js website is deployed to Cloudflare Pages, not Workers!**

That's why you're seeing "Hello world" - the Worker domain is serving a default page, not your actual website.

---

## ✅ Solution: Configure Domain in Pages (Not Workers)

Your Next.js site is on **Cloudflare Pages**, so the custom domain needs to be configured there.

### Step 1: Go to Cloudflare Pages (Not Workers)

1. **Cloudflare Dashboard** → Click **"Pages"** in the left sidebar
   - **NOT** "Workers & Pages" → "xtechs-website"
   - **BUT** just **"Pages"** (under Workers & Pages section)

2. If you don't see a separate "Pages" option, try:
   - **Cloudflare Dashboard** → Look for **"Workers & Pages"** in the left sidebar
   - Click on it
   - You should see both "Workers" and "Pages" sub-items
   - Click on **"Pages"** (not Workers)

### Step 2: Find Your Pages Project

1. In **Pages** section, look for a project named `xtechs-website`
2. **Click on it**

### Step 3: Add Custom Domain in Pages

1. Click **"Custom domains"** tab (at the top)
2. Click **"Set up a custom domain"**
3. Enter: `xtechsrenewables.com.au`
4. Click **Continue**

### Step 4: Remove Domain from Worker (Optional but Recommended)

To avoid confusion, you can remove the domain from the Worker:

1. Go back to **Workers** → **xtechs-website** → **Settings**
2. Under **"Domains & Routes"**, find `xtechsrenewables.com.au`
3. Click the **delete icon** (trash can) to remove it
4. This ensures the domain points only to Pages, not Workers

---

## 📋 What You Should See

**In Cloudflare Pages:**
- Project: `xtechs-website`
- Custom domains tab shows: `xtechsrenewables.com.au` ✅

**NOT in Workers:**
- The domain should NOT be in Workers Domains & Routes

---

## 🎯 Quick Steps Summary

1. **Dashboard** → **Pages** (separate section, not Workers)
2. **xtechs-website** project
3. **Custom domains** tab
4. **Add** `xtechsrenewables.com.au`
5. **Remove** domain from Workers (optional)

---

## ⚠️ Important

- **Workers** = For serverless functions (shows "Hello world" by default)
- **Pages** = For static sites and Next.js (your actual website) ✅

Your Next.js website needs to be in **Pages**, and the domain should be configured there!

---

**Try adding the domain in Pages section and let me know what happens!**

