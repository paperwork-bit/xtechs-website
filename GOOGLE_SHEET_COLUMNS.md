# Google Sheet Column Structure

## 📋 Leads Sheet Columns

Create a new sheet named "Leads" with these exact column headers:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J | Column K |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **Timestamp** | **Email** | **First Name** | **Last Name** | **Phone** | **Postcode** | **Suburb** | **Marketing Consent** | **Analytics Consent** | **UTM Source** | **UTM Medium** |

| Column L | Column M | Column N | Column O | Column P | Column Q | Column R | Column S | Column T | Column U | Column V |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **UTM Campaign** | **UTM Term** | **UTM Content** | **Source** | **Variant** | **Calculator Used** | **System Size (kW)** | **Total Rebates ($)** | **Final Price ($)** | **Lead ID** | **Status** |

## 📅 Bookings Sheet Columns

Create a new sheet named "Bookings" with these exact column headers:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J | Column K |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **Timestamp** | **First Name** | **Last Name** | **Email** | **Phone** | **Address** | **Service Type** | **Selected Date** | **Selected Time** | **Type** | **Notes** |

| Column L | Column M |
|----------|----------|
| **Booking ID** | **Status** |

## 🚀 Quick Setup Instructions

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"xTechs Website Data"**

### 2. Create Leads Tab
1. **Rename the first sheet** to "Leads"
2. **Add all the column headers** from the table above
3. **Format the headers** as bold (optional but recommended)

### 3. Create Bookings Tab
1. **Click the "+" button** to add a new sheet
2. **Rename it** to "Bookings"
3. **Add all the column headers** from the table above
4. **Format the headers** as bold (optional but recommended)

### 4. Get Sheet ID
1. **Copy the Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
2. **Save this ID** - you'll need it for the environment variables

## 📝 Example Data Structure

### Leads Sheet Example:
```
Timestamp | Email | First Name | Last Name | Phone | Postcode | Suburb | Marketing Consent | Analytics Consent | UTM Source | UTM Medium | UTM Campaign | UTM Term | UTM Content | Source | Variant | Calculator Used | System Size (kW) | Total Rebates ($) | Final Price ($) | Lead ID | Status
2024-01-15T10:30:00Z | john@example.com | John | Smith | 0412345678 | 3000 | Melbourne | Yes | Yes | google | cpc | solar-campaign | solar panels | banner-ad | calculator | hero | Yes | 6.6 | 2640 | 8800 | lead_1705312200_abc123 | New
```

### Bookings Sheet Example:
```
Timestamp | First Name | Last Name | Email | Phone | Address | Service Type | Selected Date | Selected Time | Type | Notes | Booking ID | Status
2024-01-15T10:30:00Z | John | Smith | john@example.com | 0412345678 | 123 Main St, Melbourne VIC 3000 | Site Assessment | 2024-01-20 | 14:00 | residential | Customer interested in 6.6kW system | booking_1705312200_def456 | New
```

## 🔧 Column Descriptions

### Leads Sheet:
- **Timestamp**: When the lead was captured
- **Email**: Customer email address
- **First Name**: Customer first name
- **Last Name**: Customer last name
- **Phone**: Customer phone number
- **Postcode**: Customer postcode
- **Suburb**: Customer suburb
- **Marketing Consent**: Yes/No for marketing emails
- **Analytics Consent**: Yes/No for analytics tracking
- **UTM Source**: Traffic source (google, facebook, etc.)
- **UTM Medium**: Traffic medium (cpc, organic, etc.)
- **UTM Campaign**: Campaign name
- **UTM Term**: Campaign term
- **UTM Content**: Campaign content
- **Source**: Internal source identifier
- **Variant**: A/B test variant
- **Calculator Used**: Yes/No if calculator was used
- **System Size (kW)**: Solar system size in kilowatts
- **Total Rebates ($)**: Total rebates amount
- **Final Price ($)**: Final price after rebates
- **Lead ID**: Unique lead identifier
- **Status**: Lead status (New, Contacted, Converted, etc.)

### Bookings Sheet:
- **Timestamp**: When the booking was made
- **First Name**: Customer first name
- **Last Name**: Customer last name
- **Email**: Customer email address
- **Phone**: Customer phone number
- **Address**: Service address
- **Service Type**: Type of service (Site Assessment, etc.)
- **Selected Date**: Appointment date (YYYY-MM-DD)
- **Selected Time**: Appointment time (HH:MM)
- **Type**: Service type category
- **Notes**: Additional notes
- **Booking ID**: Unique booking identifier
- **Status**: Booking status (New, Confirmed, Completed, etc.)

## 📱 Mobile-Friendly Setup

If you're setting this up on mobile:
1. **Use Google Sheets app**
2. **Create new spreadsheet**
3. **Add columns one by one** if needed
4. **Copy-paste column names** from this guide

## ✅ Verification Checklist

Before proceeding:
- [ ] Google Sheet created with name "xTechs Website Data"
- [ ] Leads sheet created with all 22 columns
- [ ] Bookings sheet created with all 13 columns
- [ ] Sheet ID copied from URL
- [ ] Sheet shared with service account email
- [ ] Service account has Editor permissions

## 🔗 Next Steps

Once your sheet is ready:
1. **Get the Sheet ID** from the URL
2. **Complete the JSON key download**
3. **Update your .env.local file**
4. **Test the integration**

Your Google Sheet is now ready to receive data from your website! 🎉

