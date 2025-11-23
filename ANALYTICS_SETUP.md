# Analytics & Google Reviews Setup Guide

This guide will help you set up all the analytics and Google Reviews integration for the xTechs Renewables website.

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.xtechsrenewables.com.au

# Google Analytics & Ads
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Google My Business API (for real reviews)
GOOGLE_MY_BUSINESS_API_KEY=your_api_key_here
GOOGLE_MY_BUSINESS_ACCOUNT_ID=your_account_id_here
GOOGLE_MY_BUSINESS_LOCATION_ID=your_location_id_here

# Facebook Pixel
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id_here

# Hotjar (User Behavior Analytics)
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id_here

# Mixpanel (Advanced Analytics - Optional)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here
```

## 1. Google Analytics 4 Setup

### Steps:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for xTechs Renewables
3. Copy your Measurement ID (format: G-XXXXXXXXX)
4. Add it to `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`

### Enhanced Ecommerce Events:
The website automatically tracks:
- Page views
- Form submissions
- Quote requests
- Phone calls
- Email clicks
- Calculator usage
- Review interactions

## 2. Google Ads Setup

### Steps:
1. Go to [Google Ads](https://ads.google.com/)
2. Create a new conversion action
3. Copy your Conversion ID (format: AW-XXXXXXXXX)
4. Add it to `NEXT_PUBLIC_GOOGLE_ADS_ID` in `.env.local`

### Conversion Events:
- Quote requests
- Phone calls
- Contact form submissions
- Calculator completions

## 3. Google My Business API Setup

### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google My Business API
3. Create credentials (API Key)
4. Get your Account ID and Location ID from Google My Business
5. Add all three values to `.env.local`

### API Limits:
- 1000 requests per day (free tier)
- Reviews are cached for 1 hour to reduce API calls

## 4. Facebook Pixel Setup

### Steps:
1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Create a new Pixel
3. Copy your Pixel ID
4. Add it to `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` in `.env.local`

### Tracked Events:
- Page views
- Quote requests
- Contact form submissions
- Phone calls

## 5. Hotjar Setup (Optional)

### Steps:
1. Sign up at [Hotjar](https://www.hotjar.com/)
2. Create a new site
3. Copy your Site ID
4. Add it to `NEXT_PUBLIC_HOTJAR_ID` in `.env.local`

### Features:
- Heatmaps
- Session recordings
- User feedback
- Conversion funnels

## 6. Mixpanel Setup (Optional)

### Steps:
1. Sign up at [Mixpanel](https://mixpanel.com/)
2. Create a new project
3. Copy your Project Token
4. Add it to `NEXT_PUBLIC_MIXPANEL_TOKEN` in `.env.local`

### Features:
- Advanced event tracking
- User journey analysis
- Cohort analysis
- Custom dashboards

## Testing Your Setup

### 1. Test Google Analytics:
- Open browser dev tools
- Go to Network tab
- Visit your website
- Look for requests to `google-analytics.com`

### 2. Test Google Ads:
- Check Network tab for `googleads.com` requests
- Verify conversion tracking in Google Ads dashboard

### 3. Test Facebook Pixel:
- Install Facebook Pixel Helper browser extension
- Visit your website and check for pixel fires

### 4. Test Google Reviews:
- Check browser console for API errors
- Verify reviews are loading (may take a few seconds)

## Privacy & Compliance

### Cookie Consent:
The website includes a cookie consent banner that:
- Only loads analytics after user consent
- Allows users to choose between analytics and marketing cookies
- Complies with GDPR and Australian Privacy Act

### Data Privacy:
- IP addresses are anonymized
- No personal data is stored without consent
- Users can opt-out at any time

## Troubleshooting

### Common Issues:

1. **Reviews not loading:**
   - Check Google My Business API credentials
   - Verify business is verified on Google My Business
   - Check API quotas in Google Cloud Console

2. **Analytics not tracking:**
   - Verify environment variables are correct
   - Check browser console for errors
   - Ensure cookies are accepted

3. **Facebook Pixel not firing:**
   - Check Pixel ID is correct
   - Verify Facebook Pixel Helper
   - Check for ad blockers

### Support:
- Check browser console for errors
- Verify all environment variables are set
- Test with different browsers/devices

## Performance Impact

All analytics scripts are:
- Loaded asynchronously
- Only loaded after user consent
- Optimized for performance
- Cached when possible

The Google Reviews API calls are cached for 1 hour to minimize performance impact.
