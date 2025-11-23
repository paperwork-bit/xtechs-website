import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const captchaToken = formData.get("captchaToken") as string;
    const fileCount = parseInt((formData.get("fileCount") as string) || "0") || 0;
    
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ 
        ok: false, 
        error: "Missing required fields" 
      }, { status: 400 });
    }
    
    // Forward to Cloud Function if available, otherwise return error
    const cloudFunctionUrl = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;
    if (cloudFunctionUrl) {
      // Send JSON body to Cloud Function (matches function's req.body parsing)
      const jsonBody = {
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: null,
        subject,
        message,
        source: "contact-form",
        tenantId: process.env.DEFAULT_TENANT_ID || "Sales",
        captchaToken: captchaToken || "",
        fileCount,
      };

      const response = await fetch(cloudFunctionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Cloud Function error" }));
        return NextResponse.json({ ok: false, error: error.error || "Failed to submit" }, { status: response.status });
      }
      
      return NextResponse.json({ ok: true });
    }
    
    // Fallback: Cloud Function not configured
    return NextResponse.json({ 
      ok: false, 
      error: "Submission endpoint not configured. Please set NEXT_PUBLIC_LEADS_ENDPOINT." 
    }, { status: 500 });
    
  } catch (e: any) {
    console.error("Contact form error:", e);
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || "Unknown error" 
    }, { status: 500 });
  }
}
