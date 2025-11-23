import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Pages requires Edge runtime - googleAppsScript not available
// TODO: Refactor to use Edge-compatible API or Cloudflare Workers
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // Stub implementation for Cloudflare Pages
  // TODO: Refactor to use Edge-compatible storage (Cloudflare D1/KV)
  return NextResponse.json({ 
    error: "This endpoint requires Node.js runtime. Please refactor to use Cloudflare D1 or KV." 
  }, { status: 501 });
}
