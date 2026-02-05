"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchInput } from "./SearchInput";
import { CategoryToc } from "./CategoryToc";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";
import { disableAnim } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface AmberFaqSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
}

const faqData: FAQItem[] = [
  // Amber Value & Pricing
  {
    id: "amber-benefit-solar-battery",
    question:
      "How does Amber Electric’s pricing benefit solar & battery owners?",
    answer:
      "Amber passes through wholesale prices. When prices spike, your battery can export at very high feed-in rates (in rare events up to ~$19/kWh). Amber’s SmartShift automates charge/discharge to maximise your returns based on market conditions.",
    category: "value-pricing",
  },
  {
    id: "amber-lock-in-contracts",
    question: "Is there a lock-in contract with Amber Electric?",
    answer:
      "No. Amber works on a subscription model with no lock-in. You can switch at any time. Your xTechs-installed system remains retailer-agnostic.",
    category: "value-pricing",
  },

  // Compatibility & Setup
  {
    id: "amber-compatibility",
    question:
      "Do I need a specific battery or inverter to use Amber SmartShift?",
    answer:
      "SmartShift supports a growing list of batteries and inverters. We’ll confirm compatibility or specify supported hardware during your xTechs design so you’re ready to automate from day one.",
    category: "compatibility-setup",
  },
  {
    id: "amber-keep-backup",
    question:
      "Can I keep backup power and still participate in SmartShift exports?",
    answer:
      "Yes. We can reserve a backup buffer so essential circuits remain powered during outages while SmartShift uses the remainder to optimise earnings when market conditions are favourable.",
    category: "compatibility-setup",
  },
  {
    id: "amber-existing-system",
    question: "Can Amber work with my existing solar/battery system?",
    answer:
      "Often yes. If your hardware is supported, we can connect you to Amber and enable SmartShift. If not, we’ll outline the simplest path to compatibility (firmware, gateway, or upgrade options).",
    category: "compatibility-setup",
  },

  // Earnings & Results
  {
    id: "amber-expected-earnings",
    question: "What earnings should I expect?",
    answer:
      "Earnings vary by state, system size, battery capacity, usage, and frequency of price events. We’ll model realistic scenarios for your site. Note that past performance doesn’t guarantee future results.",
    category: "earnings-results",
  },
  {
    id: "amber-price-spikes",
    question: "How often do price spikes happen?",
    answer:
      "Spikes are market-dependent and vary by season and region. Amber’s SmartShift forecasts and responds automatically; you don’t need to time the market yourself.",
    category: "earnings-results",
  },

  // Billing & Operations
  {
    id: "amber-billing-how-it-works",
    question: "How does billing with Amber work?",
    answer:
      "You pay Amber’s subscription and get pass-through wholesale energy prices. Imports reflect wholesale costs, and exports earn wholesale feed-in. There’s no hidden margin on energy rates.",
    category: "billing-ops",
  },
  {
    id: "amber-manual-control",
    question:
      "Can I override automation and run my battery manually if I want?",
    answer:
      "Yes. You can switch between automation and manual control when you prefer, such as reserving charge for backup or discharging at your discretion.",
    category: "billing-ops",
  },
  {
    id: "amber-leave-anytime",
    question: "Can I leave Amber if I change my mind?",
    answer:
      "Yes. There’s no lock-in. If you decide to switch retailers later, your xTechs system remains fully usable.",
    category: "billing-ops",
  },
];

const rawCategories = [
  { id: "value-pricing", title: "Value & Pricing" },
  { id: "compatibility-setup", title: "Compatibility & Setup" },
  { id: "earnings-results", title: "Earnings & Results" },
  { id: "billing-ops", title: "Billing & Operations" },
];

// derive counts from data so it never drifts
const categories = rawCategories.map((c) => ({
  ...c,
  count: faqData.filter((f) => f.category === c.id).length,
}));

export  function FaqSectionAmber({
  id = "faq",
  className,
  heading = "Amber Electric — Frequently Asked Questions",
  subheading = "Common questions about Amber, SmartShift, and maximising solar & battery ROI",
}: AmberFaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMounted = useIsMounted();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState(categories[0].id);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string>("");
  const [helpfulVotes, setHelpfulVotes] = React.useState<Record<string, boolean>>(
    {}
  );

  const shouldAnimate = isMounted && !disableAnim() && !prefersReducedMotion;

  const filteredFaqs = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return faqData.filter((faq) => faq.category === activeCategory);
    }
    const q = searchQuery.toLowerCase();
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    );
  }, [searchQuery, activeCategory]);

  React.useEffect(() => {
    if (openId && !filteredFaqs.some((faq) => faq.id === openId)) {
      setOpenId(null);
    }
  }, [filteredFaqs, openId]);

  // deep-link support: #faq-id
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && faqData.some((f) => f.id === hash)) {
        const faq = faqData.find((f) => f.id === hash)!;
        setActiveCategory(faq.category);
        setOpenId(faq.id);
        setTimeout(() => {
          document.getElementById(faq.id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // update URL hash when openId changes
  React.useEffect(() => {
    if (openId) {
      const newUrl = `${window.location.pathname}#${openId}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [openId]);

  const copyLink = async (faqId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${faqId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(faqId);
      setTimeout(() => setCopiedId(""), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleHelpfulVote = (faqId: string, isHelpful: boolean) => {
    setHelpfulVotes((prev) => ({ ...prev, [faqId]: isHelpful }));
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safe})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id={id} className={cn("py-8 lg:py-12 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={shouldAnimate ? { once: true, margin: "-50px" } : undefined}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="mb-3">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                FAQ
              </span>
            </motion.div>
            <motion.h1
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3"
            >
              {heading}
            </motion.h1>
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-base text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              {subheading}
            </motion.p>
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="max-w-md mx-auto">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search questions..."
              />
            </motion.div>
          </div>

          {/* Main */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] lg:gap-6">
            {/* Category TOC */}
            <motion.div
              variants={shouldAnimate ? itemVariants : undefined}
              className="lg:sticky lg:top-8 lg:h-fit mb-6 lg:mb-0"
            >
              <CategoryToc
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={setActiveCategory}
              />
            </motion.div>

            {/* Content */}
            <motion.div variants={shouldAnimate ? itemVariants : undefined}>
              {filteredFaqs.length === 0 ? (
                <EmptyState
                  title="No questions match your search"
                  hint="Try different keywords or clear filters."
                  onClear={() => setSearchQuery("")}
                />
              ) : (
                <Accordion
                  type="single"
                  collapsible
                  value={openId ?? undefined}
                  onValueChange={setOpenId}
                  className="space-y-4"
                >
                  {filteredFaqs.map((faq) => (
                    <div
                      id={faq.id} // unique anchor target here
                      key={faq.id}
                      className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <AccordionItem value={faq.id} className="w-full">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-white rounded-xl">
                            <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600 transition-colors py-3.5 px-4 w-full">
                              {highlightText(faq.question, searchQuery)}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="text-sm text-gray-600 leading-relaxed mb-4">
                                {highlightText(faq.answer, searchQuery)}
                              </div>

                              {/* Actions */}
                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => copyLink(faq.id)}
                                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                                  >
                                    {copiedId === faq.id ? (
                                      <>
                                        <Check className="h-3 w-3" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3 w-3" />
                                        Copy link
                                      </>
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-500 mr-2">
                                    Was this helpful?
                                  </span>
                                  <button
                                    onClick={() => handleHelpfulVote(faq.id, true)}
                                    className={cn(
                                      "p-1 rounded transition-colors",
                                      helpfulVotes[faq.id] === true
                                        ? "text-green-600 bg-green-50"
                                        : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                                    )}
                                    aria-label="Helpful"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => handleHelpfulVote(faq.id, false)}
                                    className={cn(
                                      "p-1 rounded transition-colors",
                                      helpfulVotes[faq.id] === false
                                        ? "text-red-600 bg-red-50"
                                        : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                                    )}
                                    aria-label="Not helpful"
                                  >
                                    <ThumbsDown className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </AccordionContent>
                          </div>
                        </div>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              )}
            </motion.div>
          </div>

          {/* Sticky CTA */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="sticky bottom-0 bg-white border-t border-gray-200 py-3 mt-8 -mx-4 px-4 lg:-mx-8 lg:px-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 font-medium">Still have questions?</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/contact">Get Expert Advice</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default FaqSectionAmber;
