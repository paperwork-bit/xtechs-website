# Fix DNS Error 1000 - Step by Step

## 🔴 Problem:
**Error 1000: DNS points to prohibited IP** - Your domain is pointing to an IP address instead of Cloudflare Pages.

## ✅ Solution: Configure DNS for Cloudflare Pages

### Step 1: Add Custom Domain in Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Navigate to: **Workers & Pages** → **Pages** → **xtechs-website**
   - Click on **"Custom domains"** tab

2. **Add Your Domain**
   - Click **"Set up a custom domain"** or **"Add custom domain"**
   - Enter: `www.xtechsrenewables.com.au`
   - Click **"Continue"** or **"Add domain"**
   - Cloudflare will validate and show you the DNS records needed

3. **Note the DNS Records Shown**
   - Cloudflare will display the exact DNS records you need
   - Usually shows a CNAME record target like: `xtechs-website.pages.dev` or similar

### Step 2: Update DNS Records

1. **Go to Your Domain's DNS Settings**
   - In Cloudflare Dashboard, select your domain: **xtechsrenewables.com.au**
   - Go to **DNS** → **Records**

2. **Remove Existing A Records (if any)**
   - Find any **A** records for `www` pointing to an IP address
   - **Delete** those records

3. **Add/Update CNAME Record**
   - Click **"Add record"**
   - **Type**: CNAME
   - **Name**: `www`
   - **Target**: Use the target shown in Cloudflare Pages (usually `xtechs-website.pages.dev` or similar)
   - **Proxy status**: Make sure it's **Proxied** (orange cloud icon) ✅
   - Click **"Save"**

4. **For Apex Domain (xtechsrenewables.com.au - optional)**
   - Cloudflare Pages will provide specific instructions
   - May need CNAME flattening or specific A records

### Step 3: Wait for DNS Propagation

- DNS changes take 5-10 minutes to propagate
- Check if the error is resolved
- The website should load correctly after DNS updates

---

## 🔍 What to Check:

1. ✅ Custom domain added in **Pages → Custom domains**?
2. ✅ DNS records using **CNAME** (not A records with IPs)?
3. ✅ Record is **Proxied** (orange cloud enabled)?
4. ✅ Using the exact target Cloudflare Pages provides?

---

## 📝 Quick Checklist:

- [ ] Added `www.xtechsrenewables.com.au` in Pages → Custom domains
- [ ] Removed any A records pointing `www` to IP addresses
- [ ] Added CNAME record: `www` → `xtechs-website.pages.dev` (or Cloudflare's provided target)
- [ ] Enabled Proxy (orange cloud) on the CNAME record
- [ ] Waited 5-10 minutes for DNS propagation

---

## ⚠️ Important Notes:

- **Cloudflare Pages doesn't use IP addresses** - always use CNAME records
- **Always use Proxied (orange cloud)** for better performance and security
- **Let Cloudflare manage the DNS** - use the records shown in Pages dashboard

