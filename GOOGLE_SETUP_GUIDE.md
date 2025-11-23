# Google Sheets & Drive Setup Guide

## 🚀 Quick Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: `xtechs-website`
3. Enable these APIs:
   - Google Sheets API
   - Google Drive API

### 2. Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Fill in:
   - **Name**: `xtechs-website-service`
   - **Description**: `Service account for xTechs website data collection`
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### 3. Generate Service Account Key

1. Click on your service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Download the JSON file

### 4. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `xTechs Website Data`
4. Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### 5. Create Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder: `xTechs Website Files`
3. Right-click → **Share** → Add your service account email
4. Give it **Editor** permissions
5. Copy the Folder ID from URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

### 6. Share Resources with Service Account

**Share Google Sheet:**
1. Open your Google Sheet
2. Click **Share** button
3. Add service account email: `your-service-account@your-project.iam.gserviceaccount.com`
4. Give **Editor** permissions
5. Click **Send**

**Share Google Drive Folder:**
1. Open your Google Drive folder
2. Right-click → **Share**
3. Add service account email: `your-service-account@your-project.iam.gserviceaccount.com`
4. Give **Editor** permissions
5. Click **Send**

### 7. Update Environment Variables

Update your `.env.local` file with these values:

```bash
# Firebase Web SDK (client-side) - Keep for analytics
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAlyayuCBth9xpaeZR4Ff0oYtTCCLx7tEo
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=multi-tenant-88ce1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=multi-tenant-88ce1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=multi-tenant-88ce1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=648947011961
NEXT_PUBLIC_FIREBASE_APP_ID=1:648947011961:web:f2796bc71dd6ad28ef9fa8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Google Sheets API (REQUIRED)
GOOGLE_SHEETS_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Google Drive API (REQUIRED)
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id_here

# Email service (OPTIONAL - for notifications)
RESEND_API_KEY=
SENDGRID_API_KEY=
FROM_EMAIL=noreply@xtechsrenewables.com.au
ADMIN_EMAIL=inquiries@xtechsrenewables.com.au
```

### 8. Extract Values from Service Account JSON

From your downloaded JSON file, extract:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```

Use:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

## 📊 What Gets Stored

### Google Sheets - Leads Tab
- Timestamp, Email, Name, Phone, Postcode, Suburb
- Marketing & Analytics consent
- UTM parameters (source, medium, campaign, etc.)
- Calculator results (system size, rebates, final price)
- Lead ID

### Google Sheets - Bookings Tab
- Timestamp, Customer details, Service type
- Selected date and time
- Address and notes
- Booking ID and status

### Google Drive
- Generated PDF reports
- Customer documents
- System photos (if uploaded)

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test lead capture:
   - Fill out the calculator
   - Submit lead form
   - Check Google Sheets for new row

3. Test booking system:
   - Try to book an appointment
   - Check Google Sheets Bookings tab

4. Test PDF generation:
   - Complete calculator with results
   - Submit lead form
   - Check Google Drive for generated PDF

## 🚨 Troubleshooting

### Common Issues:

1. **"Missing Google Sheets configuration"**
   - Check all environment variables are set
   - Verify service account email format

2. **"Permission denied"**
   - Make sure you shared the Sheet and Drive folder with service account
   - Check service account has Editor permissions

3. **"Sheet not found"**
   - Verify GOOGLE_SHEETS_ID is correct
   - Make sure Sheet is shared with service account

4. **"Folder not found"**
   - Verify GOOGLE_DRIVE_FOLDER_ID is correct
   - Make sure folder is shared with service account

### Debug Steps:

1. Check environment variables:
   ```bash
   echo $GOOGLE_SHEETS_ID
   echo $GOOGLE_SERVICE_ACCOUNT_EMAIL
   ```

2. Test API connection:
   ```bash
   npm run dev
   # Check browser console for errors
   ```

3. Check Google Cloud Console:
   - Verify APIs are enabled
   - Check service account permissions

## 🎯 Benefits of This Setup

✅ **No Firebase complexity** - Simple Google services
✅ **Easy data access** - View data directly in Google Sheets
✅ **File storage** - PDFs stored in Google Drive
✅ **Cost effective** - Google Sheets/Drive are free for reasonable usage
✅ **Familiar interface** - Easy to manage data
✅ **Collaboration** - Share sheets with team members
✅ **Backup** - Google handles backup automatically

## 📈 Next Steps

Once this is working:
1. Set up email notifications (optional)
2. Create admin dashboard to view bookings
3. Add automated reminders
4. Set up data analysis in Google Sheets

