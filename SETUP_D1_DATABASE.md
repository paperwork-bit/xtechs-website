# Setup D1 Database for Cloudflare Pages

## Step 1: Create D1 Database in Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to **Workers & Pages** → **D1 SQL Database**
   - (Or click "D1 SQL database" in the left sidebar)

2. **Create Database**
   - Click **"Create database"** button
   - **Database name**: `xtechs-website-db`
   - **Region**: Choose closest to your users (e.g., "Australia (Sydney)")
   - Click **"Create"**

3. **Note the Database ID**
   - After creation, you'll see the database ID (looks like: `abc123def456...`)
   - **Keep this ID** - you'll need it for wrangler.toml

---

## Step 2: Add Binding to wrangler.toml

After creating the database, add this to your `wrangler.toml` file:

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "xtechs-website-db"
database_id = "YOUR_DATABASE_ID_HERE"

[[env.preview.d1_databases]]
binding = "DB"
database_name = "xtechs-website-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

Replace `YOUR_DATABASE_ID_HERE` with the actual database ID from Step 1.

---

## Step 3: Create Database Tables

After binding, you'll need to create tables. Run SQL migrations:

```sql
-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT,
  tenant_id TEXT,
  status TEXT DEFAULT 'new',
  ip TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  service_type TEXT NOT NULL,
  selected_date TEXT NOT NULL,
  selected_time TEXT NOT NULL,
  type TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new',
  created_at INTEGER DEFAULT (unixepoch())
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image TEXT,
  overlay_image TEXT,
  href TEXT NOT NULL,
  updated_at INTEGER DEFAULT (unixepoch())
);
```

---

## Next Steps

1. ✅ Create D1 database in dashboard
2. ✅ Add binding to wrangler.toml (with database ID)
3. ✅ Create tables (run SQL migrations)
4. ✅ Update API routes to use D1 instead of Firebase/Google Sheets

