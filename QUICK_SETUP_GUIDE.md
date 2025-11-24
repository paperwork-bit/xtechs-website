# 🚀 Quick Setup Guide - Security Configuration

Follow these steps to complete the security setup for your xTechs website.

## ⚡ Quick Checklist

- [ ] Set up environment variables in Cloudflare Pages
- [ ] Configure rate limiting rules
- [ ] Test your endpoints
- [ ] Verify everything works

## 🔑 Step 1: Environment Variables (5 minutes)

### Your Generated Admin API Token:
```
d600047ad39c4a7008021da9933fd461a9409b9491041861e89b1fb3acd06513
```

**📋 What to do:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → **xtechs-website** → Settings → **Environment Variables**

2. Add these variables for **Production**:

   | Variable Name | Value | Encrypt? |
   |--------------|-------|----------|
   | `RECAPTCHA_SECRET_KEY` | Your reCAPTCHA secret key | ✅ Yes |
   | `ADMIN_API_TOKEN` | `d600047ad39c4a7008021da9933fd461a9409b9491041861e89b1fb3acd06513` | ✅ Yes |
   | `EMAIL_API_KEY` | Your email service API key (if using) | ✅ Yes (if used) |

3. Click **Save**

4. **Trigger a new deployment** (Settings → Deployments → Retry deployment)

### 📝 Need reCAPTCHA Keys?

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click **Create** → Choose **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
3. Add domains: `xtechsrenewables.com.au`, `www.xtechsrenewables.com.au`, `localhost`
4. Copy the **Secret Key** → Use as `RECAPTCHA_SECRET_KEY`

## 🛡️ Step 2: Rate Limiting (10 minutes)

1. Go to Cloudflare Dashboard → **Security** → **WAF** → **Rate limiting rules**
2. Click **Create rule**

### Rule 1: Leads Endpoint
- **Name**: `API Leads Rate Limit`
- **Expression**: `(http.request.uri.path eq "/api/leads" and http.request.method eq "POST")`
- **Rate**: `10 requests per 1 minute`
- **Action**: `Block for 10 minutes`
- Click **Deploy**

### Rule 2: Bookings Endpoint
- **Name**: `API Bookings Rate Limit`
- **Expression**: `(http.request.uri.path eq "/api/bookings" and http.request.method eq "POST")`
- **Rate**: `5 requests per 1 minute`
- **Action**: `Block for 10 minutes`
- Click **Deploy**

### Rule 3: Subscribe Endpoint
- **Name**: `API Subscribe Rate Limit`
- **Expression**: `(http.request.uri.path eq "/api/leads/subscribe" and http.request.method eq "POST")`
- **Rate**: `5 requests per 1 minute`
- **Action**: `Block for 10 minutes`
- Click **Deploy**

## ✅ Step 3: Verify Setup (2 minutes)

After deployment completes, test:

1. **Test a form submission** on your website
2. **Check browser console** for errors (F12)
3. **Check Cloudflare logs** if issues occur

## 📚 Detailed Guides

For more detailed information, see:
- `SETUP_ENVIRONMENT_VARIABLES.md` - Complete environment variable setup
- `SETUP_RATE_LIMITING.md` - Detailed rate limiting guide
- `SECURITY_REVIEW.md` - Full security documentation

## 🆘 Troubleshooting

**Problem**: API routes returning errors
- **Solution**: Check environment variables are set correctly and deployment is complete

**Problem**: CAPTCHA not working
- **Solution**: Verify `RECAPTCHA_SECRET_KEY` matches your reCAPTCHA secret key

**Problem**: Rate limiting blocking legitimate users
- **Solution**: Adjust limits in Cloudflare Dashboard → Rate limiting rules

## 🎯 What's Protected Now

✅ SQL Injection attacks  
✅ XSS attacks  
✅ Spam submissions  
✅ Brute force attempts  
✅ Unauthorized API access  
✅ DDoS attacks (via rate limiting)

---

**⏱️ Total setup time: ~15 minutes**

