import { NextResponse } from "next/server";

// Cloudflare Pages requires Edge runtime - firebase-admin not available
// TODO: Refactor to use Firebase client SDK or Cloudflare Workers
export const runtime = 'edge';

export async function POST(req: Request) {
  // Stub implementation for Cloudflare Pages
  // This route needs refactoring to work on Edge runtime
  return NextResponse.json({ 
    ok: false, 
    error: "This endpoint requires Node.js runtime. Please use Firebase client SDK or refactor for Edge runtime." 
  }, { status: 501 });
}


