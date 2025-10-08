"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Youtube, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const footerConfig = {
  brand: {
    name: "xTechs Renewables",
    // Put your logo files in /public. Provide both light & dark for best results.
    lightLogo: "/xlogo.png",
    darkLogo: "/xlogo.png",
    tagline:
      "Clean energy systems, smart storage, and reliable electrical — for homes, builders, and businesses across Victoria.",
    abn: "ABN: 30 673 983 572",
  },
  contact: {
    email: "inquiries@xtechsrenewables.com.au",
    phone: "1300 983 247",
    address: "2 Corporate Ave, Rowville VIC 3178",
  },
  socials: [
    { icon: Instagram, href: "https://www.instagram.com/xtechsrenewables" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/xtechs-renewables" },
    { icon: Youtube, href: "https://www.youtube.com/@xtechsrenewables" },
    { icon: Facebook, href: "https://www.facebook.com/xtechsrenewables" },
  ],
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
        {
          title: "Solutions",
          links: [
            { label: "PV & Battery (Residential)", href: "/pv-battery" },
            { label: "Battery Storage", href: "/battery" },
            { label: "For Builders", href: "/builders" },
            { label: "Off-Grid", href: "/off-grid" },
            { label: "EV Chargers", href: "/ev-chargers" },
            { label: "Electrical & Home Automation", href: "/electrical" },
          ],
        },
    {
      title: "Resources",
      links: [
        { label: "X-Classes (Coming Soon)", href: "/x-classes" },
        { label: "Help / Support", href: "/support" },
        { label: "X-Vrything", href: "/x-vrthing" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Sitemap", href: "/sitemap.xml" },
      ],
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white px-6 py-14 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Brand & tagline */}
        <div className="mb-12">
          <div className="relative mb-4 flex items-center gap-3">
            <Image
              src={footerConfig.brand.darkLogo}
              alt={`${footerConfig.brand.name} logo`}
              width={120}
              height={30}
              className="h-auto w-auto hidden dark:block"
              priority
            />
            <Image
              src={footerConfig.brand.lightLogo}
              alt={`${footerConfig.brand.name} logo`}
              width={120}
              height={30}
              className="h-auto w-auto block dark:hidden"
              priority
            />
            <span className="sr-only">{footerConfig.brand.name}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl">
            {footerConfig.brand.tagline}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {footerConfig.brand.abn}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {footerConfig.columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-[0.9rem] text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact / CTA */}
          <div className="lg:w-1/3">
            <Card className="shadow-none border border-gray-200 dark:border-gray-800">
              <CardContent className="p-5 space-y-3">
                <p className="text-sm font-medium">Get in touch</p>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {footerConfig.contact.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {footerConfig.contact.phone}
                  </p>
                  <p>{footerConfig.contact.address}</p>
                </div>
                <div className="space-y-2">
                  <Link href="https://calendly.com/inquiries-xtechsrenewables/30min" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full">Book Consultation</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">Contact Us</Button>
                  </Link>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium mb-2">Follow us</p>
                  <div className="flex gap-3">
                    {footerConfig.socials.map(({ icon: Icon, href }, idx) => (
                      <Link key={idx} aria-label="social link" href={href} className="text-gray-500 hover:text-blue-500 transition">
                        <Icon className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {footerConfig.brand.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
