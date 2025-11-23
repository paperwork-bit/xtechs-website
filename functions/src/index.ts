import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import corsLib from "cors";
import fetch from "node-fetch";

admin.initializeApp();
const db = admin.firestore();

const cors = corsLib({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://www.xtechsrenewables.com.au",
  ],
});

// Deploy in Australia (Sydney) region for lowest latency to AU users
export const submitLead = functions.region("australia-southeast1").https.onRequest((req, res) => {
  cors(req as any, res as any, async () => {
    try {
      if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
      }
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { name, email, phone, message, source, tenantId, captchaToken } = req.body || {};
      if (!name || !email) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Verify captcha if token provided
      const secret = process.env.CAPTCHA_SECRET_KEY;
      if (secret && captchaToken) {
        try {
          const verify = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
              captchaToken
            )}`,
            { method: "POST" }
          );
          const data = (await verify.json()) as any;
          if (!data.success) {
            res.status(400).json({ error: "Captcha failed" });
            return;
          }
        } catch {
          // if verification fails, fail closed
          res.status(400).json({ error: "Captcha verification error" });
          return;
        }
      }

      await db.collection("leads").add({
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        message: message ? String(message).trim() : null,
        source: source || "contact",
        tenantId: tenantId || process.env.DEFAULT_TENANT_ID || "Sales",
        status: "new",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});


