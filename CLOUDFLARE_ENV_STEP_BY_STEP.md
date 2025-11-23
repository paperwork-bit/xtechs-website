# Step-by-Step: Adding Environment Variables in Cloudflare Pages

## ✅ You're in the Right Place!

In the **Variables and Secrets** section on your Settings page, you'll add all your environment variables.

---

## 📝 Step-by-Step Instructions

### Step 1: Ensure Environment is Set to "Production"
- At the top of the "Variables and Secrets" section, make sure the dropdown says **"Production"**
- This ensures variables are available on your live site

### Step 2: Add Each Variable One by One

Click the **"+ Add"** button next to "Configure API tokens and other runtime variables" for each variable below.

---

## 🔑 Required Variables to Add

### 1. Firebase API Key (Client-Side)

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_API_KEY`
3. **Value:** `AIzaSyB8_BKKivdu6Vgxu1LaCb8IrBXY1HdAgOQ`
4. Select **"Text"** (not Secret) - it's a public key
5. Click **"Save"** or **"Add variable"**

### 2. Firebase Auth Domain

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. **Value:** `xtechsrenewables.firebaseapp.com`
4. Select **"Text"**
5. Click **"Save"**

### 3. Firebase Project ID (Client)

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
3. **Value:** `xtechsrenewables`
4. Select **"Text"**
5. Click **"Save"**

### 4. Firebase Storage Bucket

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
3. **Value:** `xtechsrenewables.firebasestorage.app`
4. Select **"Text"**
5. Click **"Save"**

### 5. Firebase Messaging Sender ID

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
3. **Value:** `510037402813`
4. Select **"Text"**
5. Click **"Save"**

### 6. Firebase App ID

1. Click **"+ Add"**
2. **Variable name:** `NEXT_PUBLIC_FIREBASE_APP_ID`
3. **Value:** `1:510037402813:web:a7b976c4bdf58c852d83d4`
4. Select **"Text"**
5. Click **"Save"**

### 7. Firebase Project ID (Server-Side)

1. Click **"+ Add"**
2. **Variable name:** `FIREBASE_PROJECT_ID`
3. **Value:** `xtechsrenewables`
4. Select **"Text"**
5. Click **"Save"**

### 8. Firebase Client Email (Server-Side)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **xtechsrenewables**
3. Click **⚙️ Project Settings** (gear icon)
4. Click **"Service accounts"** tab
5. Click **"Generate new private key"**
6. Download the JSON file
7. Open the JSON file and copy the `client_email` value

Then:
1. Click **"+ Add"** in Cloudflare
2. **Variable name:** `FIREBASE_CLIENT_EMAIL`
3. **Value:** Paste the `client_email` from the JSON file (e.g., `your-service@xtechsrenewables.iam.gserviceaccount.com`)
4. Select **"Secret"** (since it's sensitive)
5. Click **"Save"**

### 9. Firebase Private Key (Server-Side)

1. From the same JSON file you downloaded above, copy the `private_key` value
2. Click **"+ Add"** in Cloudflare
3. **Variable name:** `FIREBASE_PRIVATE_KEY`
4. **Value:** Paste the entire private key, including:
   - The quotes: `"`
   - The newlines: `\n`
   - Should look like: `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`
5. **⚠️ IMPORTANT:** Select **"Secret"** (since it's sensitive)
6. Click **"Save"**

---

## ✅ Quick Checklist

After adding all variables, you should see:

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `FIREBASE_PROJECT_ID`
- [ ] `FIREBASE_CLIENT_EMAIL` (marked as Secret)
- [ ] `FIREBASE_PRIVATE_KEY` (marked as Secret)

---

## 🔄 After Adding All Variables

1. **Redeploy your site:**
   - Go to the **"Deployments"** tab (at the top)
   - Find your latest deployment
   - Click the **"..."** menu → **"Retry deployment"**

   OR

   - Deploy manually:
   ```bash
   cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
   npm run deploy:cloudflare
   ```

2. **Test your site** to make sure everything works!

---

## 💡 Tips

- **Variables starting with `NEXT_PUBLIC_`** can be "Text" (they're public anyway)
- **Sensitive variables** (like `FIREBASE_PRIVATE_KEY`) should be marked as **"Secret"**
- Make sure you're adding to **"Production"** environment (check the dropdown)
- You can edit or delete variables later by clicking on them in the list

---

## 🆘 Need Help?

If you have trouble finding any values, check your local `.env.local` file or see the detailed guide in `ENV_VARIABLES_SETUP.md`.

