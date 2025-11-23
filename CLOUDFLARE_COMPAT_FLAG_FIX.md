# How to Add nodejs_compat Flag in Cloudflare Pages

## 🔴 The Issue:
You're seeing the "Node.JS Compatibility Error - no nodejs_compat compatibility flag set" error, and the flag doesn't appear in the dropdown list.

## ✅ Solution: Type the Flag Manually

The `nodejs_compat` flag might not appear in the dropdown, but you can **type it manually**:

### Step 1: Open Compatibility Flags Modal
- Cloudflare Dashboard → Pages → `xtechs-website` → Settings
- Find **"Runtime"** section → **"Compatibility flags"**
- Click to open the modal

### Step 2: Type the Flag Manually
1. Look for a text input field or search box in the modal
2. **Type exactly**: `nodejs_compat` (no spaces, all lowercase)
3. If there's a search/type field, start typing "nodejs" and it might appear
4. If you see an "Add flag" button or "+" button, click it and type the flag name

### Alternative: Check if Flag Needs to be Entered as Custom Flag
- Some Cloudflare dashboards allow you to add flags by typing them directly
- Look for an input field labeled "Add compatibility flag" or similar
- Type: `nodejs_compat`

### Step 3: Save for Both Environments
- Make sure to add it to **Production** compatibility flags
- Make sure to add it to **Preview** compatibility flags (if available in separate section)

### Step 4: Save and Redeploy
- Click **"Save"** button in the modal
- The modal will say "This change will take effect on the next deployment"
- Go to **Deployments** tab and click **"Retry deployment"** on the latest deployment

---

## 🎯 What to Look For:
- A text input field where you can type flag names
- A search/filter box in the flags list
- An "Add custom flag" or "Enter flag name" option
- A "+" or "Add" button that opens a text input

---

## 📝 Note:
If `nodejs_compat` still doesn't work:
1. Try: `nodejs_compat_populate_process_env` (this is what you see in the list)
2. Or contact Cloudflare support to enable the flag for your account
3. The flag might need to be enabled at the account level first

