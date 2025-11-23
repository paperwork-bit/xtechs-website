import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      // Fallback to default services if DB not available
      return NextResponse.json({
        services: [
          { title: "Residential Solar", image: "", overlayImage: "", href: "/solar/residential" },
          { title: "Commercial Solar", image: "", overlayImage: "", href: "/solar/business" },
          { title: "SolarFold", image: "", overlayImage: "", href: "/solarfold" },
          { title: "Off-grid Systems", image: "", overlayImage: "", href: "/solar/off-grid" },
          { title: "Solar Batteries", image: "", overlayImage: "", href: "/solar/residential" },
          { title: "EV Chargers", image: "", overlayImage: "", href: "/solar/residential" },
        ]
      });
    }

    // Fetch services from D1 database
    const result = await db.prepare(
      'SELECT id, title, image, overlay_image as overlayImage, href, display_order as displayOrder FROM services ORDER BY display_order ASC'
    ).all();

    const services = (result.results || []).map((service: any) => ({
      id: service.id,
      title: service.title,
      image: service.image || "",
      overlayImage: service.overlay_image || service.overlayImage || "",
      href: service.href,
      displayOrder: service.display_order || service.displayOrder || 0
    }));

    return NextResponse.json({ services });
  } catch (error: any) {
    console.error('Get services error:', error);
    // Fallback to default services on error
    return NextResponse.json({
      services: [
        { title: "Residential Solar", image: "", overlayImage: "", href: "/solar/residential" },
        { title: "Commercial Solar", image: "", overlayImage: "", href: "/solar/business" },
        { title: "SolarFold", image: "", overlayImage: "", href: "/solarfold" },
        { title: "Off-grid Systems", image: "", overlayImage: "", href: "/solar/off-grid" },
        { title: "Solar Batteries", image: "", overlayImage: "", href: "/solar/residential" },
        { title: "EV Chargers", image: "", overlayImage: "", href: "/solar/residential" },
      ]
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    // @ts-ignore - DB binding is injected by Cloudflare Pages runtime
    const db = (process.env.DB as any) || (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    if (contentType.includes("application/json")) {
      // JSON update for service
      const body = await request.json();
      const { index, image, overlayImage } = body;
      
      if (typeof index !== "number" || index < 0) {
        return NextResponse.json({ error: "Invalid index" }, { status: 400 });
      }

      // Update service by display_order (index + 1)
      const displayOrder = index + 1;
      
      const updates: string[] = [];
      const values: any[] = [];
      
      if (image !== undefined) {
        updates.push('image = ?');
        values.push(image);
      }
      if (overlayImage !== undefined) {
        updates.push('overlay_image = ?');
        values.push(overlayImage);
      }

      if (updates.length === 0) {
        return NextResponse.json({ error: "No fields to update" }, { status: 400 });
      }

      values.push(displayOrder);

      const result = await db.prepare(
        `UPDATE services SET ${updates.join(', ')}, updated_at = ? WHERE display_order = ?`
      ).bind(...values, Math.floor(Date.now() / 1000), displayOrder).run();

      if (!result.success) {
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
      }

      // Fetch updated service
      const updatedService = await db.prepare(
        'SELECT * FROM services WHERE display_order = ?'
      ).bind(displayOrder).first();

      return NextResponse.json({ ok: true, service: updatedService });
    }

    // Multipart form-data for file uploads (not fully supported in Edge runtime)
    // This would need to be handled differently - files should be uploaded to R2
    return NextResponse.json({ 
      error: "File uploads require R2 storage. JSON updates are supported." 
    }, { status: 501 });

  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



