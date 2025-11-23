// D1 Database helper for Cloudflare Pages
// The DB binding is automatically available in the Edge runtime

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<D1ExecResult>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

export interface D1Result<T = unknown> {
  success: boolean;
  error?: string;
  meta: {
    duration: number;
    rows_read: number;
    rows_written: number;
    last_row_id: number;
    changed_db: boolean;
    changes: number;
    size_after: number;
  };
  results?: T[];
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

// Get D1 database from environment
// In Cloudflare Pages, the DB binding is available via process.env.DB
export function getDB(): D1Database {
  // @ts-ignore - DB is injected by Cloudflare Pages runtime
  const db = process.env.DB as D1Database;
  if (!db) {
    throw new Error('D1 database binding not found. Make sure DB is configured in wrangler.toml');
  }
  return db;
}

