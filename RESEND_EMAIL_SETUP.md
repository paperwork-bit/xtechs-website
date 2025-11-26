# Email Notifications Setup with Resend

## Overview
Email notifications are now configured to send automated emails to `inquiries@xtechsrenewables.com.au` when:
- A customer submits a booking for a site assessment
- A customer submits the contact form

## Setup Instructions

### Step 1: Create Resend Account

1. **Go to**: [https://resend.com](https://resend.com)
2. **Sign up** for a free account (100 emails/day free)
3. **Verify your email** address

### Step 2: Get Your API Key

1. **Log in** to Resend Dashboard
2. Go to **"API Keys"** in the sidebar
3. Click **"Create API Key"**
4. Give it a name: `xTechs Website`
5. Select permissions: **"Sending access"**
6. Click **"Add"**
7. **Copy the API key** (you'll only see it once!)

### Step 3: Verify Your Domain (Required)

To send emails from `noreply@xtechsrenewables.com.au`, you need to verify your domain:

1. Go to **"Domains"** in Resend Dashboard
2. Click **"Add Domain"**
3. Enter: `xtechsrenewables.com.au`
4. Click **"Add"**
5. **Add DNS records** to your domain:
   - Copy the DNS records shown (SPF, DKIM, etc.)
   - Add them to your domain's DNS settings (Cloudflare)
   - Wait for verification (usually 5-15 minutes)

### Step 4: Add API Key to Cloudflare Pages

1. Go to **Cloudflare Dashboard** → **Pages** → **xtechs-website**
2. Click **"Settings"** tab
3. Scroll to **"Environment Variables"**
4. Click **"Add variable"**
5. Add:
   - **Variable name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (from Step 2)
   - **Environment**: Select **"Production"** and **"Preview"**
6. Click **"Save"**

### Step 5: Trigger New Deployment

After adding the environment variable:
1. Go to **"Deployments"** tab
2. Click **"Retry deployment"** on the latest deployment
   - OR push a new commit to trigger automatic deployment

## Email Configuration

The email system is configured with:
- **From Email**: `noreply@xtechsrenewables.com.au`
- **To Email**: `inquiries@xtechsrenewables.com.au`
- **Service**: Resend API

You can change these in `src/lib/email.ts` if needed.

## What Gets Emailed

### Booking Notifications
When a customer books a site assessment, you'll receive an email with:
- Customer name, email, phone
- Property address
- Appointment date and time
- Service type
- Any additional notes

### Contact Form Notifications
When a customer submits the contact form, you'll receive an email with:
- Customer name and email
- Subject line
- Message content
- Number of files attached (if any)

## Testing

1. **Test booking form**:
   - Go to `/contact`
   - Click "Book Assessment" tab
   - Fill out and submit the form
   - Check `inquiries@xtechsrenewables.com.au` for the email

2. **Test contact form**:
   - Go to `/contact`
   - Click "Contact Us" tab
   - Fill out and submit the form
   - Check `inquiries@xtechsrenewables.com.au` for the email

## Troubleshooting

### Emails not sending?
1. Check that `RESEND_API_KEY` is set in Cloudflare Pages environment variables
2. Verify your domain is verified in Resend dashboard
3. Check deployment logs for any email errors
4. Make sure domain DNS records are added correctly

### Domain verification failing?
- Make sure all DNS records are added to Cloudflare DNS
- Wait 15-30 minutes for DNS propagation
- Check Resend dashboard for verification status

### Need to send more emails?
- Free tier: 100 emails/day
- Paid plans start at $20/month for 50,000 emails

## Alternative: Use Different Email Service

If you prefer a different email service, you can modify `src/lib/email.ts` to use:
- SendGrid
- Mailgun
- AWS SES
- Any SMTP server

The functions `sendBookingNotification()` and `sendContactNotification()` can be updated to use your preferred service.

