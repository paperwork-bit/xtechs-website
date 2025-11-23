import { NextRequest, NextResponse } from "next/server";

// Cloudflare Pages requires Edge runtime - fs not available
// TODO: Refactor to use Cloudflare KV or D1 for storage
export const runtime = "edge";

// Default services data (static for now)
const DEFAULT_SERVICES = {
  services: [
    { title: "Residential Solar", image: "", overlayImage: "", href: "/solar/residential" },
    { title: "Commercial Solar", image: "", overlayImage: "", href: "/solar/business" },
    { title: "SolarFold", image: "", overlayImage: "", href: "/solarfold" },
    { title: "Off-grid Systems", image: "", overlayImage: "", href: "/solar/off-grid" },
    { title: "Solar Batteries", image: "", overlayImage: "", href: "/solar/residential" },
    { title: "EV Chargers", image: "", overlayImage: "", href: "/solar/residential" },
  ],
};

export async function GET() {
  // Return static data for now
  // TODO: Use Cloudflare KV or D1 for dynamic storage
  return NextResponse.json(DEFAULT_SERVICES);
}

export async function POST(request: NextRequest) {
  // Stub implementation for Cloudflare Pages
  // TODO: Refactor to use Cloudflare KV or D1 for storage
  return NextResponse.json({ 
    error: "This endpoint requires Node.js runtime. Please refactor to use Cloudflare KV or D1." 
  }, { status: 501 });
}



