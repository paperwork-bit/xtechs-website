"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function FAQSection({ 
  faqs, 
  title = "Frequently Asked Questions", 
  description,
  className = ""
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ data for different services
export const solarFAQs: FAQItem[] = [
  {
    question: "How much can I save with solar panels?",
    answer: "Most Victorian homes save 60-80% on their electricity bills with solar panels. A typical 6.6kW system can save $1,500-$2,500 annually, paying for itself in 4-6 years."
  },
  {
    question: "What size solar system do I need?",
    answer: "System size depends on your energy usage, roof space, and budget. We analyze your electricity bills and roof layout to recommend the optimal size, typically 5-10kW for most homes."
  },
  {
    question: "Do I need council approval for solar?",
    answer: "Most residential solar installations don't require council approval. We handle all necessary permits and ensure compliance with local regulations and CEC standards."
  },
  {
    question: "How long does installation take?",
    answer: "Residential solar installations typically take 1-2 days, depending on system size and complexity. We coordinate with your electricity retailer for grid connection approval."
  },
  {
    question: "What warranty do you provide?",
    answer: "We provide 25-year panel warranty, 10-year inverter warranty, and 5-year workmanship warranty. All installations are backed by our CEC accreditation and insurance."
  }
];

export const batteryFAQs: FAQItem[] = [
  {
    question: "How long will my battery last during a blackout?",
    answer: "Battery backup duration depends on capacity and usage. A Tesla Powerwall 3 can power essential loads for 12-24 hours, while larger systems can provide 2-3 days of backup power."
  },
  {
    question: "Can I add a battery to my existing solar system?",
    answer: "Yes, most solar systems can be retrofitted with battery storage. We assess your current setup and recommend compatible battery solutions for optimal performance."
  },
  {
    question: "What's the difference between AC and DC coupled batteries?",
    answer: "AC coupled batteries work with any inverter, while DC coupled batteries are more efficient but require compatible inverters. We recommend the best option based on your system."
  },
  {
    question: "How much maintenance do batteries require?",
    answer: "Modern lithium batteries require minimal maintenance. We provide monitoring systems and annual health checks to ensure optimal performance and longevity."
  }
];

export const evChargerFAQs: FAQItem[] = [
  {
    question: "What's the difference between Level 1 and Level 2 chargers?",
    answer: "Level 1 chargers use standard 240V outlets (slow charging), while Level 2 chargers use dedicated 240V circuits (3-7x faster). We recommend Level 2 for home installations."
  },
  {
    question: "Can I charge my EV with solar power?",
    answer: "Yes! Smart EV chargers can be programmed to charge during peak solar production, maximizing your renewable energy usage and minimizing grid electricity costs."
  },
  {
    question: "Do I need special electrical work for EV charging?",
    answer: "Level 2 chargers require dedicated circuits and may need electrical upgrades. We assess your electrical panel and provide complete installation services."
  },
  {
    question: "What EV charger brands do you install?",
    answer: "We install leading brands including Tesla Wall Connector, Zappi, Fronius, and Wallbox. We recommend the best option based on your EV model and charging needs."
  }
];
