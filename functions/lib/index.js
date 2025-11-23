"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLead = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
admin.initializeApp();
const db = admin.firestore();
const cors = (0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://www.xtechsrenewables.com.au",
    ],
});
exports.submitLead = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
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
                    const verify = await (0, node_fetch_1.default)(`https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(captchaToken)}`, { method: "POST" });
                    const data = (await verify.json());
                    if (!data.success) {
                        res.status(400).json({ error: "Captcha failed" });
                        return;
                    }
                }
                catch {
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
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
//# sourceMappingURL=index.js.map