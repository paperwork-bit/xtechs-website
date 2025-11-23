# xTechs Website - New Features

## 🎯 Post-Calculator Journey

### Overview
Enhanced user experience after calculator results with a comprehensive lead capture and PDF generation system.

### Components

#### 1. RecapCard (`src/components/postcalc/RecapCard.tsx`)
- Displays summary of system cost, rebates, and final price
- Expandable breakdown drawer with detailed calculations
- Action buttons for booking consultation and downloading PDF

#### 2. BreakdownDrawer (`src/components/postcalc/BreakdownDrawer.tsx`)
- Detailed breakdown of STC calculations
- System configuration details
- Assumptions and important notes
- Solar Victoria rebate information

#### 3. LeadCapture (`src/components/postcalc/LeadCapture.tsx`)
- Minimal form with name, email, phone, suburb, postcode
- Granular consent checkboxes for marketing and analytics
- UTM parameter capture
- Integration with calculator results

#### 4. PostCalcFlow (`src/components/postcalc/PostCalcFlow.tsx`)
- Orchestrates the entire post-calculator journey
- Progress indicator
- Lazy-loaded components for performance
- Handles PDF generation and email sending

### API Endpoints

#### `/api/leads/subscribe`
- Captures lead data with UTM parameters
- Sends email via configured endpoint
- Generates PDF if calculator results present
- Rate limiting and validation

#### `/api/pdf/generate-savings-report`
- Generates branded PDF with calculator results
- Includes assumptions and breakdown
- Placeholder implementation (ready for proper PDF library)

## 🔒 Privacy-First Email Capture

### Components

#### 1. CookieBanner (`src/components/consent/CookieBanner.tsx`)
- Granular consent controls (analytics, marketing)
- Privacy-focused design
- Persistent consent storage
- Links to privacy policy

#### 2. EmailCapture (`src/components/lead/EmailCapture.tsx`)
- Multiple variants: inline, sticky, slide-in
- Non-intrusive design
- UTM parameter capture
- Consent-aware tracking

### Utilities

#### ConsentManager (`src/lib/consent.ts`)
- Singleton consent management
- Event queuing before consent
- Analytics integration
- LocalStorage persistence

#### UTM Capture (`src/lib/utm.ts`)
- Captures UTM parameters and referrer
- Session storage for persistence
- Integration with lead capture

## ⚡ Performance Optimizations

### Code Splitting
- Post-calculator components are lazy-loaded
- Aliases ensure proper code splitting boundaries
- No blocking imports in hero path

### Bundle Analysis
- `scripts/find-dead-exports.ts` - Identifies unused exports
- `scripts/report-bundle.ts` - Generates bundle analysis
- Webpack bundle analyzer integration

### Configuration
- Next.js optimizations for CSS and package imports
- Image optimization with WebP/AVIF
- Compression enabled

## 🛠️ Development Scripts

```bash
# Find unused exports
npm run find-dead-exports

# Generate bundle analysis
npm run analyze

# Build with analyzer
npm run build:analyze
```

## 📁 File Structure

```
src/
├── components/
│   ├── postcalc/          # Post-calculator journey
│   ├── consent/           # Privacy components
│   └── lead/              # Email capture
├── lib/
│   ├── consent.ts         # Consent management
│   ├── utm.ts            # UTM parameter handling
│   └── rebates.ts        # Solar calculation utilities
├── config/
│   └── assumptions.ts    # Central constants
└── app/api/
    ├── leads/            # Lead capture endpoints
    └── pdf/              # PDF generation
```

## 🎨 Design Principles

### Privacy-First
- No non-essential cookies by default
- Granular consent controls
- Clear privacy messaging

### Performance-Focused
- Lazy loading for non-critical features
- Code splitting boundaries
- Bundle size optimization

### User Experience
- Non-intrusive email capture
- Progressive disclosure
- Clear value proposition

## 🔧 Environment Variables

```env
VITE_EMAIL_ENDPOINT=          # Email service endpoint
VITE_RECAPTCHA_SITE_KEY=      # reCAPTCHA site key (optional)
VITE_RECAPTCHA_SECRET=        # reCAPTCHA secret (server)
EMAIL_API_KEY=                # Email service API key
```

## 📊 Analytics Integration

- Consent-aware Google Analytics
- Event queuing before consent granted
- UTM parameter tracking
- Conversion tracking for email captures

## 🚀 Deployment Notes

1. Ensure all environment variables are set
2. Configure email service endpoint
3. Set up PDF generation service
4. Configure analytics tracking
5. Test consent flow and email capture

## 🧪 Testing Checklist

- [ ] Hero animations unchanged
- [ ] Calculator integration works
- [ ] Email capture submits successfully
- [ ] Consent banner functions properly
- [ ] PDF generation works
- [ ] UTM parameters captured
- [ ] Performance metrics meet targets
- [ ] Accessibility standards met
