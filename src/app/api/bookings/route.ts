import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Pages requires Edge runtime - googleAppsScript not available
// TODO: Refactor to use Edge-compatible API or Cloudflare Workers
export const runtime = 'edge';

function timeToMinutes(t: string): number {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + mm;
}
function minutesToTime(m: number): string {
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

// Return booked slots for a date
export async function GET(request: NextRequest) {
  // Stub implementation for Cloudflare Pages
  // TODO: Refactor to use Edge-compatible storage (Cloudflare D1/KV)
  return NextResponse.json({ 
    error: "This endpoint requires Node.js runtime. Please refactor to use Cloudflare D1 or KV." 
  }, { status: 501 });
}

export async function POST(request: NextRequest) {
  // Stub implementation for Cloudflare Pages
  // TODO: Refactor to use Edge-compatible storage (Cloudflare D1/KV)
  return NextResponse.json({ 
    error: "This endpoint requires Node.js runtime. Please refactor to use Cloudflare D1 or KV." 
  }, { status: 501 });
}
