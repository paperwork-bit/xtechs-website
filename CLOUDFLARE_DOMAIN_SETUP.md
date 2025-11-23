# Configure Custom Domain: xtechsrenewables.com.au

## ✅ Deployment Complete!

Your site is now live on Cloudflare Pages: https://8f5e86bc.xtechs-website.pages.dev

## 🌐 Set Up Custom Domain

### Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **xtechs-website** project
3. Click on **Custom domains** tab
4. Click **Set up a custom domain**
5. Enter: `xtechsrenewables.com.au`
6. Cloudflare will automatically configure DNS records if your domain is managed by Cloudflare

### Option 2: If Domain is NOT on Cloudflare

If `xtechsrenewables.com.au` is managed by another DNS provider:

1. **In Cloudflare Pages Dashboard:**
   - Go to your project → **Custom domains**
   - Add `xtechsrenewables.com.au`
   - Cloudflare will show you the DNS records needed

2. **In Your DNS Provider:**
   - Add a **CNAME** record:
     - **Name**: `@` (or root domain)
     - **Target**: `xtechs-website.pages.dev`
   - Add a **CNAME** record:
     - **Name**: `www`
     - **Target**: `xtechsrenewables.com.au` (or `xtechs-website.pages.dev`)

3. **Wait for DNS Propagation** (5 minutes to 48 hours)

### SSL/TLS Certificate

Cloudflare will automatically provision an SSL certificate for your custom domain once DNS is configured. This usually happens automatically within a few minutes.

## 📝 Environment Variables

Make sure all environment variables are set in Cloudflare Pages:

1. Go to **Cloudflare Dashboard** → **Pages** → **xtechs-website** → **Settings** → **Environment Variables**
2. Add all variables from your `.env.local` file for **Production** environment

**Required Variables:**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=510037402813
NEXT_PUBLIC_FIREBASE_APP_ID=1:510037402813:web:a7b976c4bdf58c852d83d4
FIREBASE_PROJECT_ID=xtechsrenewables
FIREBASE_CLIENT_EMAIL=your-service-account@xtechsrenewables.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
```

## 🚀 Automatic Deployments

To enable automatic deployments from Git:

1. Go to **Cloudflare Dashboard** → **Pages** → **xtechs-website** → **Settings** → **Builds & deployments**
2. Connect your Git repository (if not already connected)
3. Configure:
   - **Production branch**: `main` or `master`
   - **Build command**: `npm run build && find .next -name '*.map' -delete`
   - **Build output directory**: `.next`

## 📊 Check Deployment Status

- **Cloudflare Pages URL**: https://xtechs-website.pages.dev (or specific deployment URL)
- **Custom Domain** (after setup): https://xtechsrenewables.com.au

## 🔧 Future Deployments

For manual deployments:
```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
npm run deploy:cloudflare
```

This will:
1. Build the Next.js app
2. Remove source maps (to stay under Cloudflare's 25MB limit)
3. Deploy to Cloudflare Pages

