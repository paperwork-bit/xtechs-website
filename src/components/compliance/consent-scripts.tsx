"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_COOKIE = "xtechs_consent_v1";

function getConsent() {
  if (typeof document === "undefined") return null;
  const raw = decodeURIComponent(document.cookie.split("; ").find(c => c.startsWith(CONSENT_COOKIE + "="))?.split("=")[1] || "");
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export default function ConsentScripts() {
  const [consent, setConsent] = useState<{ analytics: boolean; marketing: boolean } | null>(null);

  useEffect(() => {
    setConsent(getConsent());
    const onUpdate = () => {
      const newConsent = getConsent();
      setConsent(newConsent);
    };
    
    window.addEventListener("xtechs:consent-updated", onUpdate);
    return () => window.removeEventListener("xtechs:consent-updated", onUpdate);
  }, []);

  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
  const CF_WEB_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  return (
    <>
      {/* Analytics (Google Analytics 4) */}
      {GA_ID && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { 
                anonymize_ip: true,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {/* Analytics (Cloudflare Web Analytics - cookieless) */}
      {CF_WEB_ANALYTICS_TOKEN && consent?.analytics && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: CF_WEB_ANALYTICS_TOKEN })}
        />
      )}

      {/* Marketing (Google Ads) */}
      {ADS_ID && consent?.marketing && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
          <Script id="ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ADS_ID}');
            `}
          </Script>
        </>
      )}
      
      {/* Facebook Pixel */}
      {FACEBOOK_PIXEL_ID && consent?.marketing && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
      
      {/* Hotjar */}
      {HOTJAR_ID && consent?.analytics && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}
    </>
  );
}
