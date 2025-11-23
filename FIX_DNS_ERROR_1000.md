# Fix Error 1000: DNS points to prohibited IP

## 🔴 The Problem:

You're seeing **Error 1000: DNS points to prohibited IP** on `www.xtechsrenewables.com.au`.

This happens when DNS records point to an IP address that Cloudflare doesn't allow.

## ✅ Solution: Configure DNS for Cloudflare Pages

For Cloudflare Pages, you need to configure DNS records differently - **not pointing to an IP**, but using Cloudflare's Pages DNS.

### Step 1: Add Custom Domain in Cloudflare Pages Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to **Workers & Pages** → **xtechs-website** → **Custom domains**

2. **Add Custom Domain**
   - Click **"Set up a custom domain"** or **"Add custom domain"**
   - Enter: `www.xtechsrenewables.com.au`
   - Click **"Continue"** or **"Add domain"**

3. **Cloudflare will show you the DNS records needed**

### Step 2: Update DNS Records in Cloudflare DNS

1. **Go to DNS Settings**
   - In Cloudflare Dashboard, select your domain: `xtechsrenewables.com.au`
   - Go to **DNS** → **Records**

2. **Remove/Update Existing Records**
   - Find any A records pointing `www` to an IP address
   - **Delete** or **edit** them

3. **Add CNAME Record for Cloudflare Pages**
   - Type: **CNAME**
   - Name: `www` (or `@` for apex domain)
   - Target: Your Cloudflare Pages URL (e.g., `xtechs-website.pages.dev`)
   - Proxy status: **Proxied** (orange cloud) ✅
   - Click **"Save"**

4. **For Apex Domain (optional - if you want xtechsrenewables.com.au without www)**
   - Cloudflare Pages will provide specific DNS records
   - Usually a CNAME flattening or A record pointing to Cloudflare

### Step 3: Verify DNS Propagation

- Wait 5-10 minutes for DNS to propagate
- Check if `www.xtechsrenewables.com.au` resolves correctly
- The error should disappear once DNS is correctly configured

---

## 📋 Important Notes:

1. **Don't Use IP Addresses**: Cloudflare Pages doesn't use static IPs - use CNAME records instead
2. **Use Cloudflare Proxy**: Make sure the orange cloud (Proxied) is enabled
3. **Let Cloudflare Manage DNS**: After adding domain in Pages, Cloudflare will show you the exact records needed

---

## 🔍 What to Check:

1. ✅ Is the domain added in **Pages → Custom domains**?
2. ✅ Are DNS records using **CNAME** (not A records with IPs)?
3. ✅ Is the domain **Proxied** (orange cloud enabled)?
4. ✅ Are you using the DNS records shown in Cloudflare Pages dashboard?

---

## 🚀 Quick Fix:

**Easiest method:**
1. Go to **Pages → xtechs-website → Custom domains**
2. Click **"Set up a custom domain"**
3. Enter: `www.xtechsrenewables.com.au`
4. Follow the instructions Cloudflare gives you
5. Update DNS records in your domain's DNS settings as instructed

