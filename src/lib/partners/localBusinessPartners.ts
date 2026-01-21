export type PartnerBadge =
  | { variant: "secondary"; label: string }
  | { variant: "outline"; label: string };

export interface PartnerLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PartnerTestimonial {
  quote: string;
  byline: string;
}

export interface PartnerFAQItem {
  question: string;
  answer: string;
}

export interface LocalBusinessPartner {
  slug: string;
  partnerName: string;
  partnerPageLabel: string;

  badges: PartnerBadge[];
  logos: {
    partner: PartnerLogo;
    xtechs: PartnerLogo;
  };

  hero: {
    headline: string;
    subheadline: string;
    intro: string;
  };

  attribution: {
    utm_source: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    leadSource: string;
  };

  giftCard: {
    brandName: string;
    solarBatteryAmount: number;
    solarOnlyOrBatteryOnlyAmount: number;
    validityMonths: number;
    issuedAfterInstall: true;
    issuedWithinDays: number;
  };

  offerTerms: string[];

  testimonial?: PartnerTestimonial;
  trustBullets?: { title: string; description: string }[];
  faq?: PartnerFAQItem[];

  seo: {
    title: string;
    description: string;
  };
}

export const defaultPartnerSlug = "grounded-grocer";

export const partnersBySlug: Record<string, LocalBusinessPartner> = {
  "grounded-grocer": {
    slug: "grounded-grocer",
    partnerName: "Grounded Grocer",
    partnerPageLabel: "Grounded Grocer Partner Page",

    badges: [
      { variant: "secondary", label: "xTechs Local Business Partners" },
      { variant: "outline", label: "Grounded Grocer Partner Page" },
    ],
    logos: {
      partner: {
        src: "/partners/grounded-cafe.png",
        alt: "Grounded Grocer logo",
        width: 240,
        height: 72,
      },
      xtechs: {
        src: "/xlogo.png",
        alt: "xTechs Renewables logo",
        width: 180,
        height: 64,
      },
    },

    hero: {
      headline: "Grounded Grocer Customers Get Rewarded for Going Solar",
      subheadline: "A local partnership built on trust — not advertising.",
      intro:
        "You’re here because Grounded Grocer has partnered with xTechs Renewables. That means they trust us enough to recommend us to their customers.",
    },

    attribution: {
      utm_source: "grounded_grocer",
      utm_medium: "referral",
      utm_campaign: "local_business_partners",
      utm_content: "grounded_grocer_landing",
      leadSource: "partner_grounded_grocer",
    },

    giftCard: {
      brandName: "Grounded Grocer",
      solarBatteryAmount: 500,
      solarOnlyOrBatteryOnlyAmount: 250,
      validityMonths: 24,
      issuedAfterInstall: true,
      issuedWithinDays: 7,
    },

    offerTerms: [
      "Offer applies to new solar and/or battery installs with xTechs Renewables initiated via this partner page.",
      "One gift card per household/address.",
      "Offer cannot be combined with other promotions unless explicitly stated.",
      "Gift card is issued within 7 days of installation completion.",
    ],

    testimonial: {
      quote:
        "We partnered with xTechs Renewables because they’re professional, transparent, and they look after people properly.",
      byline: "Grounded Grocer",
    },

    trustBullets: [
      {
        title: "Professionalism",
        description: "Clear communication, clean process, and reliable scheduling.",
      },
      {
        title: "Transparent pricing",
        description: "No confusion, no hidden surprises.",
      },
      {
        title: "Quality installations",
        description: "Clean, compliant work designed for long-term performance.",
      },
      {
        title: "Long-term accountability",
        description: "We stand behind the job — before and after install.",
      },
    ],

    faq: [
      {
        question: "Do I have to be a Grounded Grocer customer to qualify?",
        answer:
          "No — anyone who submits an enquiry through this page and proceeds with an eligible install can qualify for the gift card, subject to the offer terms.",
      },
      {
        question: "When do I receive the gift card?",
        answer:
          "Gift cards are issued within 7 days after installation completion (subject to the offer terms).",
      },
      {
        question: "Can I combine this with other xTechs promotions?",
        answer:
          "No — this offer cannot be combined with other promotions unless explicitly stated.",
      },
    ],

    seo: {
      title: "Grounded Grocer Solar & Battery Offer (Gift Card) | xTechs Renewables",
      description:
        "Grounded Grocer customers and community can be rewarded for going solar with xTechs Renewables. Check eligibility and see gift card rewards for solar and/or battery installs.",
    },
  },
};

export function getLocalBusinessPartner(slug: string): LocalBusinessPartner | null {
  return partnersBySlug[slug] ?? null;
}

