# Firebase Setup Guide for xTechs Website

## ✅ Completed Steps

1. ✅ Updated `.firebaserc` to use project `xtechsrenewables`
2. ✅ Installed Firebase client SDK
3. ✅ Created Firebase client configuration file (`src/lib/firebase.ts`)

## 📋 Next Steps

### Step 1: Register Web App in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **xTechs Website** (xtechsrenewables)
3. Click on the **⚙️ Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Click **Add app** → Select **Web** (</> icon)
6. Register your app:
   - **App nickname**: `xTechs Website`
   - **Firebase Hosting**: Check if you plan to use hosting
   - Click **Register app**
7. Copy the Firebase configuration object that appears

### Step 2: Get Firebase Configuration

You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "xtechsrenewables.firebaseapp.com",
  projectId: "xtechsrenewables",
  storageBucket: "xtechsrenewables.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX" // Optional, for Analytics
};
```

### Step 3: Create Environment Variables File

Create a `.env.local` file in the root of `xtechs-website` directory with your Firebase config:

```bash
# Firebase Web SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xtechsrenewables.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xtechsrenewables
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xtechsrenewables.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK (for server-side operations)
FIREBASE_PROJECT_ID=xtechsrenewables
FIREBASE_CLIENT_EMAIL=your-service-account@xtechsrenewables.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

### Step 4: Set Up Firebase Admin SDK (Optional - for server-side operations)

If you need server-side Firebase operations (Firestore, Auth, etc.):

1. Go to **Firebase Console** → **Project Settings** → **Service Accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Extract from the JSON:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` characters)

### Step 5: Enable Firebase Services

In Firebase Console, enable the services you need:

1. **Firestore Database**:
   - Go to **Firestore Database** → **Create database**
   - Choose **Start in test mode** (or production mode with security rules)
   - Select a location

2. **Authentication**:
   - Go to **Authentication** → **Get started**
   - Enable sign-in methods you need (Email/Password, Google, etc.)

3. **Storage** (if needed):
   - Go to **Storage** → **Get started**
   - Start in test mode or set up security rules

4. **Analytics** (optional):
   - Already enabled if you added `measurementId`
   - Go to **Analytics** → **Get started** to set up

### Step 6: Verify Connection

After setting up `.env.local`, restart your dev server:

```bash
npm run dev
```

The Firebase client will automatically initialize when you use it in your components.

## 📝 Usage Example

```typescript
import { auth, db, storage } from '@/lib/firebase';

// Use Firebase services in your components
// Example: Sign in with email
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
```

## 🔒 Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your Firebase API keys secure
- Set up proper Firestore security rules for production
- Use environment variables for all sensitive data

## 🚀 Next Steps

- Set up Firestore security rules
- Configure Authentication providers
- Set up Firebase Hosting (if needed)
- Configure Cloud Functions (already set up in `functions/` directory)

