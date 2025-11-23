# Custom Domain Troubleshooting: xtechsrenewables.com.au

## 🔍 Issue: 404 Error on Custom Domain

You're seeing a 404 error when visiting `https://xtechsrenewables.com.au/`. This means the custom domain hasn't been connected to your Cloudflare Pages deployment yet.

---

## ✅ Step 1: Verify Your Cloudflare Pages Site is Working

First, let's check if your Cloudflare Pages site is working at all:

1. Go to your Cloudflare Pages dashboard
2. Click on **"xtechs-website"** project
3. Go to the **"Deployments"** tab
4. Look for your latest successful deployment
5. Click on the deployment to see the deployment URL (something like `https://xxxxx.xtechs-website.pages.dev`)

**Try visiting that URL** - if it works, your site is deployed correctly, we just need to connect the domain!

---

## 🔧 Step 2: Set Up Custom Domain in Cloudflare Pages

### Option A: Domain is Managed by Cloudflare

If `xtechsrenewables.com.au` is already on Cloudflare DNS:

1. Go to Cloudflare Dashboard → **Pages** → **xtechs-website** project
2. Click on **"Custom domains"** tab (at the top)
3. Click **"Set up a custom domain"** button
4. Enter: `xtechsrenewables.com.au`
5. Click **"Continue"** or **"Add domain"**
6. Cloudflare will automatically configure DNS records
7. Wait a few minutes for DNS to propagate

### Option B: Domain is NOT Managed by Cloudflare

If your domain is managed by another DNS provider:

1. Go to Cloudflare Dashboard → **Pages** → **xtechs-website** project
2. Click on **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `xtechsrenewables.com.au`
5. Cloudflare will show you the DNS records you need to add
6. Go to your DNS provider (where you manage `xtechsrenewables.com.au`)
7. Add a **CNAME** record:
   - **Type:** CNAME
   - **Name:** `@` (or root domain)
   - **Target:** `xtechs-website.pages.dev`
   - **TTL:** 3600 (or default)
8. Also add a **CNAME** for `www`:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `xtechs-website.pages.dev`
   - **TTL:** 3600
9. Wait for DNS propagation (5 minutes to 48 hours)

---

## 🌐 Step 3: Verify DNS Configuration

### Check Current DNS Records

1. Go to your domain registrar or DNS provider
2. Check if DNS records point to Cloudflare Pages
3. For Cloudflare-managed domains, go to:
   - Cloudflare Dashboard → **DNS** → **Records**
   - Look for `xtechsrenewables.com.au` domain

### Expected DNS Records

You should see:
- **CNAME** record:
  - **Name:** `@` or `xtechsrenewables.com.au`
  - **Target:** `xtechs-website.pages.dev` (or similar)
  - **Proxy status:** Proxied (orange cloud) ✓

---

## 🔒 Step 4: Check SSL/TLS Certificate

Once the domain is connected:

1. Cloudflare will automatically provision an SSL certificate
2. This usually takes 5-15 minutes
3. Check SSL status in:
   - Cloudflare Dashboard → **Pages** → **xtechs-website** → **Custom domains**
   - Look for SSL certificate status (should show "Active" or "Valid")

---

## 🧪 Step 5: Test Your Site

### Test Methods:

1. **Try the Cloudflare Pages URL first:**
   - `https://xtechs-website.pages.dev` (or your specific deployment URL)
   - If this works, the site is fine, just need domain setup

2. **Try your custom domain:**
   - `https://xtechsrenewables.com.au`
   - `https://www.xtechsrenewables.com.au`
   - Wait a few minutes after DNS changes

3. **Check DNS propagation:**
   - Visit: https://dnschecker.org/
   - Enter: `xtechsrenewables.com.au`
   - Check if DNS records have propagated globally

---

## ⏱️ Wait Times

- **DNS Propagation:** 5 minutes to 48 hours (usually 15-30 minutes)
- **SSL Certificate:** 5-15 minutes after DNS is configured
- **Domain Activation:** Usually immediate, but DNS must be configured first

---

## 🆘 Troubleshooting

### Still seeing 404 after setting up domain?

1. **Check DNS records are correct:**
   - Make sure CNAME points to `xtechs-website.pages.dev`
   - Verify DNS has propagated (use dnschecker.org)

2. **Clear browser cache:**
   - Try in incognito/private mode
   - Clear browser cache and cookies

3. **Wait longer:**
   - DNS changes can take up to 48 hours
   - SSL certificates can take up to 15 minutes

4. **Verify domain is active in Cloudflare:**
   - Check **"Custom domains"** tab in Pages dashboard
   - Domain should show as "Active" or "Valid"

5. **Check Cloudflare Pages deployment:**
   - Make sure you have at least one successful deployment
   - The deployment should be on the **Production** branch

### Domain not showing in Custom domains?

- Make sure you clicked **"Set up a custom domain"** in the **"Custom domains"** tab
- The domain needs to be explicitly added in Cloudflare Pages
- It won't work automatically just by having DNS records

---

## 📝 Quick Checklist

- [ ] Cloudflare Pages site is working at `.pages.dev` URL
- [ ] Custom domain is added in **"Custom domains"** tab
- [ ] DNS records are configured correctly
- [ ] DNS has propagated (check with dnschecker.org)
- [ ] SSL certificate is issued (check in Custom domains tab)
- [ ] Waited at least 15-30 minutes after DNS changes

---

## 🔄 Next Steps

Once your domain is connected:

1. **Redeploy your site** to ensure environment variables are loaded
2. **Test all features** (forms, API routes, etc.)
3. **Set up redirects** if needed (e.g., www to non-www)

---

## 💡 Pro Tip

While waiting for your custom domain to work, you can:
- Test your site using the Cloudflare Pages URL (`https://xtechs-website.pages.dev`)
- Share that URL with others for testing
- The custom domain will automatically work once DNS is configured

