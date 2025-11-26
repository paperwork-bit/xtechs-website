# Cloudflare Turnstile Setup Guide

## Overview
This website uses **Cloudflare Turnstile** for CAPTCHA protection instead of Google reCAPTCHA. Turnstile is privacy-focused, free, and integrates seamlessly with Cloudflare Pages.

## Benefits of Cloudflare Turnstile
- ✅ **Privacy-focused**: No tracking cookies or user data collection
- ✅ **Better UX**: Often invisible to users (no checkbox needed)
- ✅ **Free & Unlimited**: No usage limits
- ✅ **Cloudflare Integration**: Works perfectly with Cloudflare Pages
- ✅ **Fast**: Served from Cloudflare's global network

## Setup Instructions

### Step 1: Get Turnstile Keys from Cloudflare Dashboard

1. **Log in to Cloudflare Dashboard**
   - Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign in with your Cloudflare account

2. **Navigate to Turnstile**
   - In the left sidebar, find **"Turnstile"** under **"Security"**
   - Click on it

3. **Add a New Site**
   - Click **"Add Site"** or **"Create"** button
   - Fill in the form:
     - **Site name**: `xTechs Website` (or any descriptive name)
     - **Domain**: `xtechsrenewables.com.au` (or your domain)
     - **Widget mode**: Choose **"Managed"** (recommended - invisible to users)
     - **Pre-Clearance**: Optional, can be enabled later

4. **Copy Your Keys**
   - After creating the site, you'll see:
     - **Site Key** (Public Key) - starts with something like `0x...`
     - **Secret Key** (Private Key) - starts with something like `0x...`

### Step 2: Add Environment Variables to Cloudflare Pages

1. **Go to Cloudflare Pages Dashboard**
   - Navigate to: [https://dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **xtechs-website**

2. **Open Environment Variables**
   - Click on **"Settings"** tab
   - Scroll down to **"Environment Variables"** section
   - Click **"Add variable"**

3. **Add Two Environment Variables**

   **Variable 1: NEXT_PUBLIC_TURNSTILE_SITE_KEY**
   - **Variable name**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Value**: Your Turnstile **Site Key** (from Step 1)
   - **Environment**: Select **"Production"** and **"Preview"**
   - Click **"Save"**

   **Variable 2: TURNSTILE_SECRET_KEY**
   - **Variable name**: `TURNSTILE_SECRET_KEY`
   - **Value**: Your Turnstile **Secret Key** (from Step 1)
   - **Environment**: Select **"Production"** and **"Preview"**
   - Click **"Save"**

### Step 3: Remove Old reCAPTCHA Variables (If Any)

If you previously set up Google reCAPTCHA, you can remove these variables:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

They are no longer needed.

### Step 4: Trigger a New Deployment

After adding the environment variables:
1. Go to **"Deployments"** tab
2. Click **"Retry deployment"** on the latest deployment
   - OR push a new commit to trigger automatic deployment
3. Wait 2-5 minutes for deployment to complete

## Verification

### Test the Contact Form

1. Visit your website: `https://xtechsrenewables.com.au/contact`
2. Fill out the contact form
3. The Turnstile widget should appear (or work invisibly in Managed mode)
4. Submit the form
5. It should submit successfully!

### Check Browser Console

Open browser developer tools (F12) and check for:
- ✅ No errors related to Turnstile
- ✅ No errors related to CAPTCHA verification

## Troubleshooting

### Issue: "Turnstile site key not configured" message

**Solution**: 
- Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in Cloudflare Pages environment variables
- Make sure you've triggered a new deployment after adding the variable

### Issue: "CAPTCHA verification failed" error

**Solution**:
- Check that `TURNSTILE_SECRET_KEY` is set in Cloudflare Pages environment variables
- Verify the secret key matches the site key in your Turnstile dashboard
- Check that both keys are for the same domain

### Issue: Turnstile widget not appearing

**Solution**:
- Check browser console for JavaScript errors
- Verify the Turnstile script is loading: `https://challenges.cloudflare.com/turnstile/v0/api.js`
- Make sure your domain is added correctly in Turnstile dashboard

## Widget Modes

### Managed Mode (Recommended)
- **Invisible** to users - no checkbox needed
- Best user experience
- Cloudflare automatically determines if verification is needed

### Non-Interactive Mode
- Shows a challenge but user doesn't need to interact
- Good balance between UX and security

### Interactive Mode
- Shows a checkbox like old CAPTCHAs
- Most secure but requires user interaction

You can change the mode in the Turnstile dashboard after creating the site.

## Need Help?

- **Cloudflare Turnstile Docs**: [https://developers.cloudflare.com/turnstile](https://developers.cloudflare.com/turnstile)
- **Cloudflare Dashboard**: [https://dash.cloudflare.com](https://dash.cloudflare.com)

