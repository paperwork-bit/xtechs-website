# CAPTCHA Setup Instructions

## Google reCAPTCHA Configuration

To enable CAPTCHA protection on your forms, you need to:

### 1. Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click "Create" to add a new site
3. Choose **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
4. Add your domains:
   - `localhost` (for development)
   - `yourdomain.com` (for production)
5. Copy the **Site Key** and **Secret Key**

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
# Google reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3. Test Keys (Development Only)
For development, you can use these test keys:
- Site Key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Secret Key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

**Note:** Test keys will always pass validation but should only be used for development.

### 4. Server-Side Verification (Optional)
For enhanced security, you can verify the CAPTCHA token on the server side using the Secret Key.

## Forms Protected
The following forms now have CAPTCHA protection:
- Contact form (`/contact`)
- Booking calendar (`/contact`)
- Any other forms with the Captcha component

## Usage
The CAPTCHA component is automatically integrated into all forms and will appear before the submit button.

