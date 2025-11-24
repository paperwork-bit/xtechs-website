# Setup Environment Variables in Cloudflare Pages

This guide will help you set up all required environment variables for your xTechs website.

## 🔑 Required Environment Variables

### 1. **RECAPTCHA_SECRET_KEY**
Your Google reCAPTCHA Secret Key (get from [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin))

### 2. **ADMIN_API_TOKEN**
A secure random token for admin API access (generated below)

### 3. **EMAIL_API_KEY** (Optional)
If you're using an email service, add your API key here

### 4. **DEFAULT_TENANT_ID** (Optional)
Default tenant ID for leads (defaults to "default" if not set)

## 📋 Step-by-Step Instructions

### Step 1: Generate Admin API Token

Use the token generated below:

```
d600047ad39c4a7008021da9933fd461a9409b9491041861e89b1fb3acd06513
```

### Step 2: Access Cloudflare Pages Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Navigate to **Pages** → **xtechs-website** (or your project name)
4. Click on **Settings** → **Environment Variables**

### Step 3: Add Environment Variables

For **Production** environment:

1. Click **Add variable**
2. Add each variable:

#### Variable 1: RECAPTCHA_SECRET_KEY
- **Variable name**: `RECAPTCHA_SECRET_KEY`
- **Value**: Your reCAPTCHA secret key from Google
- **Encrypt**: ✅ Yes (recommended)

#### Variable 2: ADMIN_API_TOKEN
- **Variable name**: `ADMIN_API_TOKEN`
- **Value**: Use the token generated below
- **Encrypt**: ✅ Yes (recommended)

#### Variable 3: EMAIL_API_KEY (if using email service)
- **Variable name**: `EMAIL_API_KEY`
- **Value**: Your email service API key
- **Encrypt**: ✅ Yes (recommended)

#### Variable 4: DEFAULT_TENANT_ID (optional)
- **Variable name**: `DEFAULT_TENANT_ID`
- **Value**: `default` or your tenant ID
- **Encrypt**: ❌ No (not sensitive)

### Step 4: Repeat for Preview Environment (Optional)

If you want the same variables for preview deployments:
1. Select **Preview** environment
2. Repeat Step 3

### Step 5: Save and Redeploy

1. Click **Save** after adding all variables
2. Trigger a new deployment:
   - Go to **Deployments**
   - Click **Retry deployment** on the latest deployment
   - Or push a new commit to trigger automatic deployment

## 🔐 Getting reCAPTCHA Keys

If you don't have reCAPTCHA keys yet:

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click **Create** to add a new site
3. Choose **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
4. Add your domains:
   - `xtechsrenewables.com.au`
   - `www.xtechsrenewables.com.au`
   - `localhost` (for development)
5. Copy the **Site Key** and **Secret Key**
6. Add **Site Key** to your frontend code (if not already added)
7. Add **Secret Key** as `RECAPTCHA_SECRET_KEY` environment variable

## ✅ Verification

After setting up, test your endpoints:

1. **Test Lead Submission**: Submit a form on your website
2. **Test Bookings**: Try creating a booking
3. **Test Admin API**: 
   ```bash
   curl -X POST https://xtechsrenewables.com.au/api/services \
     -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"index": 0, "image": "test.jpg"}'
   ```

## 🔄 Updating Variables

To update environment variables:
1. Go to Settings → Environment Variables
2. Click the variable you want to update
3. Click **Edit**
4. Update the value
5. Click **Save**
6. Redeploy your site (changes take effect on next deployment)

## 🚨 Important Notes

- Environment variables are **case-sensitive**
- Encrypted variables are safer (recommended for secrets)
- Changes require a new deployment to take effect
- Never commit secrets to git
- Keep your `ADMIN_API_TOKEN` secure and rotate it periodically

## 📞 Troubleshooting

If your API routes are returning errors:

1. **Check deployment logs**: Settings → Deployments → View logs
2. **Verify variable names**: Must match exactly (case-sensitive)
3. **Check encryption**: If encrypted, ensure it's decrypted at runtime
4. **Redeploy**: Sometimes a fresh deployment is needed

## 🎯 Quick Reference

| Variable Name | Required | Encrypt | Purpose |
|--------------|----------|---------|---------|
| `RECAPTCHA_SECRET_KEY` | ✅ Yes | ✅ Yes | Verify CAPTCHA tokens |
| `ADMIN_API_TOKEN` | ✅ Yes | ✅ Yes | Authenticate admin API calls |
| `EMAIL_API_KEY` | ❌ Optional | ✅ Yes | Send emails via external service |
| `DEFAULT_TENANT_ID` | ❌ Optional | ❌ No | Default tenant for leads |

