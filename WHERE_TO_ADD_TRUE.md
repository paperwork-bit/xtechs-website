# Where to Add the `true` Command

## 📍 Exact Location

### Step 1: Go to Settings

1. Go to **Cloudflare Dashboard**: https://dash.cloudflare.com/
2. Click **"Pages"** in the left sidebar (or find your project under "Workers & Pages")
3. Click on **"xtechs-website"** project
4. Click **"Settings"** tab (at the top, next to "Deployments")

### Step 2: Find Build Section

1. Scroll down in the Settings page
2. Look for **"Build"** section
3. You should see:
   - Git repository: `paperwork-bit/xtechs-website`
   - Build configuration with edit icon (pencil icon)

### Step 3: Edit Build Configuration

1. Find **"Build configuration"** section
2. Next to it, you'll see an **edit icon** (pencil icon) - **click it**
3. A dialog/popup will open titled **"Build"**

### Step 4: Enter `true` in Deploy Command Field

In the **"Build"** dialog that opened:

1. Look for the field labeled **"Deploy command"** (it's marked as "Required")
2. **Click in that field** (it might currently show `npx wrangler pages deploy .next --project-name=xtechs-website` or similar)
3. **Delete everything** in that field
4. Type: `true`
5. The field should now only contain: `true`

### Step 5: Save Changes

1. Look at the bottom of the **"Build"** dialog
2. You'll see two buttons: **"Cancel"** and **"Update"** (blue button)
3. Click **"Update"** button
4. The dialog will close and settings will be saved

### Step 6: Retry Deployment

1. Go to **"Deployments"** tab (at the top)
2. Find your failed deployment
3. Click the **"Retry deployment"** button (or wait for automatic retry)

---

## 📋 Summary

**Location Path:**
1. Dashboard → **Pages** → **xtechs-website** → **Settings** tab
2. Scroll to **"Build"** section
3. Click **edit icon** (pencil) next to "Build configuration"
4. In **"Deploy command"** field → enter `true`
5. Click **"Update"**
6. Retry deployment

---

## 🎯 Visual Guide

```
Cloudflare Dashboard
└── Pages
    └── xtechs-website
        └── Settings tab
            └── Build section
                └── Build configuration [Edit icon ✏️]
                    └── "Deploy command" field
                        └── Enter: true
```

---

**That's it! Just enter `true` in the Deploy command field and click Update!**

