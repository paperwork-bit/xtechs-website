# Cloudflare Pages Deployment Guide for xTechs Website

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://www.cloudflare.com/)
2. **Domain**: Ensure you have access to `xtechsrenewables.com.au` DNS settings
3. **GitHub Repository**: Your code should be in a Git repository (GitHub recommended)

## Step 1: Install Wrangler CLI (Optional)

```bash
npm install -g wrangler
```

Or use Wrangler via npx without installing globally.

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate with Cloudflare.

## Step 3: Connect Your Repository to Cloudflare Pages

### Option A: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your Git provider (GitHub, GitLab, or Bitbucket)
6. Authorize Cloudflare to access your repositories
7. Select the repository containing your xTechs website
8. Configure the build settings:
   - **Project name**: `xtechs-website`
   - **Production branch**: `main` or `master`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `xtechs-website` (if your repo root is not the project root)

### Option B: Via Wrangler CLI

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
wrangler pages project create xtechs-website
```

## Step 4: Configure Environment Variables

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables for **Production**:

```bash
# Firebase Web SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=510037402813
NEXT_PUBLIC_FIREBASE_APP_ID=1:510037402813:web:a7b976c4bdf58c852d83d4

# Firebase Admin SDK (for server-side API routes)
FIREBASE_PROJECT_ID=xtechsrenewables
FIREBASE_CLIENT_EMAIL=your-service-account@xtechsrenewables.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Google Sheets API (if using)
GOOGLE_SHEETS_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"

# Google Drive API (if using)
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id

# Email service (if using)
RESEND_API_KEY=your_resend_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@xtechsrenewables.com.au
ADMIN_EMAIL=inquiries@xtechsrenewables.com.au

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.xtechsrenewables.com.au

# Analytics (if using)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token

# reCAPTCHA (if using)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Step 5: Configure Custom Domain

### In Cloudflare Dashboard:

1. Go to your Cloudflare Pages project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Enter `xtechsrenewables.com.au`
5. Cloudflare will automatically configure DNS records

### DNS Configuration:

If you manage DNS elsewhere, add these DNS records:

```
Type: CNAME
Name: www (or @)
Content: xtechs-website.pages.dev
Proxy: Enabled (orange cloud)
```

Or:

```
Type: A
Name: @
Content: [Cloudflare Pages IP - check Cloudflare dashboard]
```

```
Type: CNAME
Name: www
Content: xtechsrenewables.com.au
```

## Step 6: Deploy

### Automatic Deployment (Recommended)

Once connected to Git, Cloudflare Pages will automatically deploy on every push to your production branch.

### Manual Deployment via Wrangler

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
npm run build
wrangler pages deploy .next --project-name=xtechs-website
```

### Manual Deployment via Dashboard

1. Go to your Cloudflare Pages project
2. Click **Deployments** tab
3. Click **Create deployment**
4. Upload your `.next` build folder

## Step 7: Build Configuration

Cloudflare Pages needs to know how to build your Next.js app. Update the build settings:

- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: Leave empty (or `xtechs-website` if needed)

## Important Notes

### Next.js on Cloudflare Pages

Cloudflare Pages now has **native support for Next.js 13+**. Your app should work with:
- ✅ Static pages
- ✅ Server-side rendering (SSR)
- ✅ API routes (via Cloudflare Functions)
- ✅ Dynamic routes
- ⚠️ Some Node.js-specific APIs may need adjustments

### Limitations

1. **File System**: Some API routes use Node.js file system. These may need to be refactored to use Cloudflare KV, D1, or external storage (like Firebase Storage).

2. **Firebase Admin SDK**: Should work, but may need configuration for Cloudflare's runtime.

3. **Environment Variables**: Make sure all required variables are set in Cloudflare Pages dashboard.

### Troubleshooting

1. **Build Failures**: Check build logs in Cloudflare Pages dashboard
2. **API Routes Not Working**: Check Cloudflare Functions logs
3. **Environment Variables**: Ensure all variables are set correctly

## Quick Start Commands

```bash
# Install dependencies
npm install

# Build locally
npm run build

# Test build output
npm start

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=xtechs-website
```

## Next Steps

1. ✅ Push your code to GitHub/GitLab/Bitbucket
2. ✅ Connect repository to Cloudflare Pages
3. ✅ Configure environment variables
4. ✅ Set up custom domain
5. ✅ Deploy and verify

Your site will be available at:
- **Cloudflare Pages URL**: `https://xtechs-website.pages.dev`
- **Custom Domain**: `https://www.xtechsrenewables.com.au` and `https://xtechsrenewables.com.au`

