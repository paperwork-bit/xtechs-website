# Environment Variables Setup Guide for Cloudflare Pages

This guide will walk you through setting up all environment variables in Cloudflare Pages for your xTechs Website.

## 📍 Step-by-Step Instructions

### Step 1: Access Cloudflare Pages Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Log in to your account
3. In the left sidebar, click on **Pages**
4. Click on your project: **xtechs-website**

### Step 2: Navigate to Environment Variables

1. In your project dashboard, click on **Settings** (top menu)
2. In the left sidebar under **Settings**, click on **Environment Variables**

### Step 3: Add Environment Variables

You'll see three environments:
- **Production** - For your live site
- **Preview** - For preview deployments (pull requests)
- **Branch** - For branch-specific deployments

**Start by adding variables to Production environment.**

Click the **Add variable** button for each variable below.

---

## 🔑 Required Environment Variables

### 1. Firebase Configuration (Client-Side) - REQUIRED ✅

These are prefixed with `NEXT_PUBLIC_` and are visible in the browser.

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ` | Your Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `xtechsrenewables.firebaseapp.com` | Your Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `xtechsrenewables` | Your Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `xtechsrenewables.firebasestorage.app` | Your Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `510037402813` | Your Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:510037402813:web:a7b976c4bdf58c852d83d4` | Your Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | _(optional)_ | Leave empty if not using Analytics |

**How to add:**
1. Click **Add variable**
2. Variable name: `NEXT_PUBLIC_FIREBASE_API_KEY`
3. Value: `AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ`
4. Select environment: **Production** ✓
5. Click **Save**

Repeat for each variable above.

---

### 2. Firebase Admin SDK (Server-Side) - REQUIRED ✅

These are used for server-side operations (API routes).

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `FIREBASE_PROJECT_ID` | `xtechsrenewables` | Same as above |
| `FIREBASE_CLIENT_EMAIL` | `your-service-account@xtechsrenewables.iam.gserviceaccount.com` | Firebase Console → Project Settings → Service Accounts |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` | Download service account JSON from Firebase |

**How to get Firebase Admin credentials:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **xtechsrenewables**
3. Click **⚙️ Project Settings** (gear icon)
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Open the JSON file and extract:
   - `client_email` → Use for `FIREBASE_CLIENT_EMAIL`
   - `private_key` → Use for `FIREBASE_PRIVATE_KEY` (keep the `\n` characters)

**⚠️ Important for FIREBASE_PRIVATE_KEY:**
- When pasting in Cloudflare, keep the format exactly as shown
- Include the quotes: `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`
- The `\n` characters must be preserved (they represent newlines)

---

### 3. Site Configuration - RECOMMENDED ✅

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.xtechsrenewables.com.au` | Your website URL (or use Cloudflare Pages URL for now) |

---

### 4. Email Service - OPTIONAL (If using contact forms)

Choose **one** email service:

**Option A: Resend (Recommended)**
| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `RESEND_API_KEY` | `re_xxxxx` | [Resend Dashboard](https://resend.com/api-keys) → Create API Key |
| `FROM_EMAIL` | `noreply@xtechsrenewables.com.au` | Your sender email (must be verified in Resend) |
| `ADMIN_EMAIL` | `inquiries@xtechsrenewables.com.au` | Where to send notifications |

**Option B: SendGrid (Alternative)**
| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `SENDGRID_API_KEY` | `SG.xxxxx` | [SendGrid Dashboard](https://app.sendgrid.com/settings/api_keys) → Create API Key |
| `FROM_EMAIL` | `noreply@xtechsrenewables.com.au` | Your sender email |
| `ADMIN_EMAIL` | `inquiries@xtechsrenewables.com.au` | Where to send notifications |

---

### 5. Google Sheets/Drive Integration - OPTIONAL

If you're using Google Sheets or Drive to store data:

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `GOOGLE_SHEETS_ID` | `1xxxxx` | Google Sheet URL: `https://docs.google.com/spreadsheets/d/1xxxxx/edit` |
| `GOOGLE_DRIVE_FOLDER_ID` | `1xxxxx` | Google Drive folder URL: `https://drive.google.com/drive/folders/1xxxxx` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `your-service@project.iam.gserviceaccount.com` | Google Cloud Console → Service Accounts |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` | From service account JSON |

---

### 6. Analytics & Tracking - OPTIONAL

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXX` | [Google Analytics](https://analytics.google.com/) → Admin → Property Settings |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXXXX` | [Google Ads](https://ads.google.com/) → Tools → Conversions |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | `xxxxxxxxxxxxxxx` | [Facebook Business](https://business.facebook.com/) → Events Manager → Pixels |
| `NEXT_PUBLIC_HOTJAR_ID` | `xxxxxxxx` | [Hotjar](https://www.hotjar.com/) → Settings → Site Details |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | `xxxxxxxxxxxxxxx` | [Mixpanel](https://mixpanel.com/) → Project Settings → Project Token |

---

### 7. reCAPTCHA - OPTIONAL (If using CAPTCHA protection)

| Variable Name | Value | Where to Get It |
|--------------|-------|----------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `6Le...` | [Google reCAPTCHA](https://www.google.com/recaptcha/admin) → Create site → Site Key |
| `RECAPTCHA_SECRET_KEY` | `6Le...` | Same page → Secret Key (server-side) |

---

### 8. Additional Variables - OPTIONAL

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `DEFAULT_TENANT_ID` | `Sales` | Default tenant/organization ID |
| `NEXT_PUBLIC_LEADS_ENDPOINT` | `https://...` | Cloud Function URL if using Firebase Functions |

---

## ✅ Checklist

Use this checklist to track your progress:

### Required Variables
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `FIREBASE_PROJECT_ID`
- [ ] `FIREBASE_CLIENT_EMAIL`
- [ ] `FIREBASE_PRIVATE_KEY`

### Recommended Variables
- [ ] `NEXT_PUBLIC_SITE_URL`

### Optional Variables (add if you use these features)
- [ ] Email service variables (`RESEND_API_KEY` or `SENDGRID_API_KEY`)
- [ ] Google Sheets/Drive variables
- [ ] Analytics variables
- [ ] reCAPTCHA variables

---

## 🔄 After Adding Variables

1. **Redeploy your site** to apply the new environment variables:
   - Go to **Deployments** tab
   - Find your latest deployment
   - Click **Retry deployment** (or trigger a new deployment)

   Or manually deploy:
   ```bash
   cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
   npm run deploy:cloudflare
   ```

2. **Test your site** to ensure everything works:
   - Visit your Cloudflare Pages URL
   - Test forms, API routes, etc.

---

## 🆘 Troubleshooting

### Variable not working?
- Make sure the variable name is **exactly** as shown (case-sensitive)
- Variables starting with `NEXT_PUBLIC_` are available in the browser
- Other variables are only available server-side
- After adding variables, **redeploy** your site

### Firebase not connecting?
- Double-check all Firebase variables are correct
- Make sure `FIREBASE_PRIVATE_KEY` includes the `\n` characters
- Verify your Firebase project ID matches

### API routes not working?
- Check server-side environment variables (without `NEXT_PUBLIC_` prefix)
- Make sure Firebase Admin SDK variables are set correctly

---

## 📝 Quick Copy-Paste Format

For easy reference, here's a formatted list you can copy:

```bash
# Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=510037402813
NEXT_PUBLIC_FIREBASE_APP_ID=1:510037402813:web:a7b976c4bdf58c852d83d4

# Firebase (Server)
FIREBASE_PROJECT_ID=xtechsrenewables
FIREBASE_CLIENT_EMAIL=your-service-account@xtechsrenewables.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Site Config
NEXT_PUBLIC_SITE_URL=https://www.xtechsrenewables.com.au
```

---

## 📚 Need Help?

If you need help finding any of these values:
- Check your local `.env.local` file (in your project root)
- Refer to the service-specific setup guides:
  - `FIREBASE_SETUP.md` - Firebase configuration
  - `GOOGLE_SETUP_GUIDE.md` - Google Sheets/Drive setup
  - `ANALYTICS_SETUP.md` - Analytics configuration

