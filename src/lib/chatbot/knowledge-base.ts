/**
 * Knowledge Base for xTechs Renewables Chatbot
 * Contains structured information about the business, services, and offerings
 */

export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  category: string;
  url?: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeChunk[] = [
  // Company Overview
  {
    id: "company-overview",
    title: "About xTechs Renewables",
    category: "company",
    content: `xTechs Renewables is a leading provider of clean energy solutions across Victoria, Australia. We specialize in solar PV systems, battery storage, EV charging, off-grid solutions, and electrical services. Based in Rowville, Melbourne, we serve residential, commercial, and industrial customers throughout Victoria. We are CEC-accredited installers committed to quality, safety, and customer satisfaction.`,
    keywords: ["about", "company", "xtechs", "renewables", "victoria", "australia", "melbourne", "rowville"],
  },
  {
    id: "company-values",
    title: "Our Values",
    category: "company",
    content: `Our core values guide everything we do: Integrity - We act with honesty and uphold the highest ethical standards. Responsibility - We prioritize safety, compliance, and the environment. Accountability - We deliver on our promises and stand behind our workmanship. Quality - We use proven, tier-one products and standards-compliant installations. Teamwork - We collaborate closely with clients and suppliers. Innovation - We embrace modern technologies. Leadership - We set the bar for professionalism and customer care.`,
    keywords: ["values", "integrity", "quality", "professionalism", "ethics"],
  },
  {
    id: "company-stats",
    title: "Our Track Record",
    category: "company",
    content: `We have delivered over 300+ solar systems, deployed 1000+ kW of solar capacity, maintain 100% CEC-accredited installers on all jobs, and achieve 98% customer satisfaction.`,
    keywords: ["stats", "track record", "experience", "satisfaction", "systems delivered"],
  },

  // Residential Solar
  {
    id: "residential-solar",
    title: "Residential Solar PV & Batteries",
    category: "services",
    content: `We provide tailored solar PV and battery systems for family homes across Victoria. Our residential installations include neat switchboards, clean cabling, and expert guidance on Solar Victoria rebates. We design systems to maximize your energy independence and reduce electricity bills. All installations are performed by CEC-accredited installers with comprehensive warranties.`,
    keywords: ["residential", "home", "solar", "panels", "pv", "battery", "family", "house", "domestic"],
    url: "/pv-battery/residential",
  },
  {
    id: "residential-batteries",
    title: "Home Battery Storage",
    category: "services",
    content: `Home battery systems store your solar energy for use when the sun isn't shining. We install Tesla Powerwall 2 & 3, Alpha ESS, BYD, and Sungrow battery systems. Features include smart energy management, backup power circuits, mobile app monitoring, and comprehensive warranty support. Batteries help you maximize self-consumption of your solar energy and provide backup power during outages.`,
    keywords: ["battery", "storage", "tesla", "powerwall", "alpha ess", "byd", "sungrow", "backup", "home battery"],
    url: "/battery",
  },

  // Commercial Solar
  {
    id: "commercial-solar",
    title: "Business & Commercial Solar",
    category: "services",
    content: `We provide data-driven solar designs for shops, offices, and industrial sites across Victoria. Our commercial installations include export-limit approvals, smart monitoring systems, and comprehensive maintenance programs. We help businesses reduce operational costs, meet sustainability goals, and manage peak demand through intelligent energy systems.`,
    keywords: ["commercial", "business", "office", "shop", "industrial", "corporate", "enterprise"],
    url: "/pv-battery/business",
  },
  {
    id: "commercial-batteries",
    title: "Commercial Battery Storage",
    category: "services",
    content: `Large-scale battery storage solutions for businesses include commercial-grade batteries, peak demand management, energy arbitrage systems, grid services integration, remote monitoring, and maintenance programs. These systems help businesses reduce peak demand charges and provide backup power for critical operations.`,
    keywords: ["commercial battery", "business battery", "peak demand", "energy arbitrage", "grid services"],
    url: "/battery",
  },

  // Off-Grid Systems
  {
    id: "off-grid",
    title: "Off-Grid & Hybrid Systems",
    category: "services",
    content: `We design and install robust off-grid and hybrid solar systems for remote sites and critical operations. Our systems are sized for your specific loads and future growth. Off-grid systems provide complete energy independence, while hybrid systems combine solar, battery storage, and grid connection for maximum flexibility. Perfect for remote properties, farms, and locations without reliable grid access.`,
    keywords: ["off-grid", "offgrid", "hybrid", "remote", "standalone", "independent", "no grid"],
    url: "/pv-battery/off-grid",
  },

  // EV Charging
  {
    id: "ev-charging",
    title: "EV Charging Solutions",
    category: "services",
    content: `We install smart EV charging stations that integrate with your solar system. Available products include Tesla Wall Connector, Zappi, SigEnergy, and Wattpilot chargers. Features include smart solar charging (using your solar energy first), dynamic load management, mobile app control, and scheduling. We help you charge your electric vehicle using clean, renewable energy from your solar panels.`,
    keywords: ["ev", "electric vehicle", "charging", "charger", "tesla", "zappi", "sigenergy", "wattpilot", "car charging"],
    url: "/ev-chargers",
  },

  // SolarFold
  {
    id: "solarfold",
    title: "SolarFold Rapid-Deploy Power",
    category: "services",
    content: `SolarFold is our mobile, fast-deploy solar array system perfect for military operations, mining sites, events, emergency power, and short or long-term projects. These portable systems can be quickly deployed to provide reliable power in remote or temporary locations. Ideal for construction sites, festivals, disaster relief, and remote operations.`,
    keywords: ["solarfold", "portable", "mobile", "rapid deploy", "temporary", "event", "military", "mining", "emergency"],
    url: "/solarfold",
  },
  {
    id: "solarfold-applications",
    title: "SolarFold Applications",
    category: "services",
    content: `SolarFold systems are used for: Short-term projects (events, festivals, construction sites), Long-term projects (mining operations, remote facilities), Emergency power (disaster relief, backup power), Military operations, Community power solutions, and Event power. Each system is customized for your specific power requirements and deployment timeline.`,
    keywords: ["solarfold applications", "event power", "emergency power", "mining", "military", "construction"],
    url: "/solarfold",
  },

  // Electrical Services
  {
    id: "electrical",
    title: "Electrical Services",
    category: "services",
    content: `We provide comprehensive electrical services including switchboard upgrades, electrical repairs, home automation systems, and builder services. All electrical work is performed by licensed electricians in compliance with Australian standards. We ensure safe, reliable electrical installations that integrate seamlessly with your solar and battery systems.`,
    keywords: ["electrical", "electrician", "switchboard", "upgrade", "repair", "automation", "builder"],
    url: "/electrical",
  },

  // Builders Services
  {
    id: "builders",
    title: "Builder Services",
    category: "services",
    content: `We work with builders and developers to provide solar and electrical solutions for new construction projects. Our builder-ready workflows ensure timely installations that align with construction schedules. We handle all aspects from design to installation, ensuring compliance and quality throughout the build process.`,
    keywords: ["builder", "developer", "construction", "new build", "new home", "development"],
    url: "/pv-battery/builders",
  },

  // Process & Installation
  {
    id: "process",
    title: "Our Installation Process",
    category: "process",
    content: `Our installation process has six phases: 1) Initial Consultation - We understand your needs, budget, and goals in an obligation-free discussion. 2) Site Inspection & Energy Assessment - Our technicians conduct a detailed site inspection, measure roof space, analyze energy usage, and assess electrical capacity. 3) Tailored Design & Quote - We create up to three unique proposals with 3D visualizations and financial analysis. 4) Professional Installation - Our SAA-certified electricians complete installation in 1-2 days with minimal disruption. 5) Safety Compliance & Certification - An independent inspector reviews all work for compliance with Australian Standards. 6) System Handover & Monitoring Setup - We provide all certificates, set up monitoring apps, and explain how to track your energy production.`,
    keywords: ["process", "installation", "phases", "steps", "how it works", "procedure", "workflow"],
  },
  {
    id: "process-consultation",
    title: "Initial Consultation",
    category: "process",
    content: `We begin with a friendly, obligation-free consultation where our renewable energy specialists understand your needs, budget, and long-term goals. We explore your energy consumption patterns, discuss sustainability goals, explain how different technologies work together, and cover government rebates and financing options. We assess your property's solar potential and provide a realistic timeline. By the end, you'll have a clear understanding and personalized roadmap.`,
    keywords: ["consultation", "initial", "first step", "obligation free", "discussion", "meeting"],
  },
  {
    id: "process-inspection",
    title: "Site Inspection & Energy Assessment",
    category: "process",
    content: `Our technical team conducts a detailed site inspection at your convenience. We measure roof space, identify shading issues, analyze energy usage patterns, examine roof structure, assess structural integrity, review electrical panel capacity, and analyze historical electricity bills. The inspection typically takes 1-2 hours, and we provide a detailed report with findings and recommendations.`,
    keywords: ["inspection", "site assessment", "energy assessment", "roof", "measurement", "evaluation"],
  },
  {
    id: "process-design",
    title: "Design & Quote",
    category: "process",
    content: `Our design team creates up to three unique proposals that balance performance, aesthetics, and budget. We use advanced 3D modeling software to visualize how your system will look. Each proposal includes detailed financial analysis showing expected savings over 25 years, payback period, and return on investment. We explain the benefits of each option to help you make an informed decision.`,
    keywords: ["design", "quote", "proposal", "3d", "modeling", "financial analysis", "savings"],
  },
  {
    id: "process-installation",
    title: "Professional Installation",
    category: "process",
    content: `Our in-house team of SAA-certified electricians handles everything. Most installations are completed within 1-2 days with minimal disruption. We begin with a pre-installation meeting to review the design and timeline. We use only high-quality equipment and workmanship, ensuring your system is safe, reliable, and built to last. Our electricians are fully licensed and insured with comprehensive warranties.`,
    keywords: ["installation", "install", "electrician", "saa", "certified", "licensed", "how long"],
  },
  {
    id: "process-compliance",
    title: "Safety Compliance & Certification",
    category: "process",
    content: `After installation, a licensed independent inspector reviews every detail of our work, covering electrical connections, mounting systems, panel placement, and safety features. The inspector verifies compliance with Australian Standards (AS/NZS 5033) and local building codes. Once passed, you receive a Certificate of Electrical Safety (CES), confirming compliance and qualifying your system for rebates.`,
    keywords: ["compliance", "certification", "safety", "inspection", "ces", "australian standards", "certificate"],
  },
  {
    id: "process-handover",
    title: "System Handover & Monitoring",
    category: "process",
    content: `We hand over your complete solar system with all certificates of compliance, approvals, and warranty documents. We provide a complete system manual with operation instructions, maintenance schedules, and troubleshooting guides. Our team helps you set up the monitoring app to track energy production and consumption in real-time. We explain how to read your electricity bills and understand grid export credits.`,
    keywords: ["handover", "monitoring", "app", "tracking", "energy production", "manual", "warranty documents"],
  },
  {
    id: "site-assessment",
    title: "Site Assessment",
    category: "process",
    content: `We offer professional site assessments to evaluate your property for solar installation. During the assessment, we check roof condition, shading, orientation, electrical infrastructure, and energy consumption patterns. Site inspection fees apply, and we'll provide a detailed quote after assessing your property. Book your site assessment through our contact page.`,
    keywords: ["site assessment", "inspection", "quote", "evaluation", "survey", "consultation"],
    url: "/contact",
  },

  // Rebates & Incentives
  {
    id: "rebates",
    title: "Solar Victoria Rebates",
    category: "rebates",
    content: `We provide expert guidance on Solar Victoria rebates and incentives available to Victorian residents. These rebates can significantly reduce the cost of your solar installation. Eligibility depends on factors like household income, property location, and existing solar systems. We help you understand what rebates you may qualify for and assist with the application process.`,
    keywords: ["rebate", "incentive", "solar victoria", "government", "subsidy", "discount", "financial assistance"],
  },

  // Warranty & Support
  {
    id: "warranty",
    title: "Warranty & Support",
    category: "support",
    content: `We stand behind our work with comprehensive warranties on all installations. Our products come with manufacturer warranties (typically 10-25 years for panels, 10 years for batteries), and we provide workmanship warranties on all installations. We offer ongoing monitoring, maintenance services, and technical support to ensure your system performs optimally for years to come.`,
    keywords: ["warranty", "support", "maintenance", "monitoring", "service", "guarantee"],
  },

  // Contact Information
  {
    id: "contact",
    title: "Contact Us",
    category: "contact",
    content: `You can reach us by calling 1300 983 247 or by booking a site assessment through our contact page. We're based in Rowville, Melbourne, and serve customers throughout Victoria. You can also use our online contact form or booking calendar to schedule a consultation. We're here to help you make the switch to renewable energy.`,
    keywords: ["contact", "phone", "call", "1300", "email", "booking", "appointment", "consultation"],
    url: "/contact",
  },
  {
    id: "location",
    title: "Service Area",
    category: "contact",
    content: `We are based in Rowville, Melbourne, and provide services across Victoria, Australia. We serve residential, commercial, and industrial customers throughout the state. Our team travels to your location for site assessments and installations.`,
    keywords: ["location", "area", "victoria", "melbourne", "rowville", "service area", "where"],
  },

  // Products & Brands
  {
    id: "products-tesla",
    title: "Tesla Products",
    category: "products",
    content: `We install Tesla Powerwall 2 and Powerwall 3 battery systems, as well as Tesla Wall Connector EV chargers. Tesla products are known for their reliability, smart features, and excellent warranty coverage. The Powerwall provides 13.5kWh capacity with 5kW continuous power and includes a 10-year warranty.`,
    keywords: ["tesla", "powerwall", "wall connector", "tesla battery", "tesla charger"],
  },
  {
    id: "products-alpha",
    title: "Alpha ESS Batteries",
    category: "products",
    content: `Alpha ESS provides reliable commercial-grade battery systems with capacities from 5-20kWh. These systems feature high efficiency, modular design, and advanced monitoring capabilities. Alpha ESS batteries are a cost-effective option for both residential and commercial applications.`,
    keywords: ["alpha ess", "alpha", "battery", "commercial"],
  },
  {
    id: "products-other",
    title: "Other Products",
    category: "products",
    content: `We also install BYD and Sungrow battery systems, Zappi EV chargers, SigEnergy chargers, and Wattpilot chargers. We work with tier-one manufacturers to ensure quality and reliability. All products are selected based on your specific needs, budget, and system requirements.`,
    keywords: ["byd", "sungrow", "zappi", "sigenergy", "wattpilot", "products", "brands"],
  },

  // Pricing & Costs
  {
    id: "pricing",
    title: "Pricing Information",
    category: "pricing",
    content: `Solar system pricing varies based on system size, components, installation complexity, and specific requirements. We provide detailed quotes after a site assessment. Battery systems typically start from around $8,000 for smaller systems. We offer competitive pricing and can help you understand financing options and rebates that may reduce your upfront costs.`,
    keywords: ["price", "cost", "pricing", "quote", "affordable", "expensive", "how much", "budget"],
  },

  // General FAQ
  {
    id: "faq-solar-benefits",
    title: "Benefits of Solar",
    category: "faq",
    content: `Solar energy helps you reduce electricity bills, increase energy independence, reduce your carbon footprint, increase property value, and provide backup power (with batteries). Solar systems typically pay for themselves over 5-7 years through energy savings, and with 25-year warranties, you'll enjoy decades of free electricity from the sun.`,
    keywords: ["benefits", "why solar", "advantages", "save money", "environment", "carbon"],
  },
  {
    id: "faq-how-long",
    title: "How Long Does Installation Take",
    category: "faq",
    content: `Most residential solar installations are completed in 1-2 days, depending on system size and complexity. Commercial installations may take longer. We work efficiently to minimize disruption to your daily activities. The entire process from initial contact to completed installation typically takes 4-8 weeks, including site assessment, design, approvals, and installation.`,
    keywords: ["how long", "duration", "time", "days", "weeks", "installation time", "timeline"],
  },
  {
    id: "faq-maintenance",
    title: "Solar System Maintenance",
    category: "faq",
    content: `Solar systems require minimal maintenance. We recommend periodic cleaning of panels (especially if they're easily accessible), checking monitoring systems, and annual professional inspections. Most systems include monitoring apps that alert you to any issues. We offer maintenance packages to keep your system operating at peak performance.`,
    keywords: ["maintenance", "cleaning", "care", "upkeep", "service", "inspection"],
  },
];

/**
 * Search the knowledge base for relevant chunks
 */
export function searchKnowledgeBase(query: string, limit: number = 5): KnowledgeChunk[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  // Score each chunk based on keyword matches
  const scored = knowledgeBase.map(chunk => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();
    const lowerKeywords = chunk.keywords.map(k => k.toLowerCase()).join(' ');
    
    // Title matches are worth more
    if (lowerTitle.includes(lowerQuery)) score += 10;
    
    // Keyword matches
    queryWords.forEach(word => {
      if (lowerKeywords.includes(word)) score += 5;
      if (lowerTitle.includes(word)) score += 3;
      if (lowerContent.includes(word)) score += 1;
    });
    
    // Exact phrase match
    if (lowerContent.includes(lowerQuery)) score += 5;
    
    return { chunk, score };
  });
  
  // Sort by score and return top results
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.chunk);
}

/**
 * Get context for a query by combining relevant knowledge chunks
 */
export function getContextForQuery(query: string): string {
  const relevantChunks = searchKnowledgeBase(query, 3);
  if (relevantChunks.length === 0) {
    return "xTechs Renewables provides solar PV, battery storage, EV charging, and electrical services across Victoria, Australia.";
  }
  
  return relevantChunks
    .map(chunk => `${chunk.title}: ${chunk.content}`)
    .join('\n\n');
}

