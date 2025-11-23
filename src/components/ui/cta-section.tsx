"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  tertiaryButtonText?: string;
  tertiaryButtonHref?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  showPhoneButton?: boolean;
  phoneNumber?: string;
  disclaimer?: string;
  onCalendlyClick?: () => void;
}

// Helper function to get hover text color based on button color
const getHoverTextColor = (buttonColor: string) => {
  if (buttonColor.includes('green')) return 'hover:text-green-600';
  if (buttonColor.includes('orange')) return 'hover:text-orange-600';
  if (buttonColor.includes('blue')) return 'hover:text-blue-600';
  return 'hover:text-blue-600';
};

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  tertiaryButtonText,
  tertiaryButtonHref,
  backgroundColor = "bg-gradient-to-r from-blue-600 to-green-600",
  textColor = "text-blue-100",
  buttonColor = "text-blue-600",
  showPhoneButton = true,
  phoneNumber = "1300 983 247",
  disclaimer,
  onCalendlyClick
}: CTASectionProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const hoverTextColor = getHoverTextColor(buttonColor);

  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className={`text-xl ${textColor} mb-8`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className={`bg-white ${buttonColor} hover:bg-gray-100 border-2 border-transparent font-semibold`} asChild>
              <Link href={primaryButtonHref}>
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className={`border-2 border-white text-white hover:bg-white ${hoverTextColor} bg-transparent font-semibold`} asChild>
              <Link 
                href={secondaryButtonHref} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onCalendlyClick}
              >
                {secondaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {tertiaryButtonText && tertiaryButtonHref && (
              <Button size="lg" variant="outline" className={`border-2 border-white text-white hover:bg-white ${hoverTextColor} bg-transparent font-semibold`} asChild>
                <Link href={tertiaryButtonHref}>
                  {tertiaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
            {showPhoneButton && (
              <Button size="lg" variant="outline" className={`border-2 border-white text-white hover:bg-white ${hoverTextColor} bg-transparent font-semibold`} asChild>
                <Link href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 w-5 h-5" />
                  Call {phoneNumber}
                </Link>
              </Button>
            )}
          </div>
          {disclaimer && (
            <p className={`text-sm ${textColor} mt-4`}>
              {disclaimer}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
