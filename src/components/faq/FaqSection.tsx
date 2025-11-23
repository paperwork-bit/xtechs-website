"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SearchInput } from "./SearchInput";
import { CategoryToc } from "./CategoryToc";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";
import { disableAnim, isDev } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqSectionProps {
  id?: string;
  className?: string;
}

const faqData: FAQItem[] = [
  // Power & Backup
  {
    id: "faq-battery-blackout",
    question: "Will a battery keep my lights on in a blackout?",
    answer: "Yes—when sized and configured for backup, essential circuits can keep running during an outage (lighting, refrigeration, comms). We'll confirm your essential loads and design accordingly.",
    category: "power-backup"
  },
  {
    id: "faq-add-battery-later",
    question: "Can I add a battery later?",
    answer: "Often yes. Many inverters support staged upgrades. We'll size your solar and specify hardware that keeps the upgrade path clean.",
    category: "power-backup"
  },
  {
    id: "faq-backup-capacity",
    question: "How much backup can I get?",
    answer: "Depends on battery capacity, inverter output, and your essential circuits. Typical homes back up lights, fridge, internet, and a few GPOs; heavy loads are optional.",
    category: "power-backup"
  },
  
  // Install & Approvals
  {
    id: "faq-installation-time",
    question: "How fast is the installation?",
    answer: "Residential installs are commonly 1–2 days (site-dependent). Larger business/off-grid projects vary with scope and switchboard works.",
    category: "install-approvals"
  },
  {
    id: "faq-export-limits",
    question: "Do you handle export limits and approvals?",
    answer: "Yes—we coordinate with your local distributor, apply export caps where required, and set compliant limits in the inverter.",
    category: "install-approvals"
  },
  {
    id: "faq-complex-roof",
    question: "What if my roof is complex?",
    answer: "We design around orientation, shading, and roof type (tile/metal/flat). If needed we use optimizers or adjust array layout.",
    category: "install-approvals"
  },
  
  // Maintenance & Monitoring
  {
    id: "faq-maintenance-required",
    question: "What maintenance is required?",
    answer: "Minimal. Online monitoring, occasional visual checks, and firmware updates. We provide guidance and can monitor systems under support plans.",
    category: "maintenance-monitoring"
  },
  {
    id: "faq-system-underperforms",
    question: "What happens if my system underperforms?",
    answer: "We review monitoring data, check for shading/faults, and perform diagnostics. Warranty processes are handled with manufacturers where applicable.",
    category: "maintenance-monitoring"
  },
  {
    id: "faq-firmware-updates",
    question: "Will firmware updates break anything?",
    answer: "Updates improve performance and safety. We schedule them appropriately and validate after major updates.",
    category: "maintenance-monitoring"
  },
  
  // Products & Warranty
  {
    id: "faq-brands-carried",
    question: "Which brands do you carry?",
    answer: "Tier-one panels, reputable inverters, and proven batteries suited for Australian conditions. We'll recommend options that match your use-case and budget.",
    category: "products-warranty"
  },
  {
    id: "faq-warranty-length",
    question: "How long are the warranties?",
    answer: "Panels typically 20–25 yrs product / 25–30 yrs performance, inverters ~10 yrs, batteries ~10 yrs (model-specific).",
    category: "products-warranty"
  },
  {
    id: "faq-ev-heat-pump-integration",
    question: "Can I integrate an EV charger or heat pump later?",
    answer: "Yes—systems are designed to be compatible with EV charging and efficient hot-water solutions. We'll leave room in the design for future add-ons.",
    category: "products-warranty"
  }
];

const categories = [
  { id: "power-backup", title: "Power & Backup", count: 3 },
  { id: "install-approvals", title: "Install & Approvals", count: 3 },
  { id: "maintenance-monitoring", title: "Maintenance & Monitoring", count: 3 },
  { id: "products-warranty", title: "Products & Warranty", count: 3 }
];

export function FaqSection({ id = "faq", className }: FaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMounted = useIsMounted();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("power-backup");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string>("");
  const [helpfulVotes, setHelpfulVotes] = React.useState<Record<string, boolean>>({});
  
  const shouldAnimate = isMounted && !disableAnim() && !prefersReducedMotion;

  // Filter FAQs based on search query
  const filteredFaqs = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return faqData.filter(faq => faq.category === activeCategory);
    }
    
    const query = searchQuery.toLowerCase();
    return faqData.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, activeCategory]);

  // Persist openId across filter changes - only reset if current openId is not in filtered results
  React.useEffect(() => {
    if (openId && !filteredFaqs.some(faq => faq.id === openId)) {
      setOpenId(null);
    }
  }, [filteredFaqs, openId]);


  // Handle URL hash on mount and when it changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && faqData.some(faq => faq.id === hash)) {
        const faq = faqData.find(faq => faq.id === hash);
        if (faq) {
          setActiveCategory(faq.category);
          setOpenId(faq.id);
          // Scroll to the FAQ item
          setTimeout(() => {
            document.getElementById(faq.id)?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL when openId changes
  React.useEffect(() => {
    if (openId) {
      const newUrl = `${window.location.pathname}#${openId}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [openId]);

  const copyLink = async (faqId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${faqId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(faqId);
      setTimeout(() => setCopiedId(""), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleHelpfulVote = (faqId: string, isHelpful: boolean) => {
    setHelpfulVotes(prev => ({ ...prev, [faqId]: isHelpful }));
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
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
          {/* Hero Section */}
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className="text-base text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Common questions about our PV & Battery solutions
            </motion.p>
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="max-w-md mx-auto">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search questions..."
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] lg:gap-6">
            {/* Category Navigation */}
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

            {/* FAQ Content */}
            <motion.div variants={shouldAnimate ? itemVariants : undefined}>
              {filteredFaqs.length === 0 ? (
                <EmptyState
                  title="No questions match your search"
                  hint="Try different keywords or clear filters."
                  onClear={() => setSearchQuery("")}
                />
              ) : (
                <>
                  <Accordion 
                    type="single" 
                    collapsible 
                    value={openId ?? undefined}
                    onValueChange={setOpenId}
                    className="space-y-4"
                  >
                  {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <AccordionItem
                      value={faq.id}
                      className="w-full"
                    >
                      <div className="relative">
                        {/* Gradient border effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-white rounded-xl">
                          <AccordionTrigger
                            id={faq.id}
                            className="text-left font-medium text-gray-900 hover:text-blue-600 transition-colors py-3.5 px-4 w-full"
                          >
                            {highlightText(faq.question, searchQuery)}
                          </AccordionTrigger>
                          <AccordionContent
                            id={faq.id}
                            className="px-4 pb-4"
                          >
                            <div className="text-sm text-gray-600 leading-relaxed mb-4">
                              {highlightText(faq.answer, searchQuery)}
                            </div>
                            
                            {/* Action buttons */}
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
                                <span className="text-xs text-gray-500 mr-2">Was this helpful?</span>
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
                </>
              )}
            </motion.div>
          </div>

          {/* Sticky CTA */}
          <motion.div
            variants={shouldAnimate ? itemVariants : undefined}
            className="sticky bottom-0 bg-white border-t border-gray-200 py-3 mt-8 -mx-4 px-4 lg:-mx-8 lg:px-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 font-medium">
                Still have questions?
              </p>
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

export default FaqSection;
