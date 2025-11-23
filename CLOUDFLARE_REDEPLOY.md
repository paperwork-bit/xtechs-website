# Redeploy After Adding Environment Variables

## Why Redeploy?

Environment variables are only loaded when your site is deployed. After adding new variables, you need to redeploy so they take effect.

---

## Option 1: Redeploy via Cloudflare Dashboard (Easiest)

1. In Cloudflare Pages dashboard, go to the **"Deployments"** tab (at the top)
2. Find your latest deployment in the list
3. Click the **"..."** (three dots) menu on the right side of that deployment
4. Click **"Retry deployment"** or **"Redeploy"**
5. Wait for the deployment to complete (usually 1-2 minutes)

---

## Option 2: Redeploy via Command Line

1. Open your terminal
2. Navigate to your project directory:
   ```bash
   cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
   ```

3. Run the deployment command:
   ```bash
   npm run deploy:cloudflare
   ```

4. Wait for the build and deployment to complete

---

## Option 3: Trigger New Deployment via Git

If you have Git connected:

1. Make a small change to your code (or just a comment)
2. Commit and push to your production branch:
   ```bash
   git add .
   git commit -m "Trigger redeploy for environment variables"
   git push origin main  # or master
   ```

3. Cloudflare will automatically detect the push and deploy

---

## ✅ Verify It Worked

After redeploying:

1. **Check deployment status:**
   - Go to **"Deployments"** tab
   - Your new deployment should show as "Success" ✓

2. **Visit your site:**
   - Go to your Cloudflare Pages URL (e.g., `https://xtechs-website.pages.dev`)
   - Or your custom domain once it's set up

3. **Test features that use environment variables:**
   - Contact form submissions
   - API routes that use Firebase
   - Any features that require Firebase authentication

---

## 🆘 Troubleshooting

### Variables still not working?

1. **Double-check variable names:**
   - Make sure they're spelled exactly as shown (case-sensitive)
   - Check for typos or extra spaces

2. **Verify environment:**
   - Make sure variables were added to **"Production"** environment
   - Check the dropdown at the top of Variables section

3. **Redeploy again:**
   - Sometimes it takes a fresh deployment
   - Try redeploying one more time

4. **Check deployment logs:**
   - Go to **"Deployments"** tab
   - Click on your deployment
   - Check the build logs for any errors

---

## 🎉 You're All Set!

Once redeployed, your site should now have access to all the environment variables you added!

