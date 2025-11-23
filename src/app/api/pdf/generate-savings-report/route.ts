import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Pages requires Edge runtime - googleDrive not available
// TODO: Refactor to use Edge-compatible PDF generation or Cloudflare Workers
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // Stub implementation for Cloudflare Pages
  // TODO: Refactor to use Edge-compatible PDF generation
  return NextResponse.json({ 
    error: "This endpoint requires Node.js runtime. Please refactor to use Edge-compatible PDF generation." 
  }, { status: 501 });
}
