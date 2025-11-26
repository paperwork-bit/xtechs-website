# How to Configure D1 Database Binding in Cloudflare Pages

## Issue
You're seeing "Service temporarily unavailable" because the D1 database binding is not configured in your Cloudflare Pages project.

## Solution: Add D1 Binding in Cloudflare Pages Dashboard

### Step 1: Go to Cloudflare Pages Settings

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** → **xtechs-website**
3. Click on **"Settings"** tab
4. Scroll down to **"Functions"** section

### Step 2: Configure D1 Database Binding

1. In the **"Functions"** section, find **"D1 Database bindings"**
2. Click **"Add binding"** or **"Edit bindings"**
3. Fill in:
   - **Variable name**: `DB` (must be exactly `DB`)
   - **D1 Database**: Select `xtechs-website` from the dropdown
     - If you don't see it, you may need to create the database first
4. Click **"Save"**

### Step 3: Verify Database Exists

If you don't see `xtechs-website` in the dropdown:

1. Go to **Workers & Pages** → **D1** in Cloudflare Dashboard
2. Check if `xtechs-website` database exists
3. If not, create it:
   - Click **"Create database"**
   - Name: `xtechs-website`
   - Click **"Create"**
   - Copy the **Database ID** (you already have it: `4097a40a-a415-4643-8c67-be6d1a395171`)

### Step 4: Apply Schema (If Not Done)

If the database is empty, you need to run the schema:

1. Go to **Workers & Pages** → **D1** → **xtechs-website**
2. Click **"Console"** tab
3. Copy and paste the SQL from `d1-schema.sql`
4. Click **"Run query"**

### Step 5: Trigger New Deployment

After adding the binding:

1. Go to **Deployments** tab
2. Click **"Retry deployment"** on the latest deployment
   - OR push a new commit to trigger automatic deployment

## Alternative: Check if Binding is Configured

You can verify if the binding is configured:

1. Go to **Pages** → **xtechs-website** → **Settings** → **Functions**
2. Look for **"D1 Database bindings"** section
3. You should see `DB` listed there

## Quick Fix Checklist

- [ ] Database `xtechs-website` exists in D1
- [ ] Schema has been applied (check `d1-schema.sql`)
- [ ] D1 binding `DB` is configured in Pages Settings → Functions
- [ ] New deployment triggered after adding binding
- [ ] Environment variables `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are set

## Still Having Issues?

If the binding is configured but still not working:

1. Check deployment logs in Cloudflare Dashboard
2. Verify the binding name is exactly `DB` (case-sensitive)
3. Make sure you're checking the correct environment (Production vs Preview)
4. Try creating a new deployment after configuration

