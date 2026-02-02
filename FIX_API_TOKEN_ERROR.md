# Fix: API Token Authentication Error

## 🔍 The Problem

The error shows:
```
A request to the Cloudflare API (/memberships) failed.
Authentication error [code: 10000]
You are logged in with an User API Token. Unable to retrieve email for this user.
Are you missing the `User->User Details->Read` permission?
```

The token is valid but **missing required permissions** for Wrangler (user details + Pages deploy).

---

## ✅ Fix 1: Give the API Token the Right Permissions (if you use a custom deploy command)

If you deploy with `wrangler pages deploy` (e.g. from CI or a custom deploy command), create a **new** API token with these permissions:

1. Open **[Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)** → **Create Token**.
2. Use **“Edit Cloudflare Workers”** template, or create a **Custom token** and add:
   - **Account** → **Cloudflare Pages** → **Edit** (or **Pages Write**).
   - **User** → **User Details** → **Read** (so Wrangler can show your email).
   - **User** → **Memberships** → **Read** (required for the `/memberships` API call; without this you get error 10000).
3. Under **Account Resources**, include the account that owns the Pages project (e.g. “Paperwork@xtechsrenewables.com.au's Account”).
4. Create the token and set it as `CLOUDFLARE_API_TOKEN` where you run the deploy (env var or Cloudflare Pages build env).

Then run your deploy again. Error 10000 on `/memberships` should stop once the token has **User → User Details → Read**.

---

## ✅ Fix 2: Remove Deploy Command OR Use Empty/No-Op Command (if you use Git deploy only)

Since Cloudflare Pages with Git integration handles deployment automatically, we should **not use a custom deploy command**. However, since the field is "required", we need to work around this.

### Option 1: Try Empty/Blank Command (Try This First)

1. Go to **Settings** → **Build** section
2. Click **edit icon** next to "Build configuration"
3. In **"Deploy command"** field, try entering:
   ```
   echo "Deployment handled by Cloudflare Pages"
   ```
   (This is a no-op command that does nothing)

4. Click **"Update"**
5. Retry deployment

### Option 2: Remove the Deploy Command Completely

If the field truly must have something, try:
1. Go to **Settings** → **Build** section  
2. Click **"Disconnect"** next to Git repository
3. Click **"Connect to Git"** again and reconfigure
4. When setting up, **do NOT add a deploy command** if possible

### Option 3: Check if This is Actually a Pages Project

The issue might be that this is configured as a **Worker** instead of a **Pages** project.

1. Check the project type in Settings
2. If it's a Worker, we need to create it as a Pages project instead

---

## 🎯 Better Solution: Cloudflare Pages Should Auto-Deploy

For Cloudflare Pages with Git integration:
- ✅ Build command: `npm run build`
- ✅ Build output directory: `.next`
- ✅ Deploy command: **(SHOULD BE AUTOMATIC - NO COMMAND NEEDED)**

The fact that a deploy command is "required" suggests this might be configured incorrectly.

---

## 📋 What to Try

1. **First:** Try entering `echo "deploy"` in the deploy command field (no-op)
2. **If that fails:** Check if this is configured as a Worker vs Pages project
3. **Alternative:** Disconnect and reconnect Git, being careful not to add a deploy command

---

## 🆘 If Nothing Works

We might need to:
1. Create a NEW Pages project (not Worker)
2. Connect your Git repository to it
3. Use default settings (no custom deploy command)
4. Let Cloudflare Pages handle deployment automatically

Let me know what happens when you try the no-op command!

