import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const captchaToken = formData.get("captchaToken") as string
    const fileCount = parseInt(formData.get("fileCount") as string) || 0
    
    // Verify CAPTCHA token
    if (!captchaToken) {
      return NextResponse.json({ 
        ok: false, 
        error: "CAPTCHA verification required" 
      }, { status: 400 })
    }
    
    // Verify CAPTCHA with Google (optional - for enhanced security)
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY
      if (secretKey) {
        const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${secretKey}&response=${captchaToken}`
        })
        const captchaResult = await captchaResponse.json()
        if (!captchaResult.success) {
          return NextResponse.json({ 
            ok: false, 
            error: "CAPTCHA verification failed" 
          }, { status: 400 })
        }
      }
    } catch (captchaError) {
      console.warn('CAPTCHA verification error:', captchaError)
      // Continue without server-side verification if it fails
    }
    
    // Extract uploaded files
    const files: File[] = []
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File
      if (file) {
        files.push(file)
      }
    }
    
    // Log the contact submission (you can replace this with your preferred storage method)
    const submission = {
      firstName, lastName, email, subject, message,
      fileCount: files.length,
      files: files.map(f => ({ name: f.name, type: f.type, size: f.size })),
      createdAt: new Date().toISOString(),
      status: 'new'
    }
    
    console.log('Contact form submission:', submission)
    
    // TODO: Implement your preferred storage method (Google Sheets, database, email, etc.)
    
    return NextResponse.json({ ok: true, submissionId: `sub_${Date.now()}` })
  } catch (e: any) {
    console.error('Contact form error:', e)
    return NextResponse.json({ 
      ok: false, 
      error: e?.message || "Unknown error" 
    }, { status: 500 })
  }
}
