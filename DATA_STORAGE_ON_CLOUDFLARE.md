# Data Storage on Cloudflare Pages

## 🔴 Current Situation

**Right now, your data storage is NOT working** because:
- The API routes have been stubbed (return 501 errors) for Cloudflare Pages compatibility
- Previous storage methods require Node.js runtime, which isn't fully available on Cloudflare Pages

## 📊 Where Data Was Stored Before:

1. **Leads** → Firebase Firestore (via `firebase-admin`) + Google Sheets
2. **Bookings** → Google Sheets (via Google Apps Script)
3. **Services** → Local file system (now static/default)
4. **PDF Reports** → Google Drive

## ✅ Where Data SHOULD Be Stored on Cloudflare Pages:

Cloudflare Pages doesn't automatically create a database. You need to **set up one of these options**:

### Option 1: **Cloudflare D1** (Recommended for Leads/Bookings)
- **Type**: SQL database (SQLite)
- **Best for**: Structured data like leads, bookings, services
- **Location**: Created in your Cloudflare account (not in "xtechs-website" database automatically)
- **Setup**: You create it manually in Cloudflare Dashboard

### Option 2: **Cloudflare KV** (For Simple Data)
- **Type**: Key-value store
- **Best for**: Simple key-value data, caching
- **Location**: Created in your Cloudflare account

### Option 3: **Cloudflare R2** (For Files/PDFs)
- **Type**: Object storage (like S3)
- **Best for**: PDF reports, images, files
- **Location**: Created in your Cloudflare account

---

## 🚀 Recommended Setup:

### 1. Create Cloudflare D1 Database
- **Dashboard** → **Workers & Pages** → **D1 SQL Database**
- Click **"Create database"**
- Name it: `xtechs-website-db`
- Choose a region
- Click **"Create"**

### 2. Bind D1 to Your Pages Project
- Go to **Pages** → **xtechs-website** → **Settings** → **Functions**
- Under **"D1 database bindings"**, click **"Add binding"**
- Name: `DB` (or `DATABASE`)
- Database: Select `xtechs-website-db`
- Click **"Save"**

### 3. Create Tables in D1
You'll need to create tables for:
- `leads` (leads data)
- `bookings` (booking data)
- `services` (services configuration)

### 4. Refactor API Routes
Update your API routes to use D1 instead of Firebase/Google Sheets:
- `/api/leads` → Store in D1 `leads` table
- `/api/bookings` → Store in D1 `bookings` table
- `/api/services` → Store in D1 `services` table

---

## 📝 Important Notes:

1. **No Automatic Database**: Cloudflare Pages doesn't automatically create a database named "xtechs-website"
2. **Manual Setup Required**: You must create D1/KV/R2 databases manually
3. **Bindings Required**: You must bind databases to your Pages project
4. **Data Migration**: You'll need to migrate existing data from Firebase/Google Sheets to D1

---

## 🔄 Migration Path:

1. **Create D1 database** in Cloudflare Dashboard
2. **Bind it** to your Pages project
3. **Create tables** (leads, bookings, services)
4. **Update API routes** to use D1 instead of Firebase/Google Sheets
5. **Migrate existing data** from Firebase/Google Sheets to D1 (if needed)

---

## ❓ Answer to Your Question:

**"The data will be stored in the database of xtechs-website?"**

**No, not automatically.** You need to:
1. Create a Cloudflare D1 database manually
2. Bind it to your `xtechs-website` Pages project
3. Update your code to use D1 instead of Firebase/Google Sheets

The database will be separate from the Pages project but connected via bindings.

