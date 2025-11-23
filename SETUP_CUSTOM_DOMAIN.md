# Setup Custom Domain: xtechsrenewables.com.au

## ✅ Deployment Successful!

Your site is now live on Cloudflare Pages! Now let's connect your custom domain.

---

## 🌐 Step-by-Step: Add Custom Domain

### Step 1: Go to Custom Domains

1. **Cloudflare Dashboard** → **Pages** → **xtechs-website** project
2. Click **"Custom domains"** tab (at the top, next to Deployments)
3. Click **"Set up a custom domain"** button

### Step 2: Enter Your Domain

1. In the dialog that opens, enter: `xtechsrenewables.com.au`
2. Click **"Continue"** or **"Add domain"**

### Step 3: Configure DNS

Cloudflare will automatically configure DNS if your domain is already on Cloudflare.

**If domain is on Cloudflare:**
- ✅ DNS is configured automatically
- ✅ Wait 5-15 minutes for DNS propagation

**If domain is NOT on Cloudflare:**
- You'll see DNS records you need to add
- Add them to your DNS provider (where you manage xtechsrenewables.com.au)

---

## 📋 DNS Configuration

### If Domain is on Cloudflare (Automatic)

Cloudflare will automatically create:
- **CNAME** record pointing to `xtechs-website.pages.dev`
- SSL certificate will be issued automatically

### If Domain is on Another DNS Provider (Manual)

Add these DNS records:

**Option 1 - CNAME (Recommended):**
- **Type:** CNAME
- **Name:** `@` (or root domain, or leave blank)
- **Target:** `xtechs-website.pages.dev`
- **TTL:** 3600 (or default)

**Option 2 - Also add www subdomain:**
- **Type:** CNAME
- **Name:** `www`
- **Target:** `xtechs-website.pages.dev`
- **TTL:** 3600

---

## 🔒 SSL Certificate

1. **Cloudflare will automatically issue an SSL certificate**
2. This usually takes **5-15 minutes** after DNS is configured
3. Check status in **Custom domains** tab

---

## ✅ Verify Setup

### Check Domain Status:

1. Go to **Custom domains** tab
2. You should see `xtechsrenewables.com.au` listed
3. Status should show:
   - **"Active"** or **"Valid"** ✅
   - SSL certificate status (should show as Active/Valid)

### Test Your Domain:

1. **Wait 15-30 minutes** after adding the domain
2. Visit: `https://xtechsrenewables.com.au`
3. Also try: `https://www.xtechsrenewables.com.au`

---

## ⏱️ Wait Times

- **DNS Propagation:** 15 minutes to 48 hours (usually 15-30 minutes)
- **SSL Certificate:** 5-15 minutes after DNS is configured
- **Domain Activation:** Usually immediate

---

## 🆘 Troubleshooting

### Domain Not Working After Setup?

1. **Check DNS propagation:**
   - Visit: https://dnschecker.org/
   - Enter: `xtechsrenewables.com.au`
   - Check if DNS has propagated globally

2. **Wait longer:**
   - DNS can take up to 48 hours (but usually 15-30 minutes)
   - SSL certificates take 5-15 minutes

3. **Clear browser cache:**
   - Try in incognito/private mode
   - Clear browser cache and cookies

4. **Check Cloudflare Pages status:**
   - Go to Custom domains tab
   - Verify domain shows as "Active" or "Valid"

---

## 📋 Quick Checklist

- [ ] Go to Pages → xtechs-website → Custom domains tab
- [ ] Click "Set up a custom domain"
- [ ] Enter: `xtechsrenewables.com.au`
- [ ] Click Continue/Add domain
- [ ] Configure DNS (automatic if on Cloudflare)
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Wait 5-15 minutes for SSL certificate
- [ ] Test: `https://xtechsrenewables.com.au`

---

## 🎉 After Setup Complete

Your site will be available at:
- ✅ `https://xtechsrenewables.com.au`
- ✅ `https://www.xtechsrenewables.com.au` (if configured)

---

**Ready to set up the domain? Follow the steps above!**

