import type { Metadata } from "next";
import { LocalBusinessPartnerLanding } from "@/components/partners/LocalBusinessPartnerLanding";
import { defaultPartnerSlug, partnersBySlug } from "@/lib/partners/localBusinessPartners";

const partner = partnersBySlug[defaultPartnerSlug];

export const metadata: Metadata = {
  title: partner?.seo?.title ?? "xTechs Local Business Partners",
  description:
    partner?.seo?.description ??
    "A local partnership built on trust — local customers can be rewarded for going solar with xTechs Renewables.",
};

export default function LocalBusinessPartnersPage() {
  return <LocalBusinessPartnerLanding partner={partner} />;
}

