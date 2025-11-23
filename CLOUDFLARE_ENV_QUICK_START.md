# Quick Start: Setting Environment Variables in Cloudflare Pages

## 🎯 Fast 5-Step Guide

### Step 1: Go to Cloudflare Pages
1. Visit: https://dash.cloudflare.com/
2. Click **Pages** in left sidebar
3. Click on **xtechs-website** project

### Step 2: Open Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Make sure you're adding to **Production** environment

### Step 3: Add Required Firebase Variables

Click **Add variable** for each one:

#### Client-Side (NEXT_PUBLIC_*):
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = xtechsrenewables.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 510037402813
NEXT_PUBLIC_FIREBASE_APP_ID = 1:510037402813:web:a7b976c4bdf58c852d83d4
```

#### Server-Side:
```
FIREBASE_PROJECT_ID = xtechsrenewables
FIREBASE_CLIENT_EMAIL = [Get from Firebase Console - see below]
FIREBASE_PRIVATE_KEY = [Get from Firebase Console - see below]
```

### Step 4: Get Firebase Admin Credentials

1. Go to: https://console.firebase.google.com/
2. Select project: **xtechsrenewables**
3. Click **⚙️ Project Settings** (gear icon)
4. Click **Service accounts** tab
5. Click **Generate new private key**
6. Download the JSON file
7. Open JSON file, copy:
   - `client_email` → Paste as `FIREBASE_CLIENT_EMAIL`
   - `private_key` → Paste as `FIREBASE_PRIVATE_KEY` (include quotes and `\n`)

### Step 5: Redeploy

After adding all variables, redeploy your site:
```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
npm run deploy:cloudflare
```

---

## ✅ That's It!

Your site should now work with all Firebase features enabled.

For detailed instructions and optional variables, see: **ENV_VARIABLES_SETUP.md**

