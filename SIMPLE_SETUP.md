# 🚀 Simple Setup Guide (No Firebase Admin SDK Needed)

## What This Setup Does:
- ✅ Saves contact form submissions with files locally
- ✅ Sends email notifications 
- ✅ Works without complex Firebase setup
- ✅ Easy to test and deploy

## Step 1: Set Up Email Service (5 minutes)

### Option A: Resend (Recommended)
1. **Go to**: https://resend.com/
2. **Sign up** with your email
3. **Go to API Keys** in dashboard
4. **Click "Create API Key"**
5. **Copy the key**

### Option B: SendGrid (Alternative)
1. **Go to**: https://sendgrid.com/
2. **Sign up** for free account**
3. **Go to Settings > API Keys**
4. **Create API Key**
5. **Copy the key**

## Step 2: Create Environment File (2 minutes)

Create `.env.local` file in your project root:

```env
# Email Service (choose one)
RESEND_API_KEY=your-resend-api-key-here

# OR if using SendGrid:
# SENDGRID_API_KEY=your-sendgrid-api-key-here

# Email Configuration
FROM_EMAIL=noreply@xtechsrenewables.com.au
ADMIN_EMAIL=inquiries@xtechsrenewables.com.au
```

## Step 3: Test Everything (3 minutes)

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Go to `http://localhost:3000/contact`
   - Fill out the form
   - Upload a test file (image or PDF)
   - Submit the form

3. **Check the results**:
   - Look at your terminal/console for the submission data
   - Check if you received an email notification
   - Check the `public/uploads/contact/` folder for uploaded files

## Step 4: Check Your Data

### Contact Form Submissions:
- **Console logs**: Check your terminal for submission data
- **Uploaded files**: Check `public/uploads/contact/` folder
- **Email notifications**: Check your admin email

### Site Bookings:
- **Console logs**: Check your terminal for booking data
- **Email notifications**: Check your admin email

## 🎉 You're Done!

Your website now:
- ✅ Saves contact form data (logged to console)
- ✅ Saves uploaded files locally
- ✅ Sends email notifications
- ✅ Works without complex database setup

## 📁 File Structure After Setup

```
xtechs-website/
├── public/
│   └── uploads/
│       └── contact/
│           └── [uploaded-files-here]
├── .env.local (your environment variables)
└── [your other files]
```

## 🔧 Troubleshooting

**If contact form doesn't work:**
1. Check your `.env.local` file has the correct email API key
2. Restart your server after adding environment variables
3. Check browser console for errors
4. Check server terminal for error messages

**If email notifications don't work:**
1. Verify your email service API key is correct
2. Check your email service dashboard for usage/limits
3. Check server terminal for email error messages

**If file uploads don't work:**
1. Check if `public/uploads/contact/` folder exists
2. Check server terminal for file upload errors
3. Make sure you have write permissions to the public folder

## 🚀 Next Steps (Optional)

Once this basic setup works, you can later add:
- Database storage (Firebase, Supabase, etc.)
- Cloud file storage (AWS S3, Cloudinary, etc.)
- Admin dashboard to view submissions
- Advanced email templates

## 📞 Need Help?

If you get stuck on any step, just let me know:
1. What step you're on
2. What error message you see (if any)
3. What happens when you test the form

I'll help you get it working! 🚀
