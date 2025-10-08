// Analytics configuration for xTechs Renewables website
// Includes Google Analytics 4, Google Ads, Facebook Pixel, and more

// Environment variables needed:
// NEXT_PUBLIC_GA_MEASUREMENT_ID - Google Analytics 4 ID (G-XXXXXXXXX)
// NEXT_PUBLIC_GOOGLE_ADS_ID - Google Ads Conversion ID (AW-XXXXXXXXX)
// NEXT_PUBLIC_FACEBOOK_PIXEL_ID - Facebook Pixel ID
// NEXT_PUBLIC_HOTJAR_ID - Hotjar tracking ID (optional)
// NEXT_PUBLIC_MIXPANEL_TOKEN - Mixpanel token (optional)

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Custom events for tracking user interactions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formType: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_type: formType,
  });
};

// Track quote requests
export const trackQuoteRequest = (source: string, service: string) => {
  trackEvent('quote_request', {
    source: source,
    service: service,
  });
};

// Track Calendly booking clicks
export const trackCalendlyBooking = (source: string, service: string) => {
  trackEvent('calendly_booking_click', {
    source: source,
    service: service,
    booking_url: 'https://calendly.com/inquiries-xtechsrenewables/30min',
  });
};

// Track phone calls
export const trackPhoneCall = (phoneNumber: string, source: string) => {
  trackEvent('phone_call', {
    phone_number: phoneNumber,
    source: source,
  });
};

// Track email clicks
export const trackEmailClick = (email: string, source: string) => {
  trackEvent('email_click', {
    email: email,
    source: source,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string, source: string) => {
  trackEvent('social_click', {
    platform: platform,
    source: source,
  });
};

// Track calculator usage
export const trackCalculatorUsage = (calculatorType: string, result?: any) => {
  trackEvent('calculator_used', {
    calculator_type: calculatorType,
    result: result,
  });
};

// Track review interactions
export const trackReviewInteraction = (action: string, reviewId: string) => {
  trackEvent('review_interaction', {
    action: action,
    review_id: reviewId,
  });
};

// Enhanced ecommerce tracking for services
export const trackServiceInterest = (service: string, value?: number) => {
  trackEvent('service_interest', {
    service: service,
    value: value,
    currency: 'AUD',
  });
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: 'AUD',
  });
};

// Facebook Pixel tracking
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Hotjar tracking
export const trackHotjarEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.hj) {
    window.hj('event', eventName, properties);
  }
};

// Mixpanel tracking
export const trackMixpanelEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }
};

// Initialize all analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false, // We'll send page views manually
    });
  }

  // Facebook Pixel
  if (FACEBOOK_PIXEL_ID) {
    !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', FACEBOOK_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // Hotjar
  if (HOTJAR_ID) {
    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
      h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }

  // Mixpanel
  if (MIXPANEL_TOKEN) {
    (function(c: any, a: any) {
      if (!a.__SV) {
        var b = window;
        try {
          var d: any, g: any, j: any, k: any, e: any, l: any, h: any;
          c._i || [];
          c.init = function(a: any, d: any, f: any) {
            function g(b: any, a: any) {
              var c = a.split('.');
              2 == c.length && (b = b[c[0]], a = c[1]);
              b[a] = function() {
                b.push([a].concat(Array.prototype.slice.call(arguments, 0)));
              };
            }
            var h = c;
            'undefined' !== typeof f ? h = c[f] = [] : f = 'mixpanel';
            h.people = h.people || [];
            h.toString = function(b: any) {
              var a = 'mixpanel';
              'mixpanel' !== f && (a += '.' + f);
              b || (a += ' (stub)');
              return a;
            };
            h.people.toString = function() {
              return h.toString(1) + '.people (stub)';
            };
            j = 'init time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user'.split(' ');
            for (k = 0; k < j.length; k++) {
              g(h, j[k]);
            }
            var l = c._i[a];
            if (l) {
              l[0].unshift(i);
              l[1].unshift(j);
              l[2].unshift(k);
            } else {
              l = c._i[a] = [[i, j, k]];
            }
          };
          c._i.push([a, d, f]);
          var m = c._i.length - 1;
          c._i[m][1] = d;
          f = c._i[m][2];
          a = 0;
          for (d = c._i[m].length; a < d; a++) {
            e = c._i[m][0][a];
            g(c, e);
          }
          a = 'mixpanel';
          c.toString = function(b: any) {
            b || (a += ' (stub)');
            return a;
          };
          c.people.toString = function() {
            return a + '.people (stub)';
          };
          j = 'identify alias name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user'.split(' ');
          for (k = 0; k < j.length; k++) {
            g(c.people, j[k]);
          }
          c._i = [];
          c.toString = function(b: any) {
            b || (a += ' (stub)');
            return a;
          };
          c.people.toString = function() {
            return a + '.people (stub)';
          };
        } catch (b) {}
      }
    })(window.mixpanel || [], MIXPANEL_TOKEN);
  }
};

// Declare global types for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    hj: (...args: any[]) => void;
    mixpanel: any;
  }
}
