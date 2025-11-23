# Quick Start: Deploy to Cloudflare Pages

## 🚀 Fastest Way: Cloudflare Dashboard

### Step 1: Push Code to GitHub (if not already done)
```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
git init  # if not already a git repo
git add .
git commit -m "Initial commit"
# Push to GitHub repository
```

### Step 2: Connect to Cloudflare Pages
1. Go to https://dash.cloudflare.com/
2. Click **Pages** in left sidebar
3. Click **Create a project** → **Connect to Git**
4. Authorize and select your repository
5. Configure build:
   - **Project name**: `xtechs-website`
   - **Production branch**: `main` (or `master`)
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: (leave empty or `xtechs-website` if needed)
   - **Framework preset**: Next.js (auto-detected)

### Step 3: Add Environment Variables
In Cloudflare Pages dashboard → Your project → **Settings** → **Environment Variables**:

Copy all variables from your `.env.local` file (except ones marked `LOCAL`).

**Required:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Step 4: Set Custom Domain
1. In Cloudflare Pages → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `xtechsrenewables.com.au`
4. Cloudflare will auto-configure DNS

### Step 5: Deploy!
Your first deployment will start automatically. Wait 2-5 minutes.

Your site will be live at:
- **Cloudflare Pages URL**: `https://xtechs-website.pages.dev`
- **Custom Domain**: `https://xtechsrenewables.com.au`

---

## 🔧 Manual Deployment (via CLI)

If you prefer manual deployments:

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Build and deploy
npm run deploy:cloudflare
# or
npm run cf:deploy
```

---

## 📝 Notes

- **Automatic Deployments**: Once connected to Git, every push to main branch auto-deploys
- **Preview Deployments**: Pull requests get preview URLs automatically
- **Environment Variables**: Set per environment (Production, Preview, Branch)
- **Build Logs**: View in Cloudflare Pages dashboard under "Deployments"

For detailed instructions, see `CLOUDFLARE_DEPLOYMENT.md`

