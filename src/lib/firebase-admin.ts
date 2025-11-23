import admin from "firebase-admin";

// Initialize Firebase Admin SDK once per server instance
if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      // Prefer application default credentials if service account not provided
      admin.initializeApp();
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }
  } catch (err) {
    // Final fallback to default credentials
    if (!admin.apps.length) {
      admin.initializeApp();
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();


