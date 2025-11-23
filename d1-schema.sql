-- Cloudflare D1 Database Schema for xTechs Website
-- Run this SQL in your D1 database to create the required tables

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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

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

-- Create index on date for faster booking queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(selected_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image TEXT,
  overlay_image TEXT,
  href TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Insert default services
INSERT OR IGNORE INTO services (title, href, display_order) VALUES
  ('Residential Solar', '/solar/residential', 1),
  ('Commercial Solar', '/solar/business', 2),
  ('SolarFold', '/solarfold', 3),
  ('Off-grid Systems', '/solar/off-grid', 4),
  ('Solar Batteries', '/solar/residential', 5),
  ('EV Chargers', '/solar/residential', 6);

