import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocalBusinessPartnerLanding } from "@/components/partners/LocalBusinessPartnerLanding";
import { getLocalBusinessPartner } from "@/lib/partners/localBusinessPartners";

export const runtime = "edge";

export function generateMetadata({ params }: { params: { partner: string } }): Metadata {
  const partner = getLocalBusinessPartner(params.partner);
  if (!partner) return { title: "Local Business Partners | xTechs Renewables" };

  return {
    title: partner.seo.title,
    description: partner.seo.description,
  };
}

export default function LocalBusinessPartnersPartnerPage({ params }: { params: { partner: string } }) {
  const partner = getLocalBusinessPartner(params.partner);
  if (!partner) notFound();

  return <LocalBusinessPartnerLanding partner={partner} />;
}

