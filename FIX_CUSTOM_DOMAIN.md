# Fix: Custom Domain Not Working

## 🔍 The Problem

You're seeing a 404 error on `https://xtechsrenewables.com.au/` because the custom domain hasn't been connected to your Cloudflare Pages deployment yet.

---

## ✅ Step-by-Step Fix

### Step 1: Check Your Cloudflare Pages URL

First, let's verify your site is working on Cloudflare Pages:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** in left sidebar
3. Click on **xtechs-website** project
4. Click on **Deployments** tab (at the top)
5. Find your latest successful deployment
6. Click on it to see the deployment details
7. **Copy the URL** - it should look like:
   - `https://xxxxx.xtechs-website.pages.dev`
   - Or `https://xtechs-website.pages.dev`

8. **Try visiting that URL** - if it works, your site is deployed correctly! ✅

---

### Step 2: Add Custom Domain in Cloudflare Pages

Now let's connect your custom domain:

1. In the Cloudflare Pages dashboard, stay on your **xtechs-website** project
2. Click on **Custom domains** tab (at the top, next to Deployments)
3. Click the **"+ Add a custom domain"** or **"Set up a custom domain"** button
4. Enter: `xtechsrenewables.com.au`
5. Click **Continue** or **Add domain**

---

### Step 3: Configure DNS

Now we need to set up DNS records. Choose the option that matches your situation:

#### Option A: Domain is Already on Cloudflare (Easiest)

If `xtechsrenewables.com.au` is already in your Cloudflare account:

1. Cloudflare will automatically configure DNS records for you
2. Go to **DNS** → **Records** in Cloudflare
3. You should see a new **CNAME** record created automatically:
   - **Name:** `@` or `xtechsrenewables.com.au`
   - **Target:** `xtechs-website.pages.dev`
   - **Proxy status:** Proxied (orange cloud) ✓
4. Wait 5-15 minutes for DNS to propagate

#### Option B: Domain is NOT on Cloudflare

If your domain is managed by another DNS provider:

1. After adding the domain in Cloudflare Pages, it will show you the DNS records needed
2. Go to your domain registrar or DNS provider (where you manage `xtechsrenewables.com.au`)
3. Add these DNS records:

   **Record 1 - Root Domain:**
   - **Type:** CNAME
   - **Name:** `@` (or leave blank, or use root domain name)
   - **Target:** `xtechs-website.pages.dev`
   - **TTL:** 3600 (or default)

   **Record 2 - WWW Subdomain:**
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `xtechs-website.pages.dev`
   - **TTL:** 3600

4. Save the records
5. Wait 15 minutes to 48 hours for DNS propagation (usually 15-30 minutes)

---

### Step 4: Wait for SSL Certificate

1. Cloudflare will automatically issue an SSL certificate
2. This usually takes **5-15 minutes** after DNS is configured
3. Check SSL status in:
   - Cloudflare Dashboard → **Pages** → **xtechs-website** → **Custom domains**
   - Look for SSL certificate status (should show "Active" or "Valid")

---

### Step 5: Test Your Site

1. Wait at least **15-30 minutes** after adding DNS records
2. Try visiting:
   - `https://xtechsrenewables.com.au`
   - `https://www.xtechsrenewables.com.au`

3. If it still doesn't work:
   - Check DNS propagation: https://dnschecker.org/
   - Enter: `xtechsrenewables.com.au`
   - Make sure DNS has propagated globally

---

## 🆘 Troubleshooting

### Still seeing 404?

1. **Check if domain is added:**
   - Go to **Custom domains** tab in Cloudflare Pages
   - Make sure `xtechsrenewables.com.au` is listed there
   - It should show as "Active" or "Valid"

2. **Verify DNS records:**
   - Check your DNS provider or Cloudflare DNS
   - Make sure CNAME points to `xtechs-website.pages.dev`
   - The record should be proxied (orange cloud) if on Cloudflare

3. **Wait longer:**
   - DNS changes can take up to 48 hours
   - SSL certificates take 5-15 minutes
   - Be patient and wait a bit longer

4. **Clear browser cache:**
   - Try in incognito/private mode
   - Clear browser cache and cookies

5. **Check deployment status:**
   - Make sure you have a successful deployment
   - Go to **Deployments** tab and verify latest deployment shows "Success"

---

## 📋 Quick Checklist

- [ ] Cloudflare Pages site works at `.pages.dev` URL
- [ ] Custom domain added in **Custom domains** tab
- [ ] DNS records configured correctly
- [ ] DNS has propagated (check with dnschecker.org)
- [ ] SSL certificate is active (check in Custom domains tab)
- [ ] Waited at least 15-30 minutes after DNS changes

---

## 💡 Important Notes

1. **The Cloudflare Pages URL will always work** - use that for testing while setting up the custom domain
2. **DNS propagation takes time** - don't panic if it doesn't work immediately
3. **You need to explicitly add the domain** in Cloudflare Pages - just having DNS records isn't enough

---

## 🎯 What to Do Right Now

1. **First:** Check if your Cloudflare Pages URL works (from Step 1)
2. **Then:** Add the custom domain in the **Custom domains** tab
3. **Finally:** Configure DNS and wait for propagation

Once all steps are complete, your site will be live at `https://xtechsrenewables.com.au`! 🎉

