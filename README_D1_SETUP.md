# How to Create D1 Database Tables

You have **2 options** to create the database tables:

## Option 1: Using Cloudflare Dashboard (Easier) ✅

1. **Go to Cloudflare Dashboard**
   - Navigate to **Workers & Pages** → **D1 SQL Database**
   - Click on your database: **xtechs-website-db**

2. **Open the Console/Query Tab**
   - Click on the **"Console"** or **"Query"** tab in your database

3. **Copy and Paste SQL**
   - Open the file `d1-schema.sql` from this project
   - Copy **all the SQL** from that file
   - Paste it into the Console/Query box
   - Click **"Run"** or **"Execute"**

4. **Verify Tables Created**
   - Check the **"Tables"** tab to see: `leads`, `bookings`, `services`

---

## Option 2: Using Wrangler CLI (Command Line)

### Prerequisites:
- Make sure you're authenticated: `npx wrangler login`
- Navigate to project directory: `cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"`

### Run the command:

```bash
npx wrangler d1 execute xtechs-website-db --file=./d1-schema.sql --remote
```

**Note:** The `--remote` flag applies changes to the production database.

---

## After Creating Tables:

1. ✅ Tables created: `leads`, `bookings`, `services`
2. ⏳ Next: Update API routes to use D1 instead of Firebase/Google Sheets

---

## Troubleshooting:

- **If wrangler says "Couldn't find DB"**: Make sure you've added the database config to `wrangler.toml` (already done)
- **If authentication fails**: Run `npx wrangler login` first
- **Easier option**: Use the Cloudflare Dashboard (Option 1) - no CLI needed!

