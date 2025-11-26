# How to Find Your reCAPTCHA Keys

## 📍 Current Situation

You're looking at the **Analytics/Dashboard** page. The keys are in the **Settings** section.

## 🔑 Step-by-Step: Finding Your Keys

### Method 1: From the Dashboard Page

1. **Look at the top navigation bar** on your reCAPTCHA page
2. You should see tabs or menu items like:
   - **Dashboard** (where you are now)
   - **Settings** or **Configuration** ← Click this!
   - **Keys** or **API Keys**
   - Or a **gear/settings icon** ⚙️

3. **Click on "Settings"** (or the gear icon)

4. **You should now see:**
   - **Site Key** (starts with `6L...`)
   - **Secret Key** (starts with `6L...` or `6Le...`)

### Method 2: If You Don't See Settings Tab

1. **Click on your site name** in the top left (next to "v3 Website")
2. This should open a dropdown or take you to site settings
3. Look for **"Keys"** or **"Settings"** section

### Method 3: Direct URL

Try going directly to the settings page:
- Replace the URL you're on with: `https://www.google.com/recaptcha/admin/site/[YOUR_SITE_ID]/settings`
- Or add `/settings` to the end of your current URL

## 📸 What to Look For

Once you're in Settings, you'll see something like:

```
Site Key
6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890

Secret Key
6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz
```

## 🔄 Alternative: Create New Keys

If you can't find the keys or they're lost:

1. **Click the "+" (plus) button** in the top navigation
2. Or go to: https://www.google.com/recaptcha/admin/create
3. Choose:
   - **reCAPTCHA v2** → **"I'm not a robot" Checkbox** (recommended for forms)
   - OR **reCAPTCHA v3** (if you prefer score-based)
4. Add your domains:
   - `xtechsrenewables.com.au`
   - `www.xtechsrenewables.com.au`
   - `localhost` (for development)
5. Click **Submit**
6. **Copy both keys immediately** (Secret Key is only shown once!)

## ⚠️ Important Notes

1. **Secret Key is only shown once** when created
2. If you lose the Secret Key, you'll need to create a new site
3. **Site Key** is public (can be in your frontend code)
4. **Secret Key** is private (must be in environment variables only!)

## 🎯 Which Key Goes Where?

- **Site Key** → Frontend code (React components, forms)
- **Secret Key** → Cloudflare environment variable as `RECAPTCHA_SECRET_KEY`

## 🔍 Still Can't Find It?

1. **Check if you're logged into the correct Google account**
2. **Try creating a new site** (the keys will be shown immediately after creation)
3. **Check browser tabs** - maybe keys are in another tab

## 📝 Quick Checklist

- [ ] Click on **Settings** or **Configuration** tab
- [ ] Look for **Site Key** and **Secret Key** sections
- [ ] Copy the **Secret Key** → This goes to Cloudflare `RECAPTCHA_SECRET_KEY`
- [ ] Save it securely (it's only shown once!)

If you're still having trouble, I can help you create new keys from scratch.

