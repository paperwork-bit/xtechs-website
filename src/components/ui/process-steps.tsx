"use client";

import { Stepper } from "@/components/ui/stepper";
import { StepPanel } from "@/components/ui/step-panel";
import { useState } from "react";

const STEPS = [
  { id: "consultation", label: "Initial Consultation" },
  { id: "inspection", label: "Site Inspection" },
  { id: "design", label: "Design & Quote" },
  { id: "installation", label: "Installation" },
  { id: "compliance", label: "Safety Compliance" },
  { id: "handover", label: "System Handover" },
];

const CONTENT = {
  consultation: {
    title: "Phase One · Initial Consultation",
    description: "Start your journey with clarity and confidence.",
    body: `We begin with a friendly, obligation-free consultation where our renewable energy specialists take the time to understand your needs, budget, and long-term goals. Whether you're curious about solar panels, battery storage, or a complete energy solution, we break down your options in simple terms – no jargon, just honest advice.

During this comprehensive discussion, we'll explore your current energy consumption patterns, discuss your sustainability goals, and explain how different technologies can work together to maximize your savings. We'll also cover important topics like government rebates, financing options, and the expected return on investment for your specific situation.

Our team will assess your property's solar potential, discuss any unique challenges or opportunities, and provide you with a realistic timeline for your project. By the end of this consultation, you'll have a clear understanding of what's possible for your home or business, along with a personalized roadmap for your renewable energy journey.`,
  },
  inspection: {
    title: "Phase Two · Site Inspection & Energy Assessment",
    description: "Turning ideas into a real-world plan.",
    body: `Once you're ready to move forward, our technical team conducts a detailed site inspection at your convenience. We'll measure your roof space, identify shading issues, and analyze your household or business energy usage patterns.

Our certified technicians will carefully examine your roof structure, assess the structural integrity needed for solar panel installation, and analyze your electrical panel capacity. We'll also review your historical electricity bills to understand your consumption patterns throughout the year.

This data helps us design a system that perfectly matches your energy needs, ensuring you get maximum value from your investment. The inspection typically takes 1-2 hours, and we'll provide you with a detailed report outlining our findings and recommendations.`,
  },
  design: {
    title: "Phase Three · Tailored Design & Quote",
    description: "A system designed just for you.",
    body: `Our design team gets to work on creating up to three unique proposals that align with your needs. Each design balances performance, aesthetics, and budget, while factoring in rebates, financing options, and long-term energy savings.

We use advanced 3D modeling software to create detailed visualizations of how your solar system will look on your roof. Each proposal includes detailed financial analysis showing your expected savings over 25 years, payback period, and return on investment.

We'll sit down with you to explain the benefits of each option, helping you understand how different choices will impact your energy production and savings. This ensures you can make an informed decision with absolute confidence.`,
  },
  installation: {
    title: "Phase Four · Professional Installation",
    description: "Fast, safe, and stress-free installation.",
    body: `When you're ready, our in-house team of SAA-certified electricians takes care of everything. Most installations are completed within 1–2 days, with minimal disruption to your routine.

Our installation process begins with a pre-installation meeting where we'll review the final design and discuss the installation timeline. We'll also explain what to expect during the installation process and how to prepare your property.

We use only high-quality equipment and workmanship, ensuring your system is safe, reliable, and built to last for decades. Our electricians are fully licensed and insured, and we maintain comprehensive warranties on both our workmanship and the equipment we install.`,
  },
  compliance: {
    title: "Phase Five · Safety Compliance & Certification",
    description: "Independent checks for total peace of mind.",
    body: `After installation, a licensed independent inspector reviews every detail of our work. The inspection covers all electrical connections, mounting systems, panel placement, and safety features.

The inspector will verify that all work complies with Australian Standards (AS/NZS 5033) and local building codes. They'll check that the system is properly grounded, all connections are secure, and the installation meets fire safety requirements.

Once the system passes inspection, you'll receive a Certificate of Electrical Safety (CES), confirming compliance with strict Australian standards. This step guarantees that your system qualifies for rebates and operates at peak safety.`,
  },
  handover: {
    title: "Phase Six · System Handover & Monitoring Setup",
    description: "Stay in control of your energy.",
    body: `At the final stage, we hand over your complete solar system along with all certificates of compliance, approvals, and warranty documents for your records. We'll provide you with a complete system manual that includes operation instructions, maintenance schedules, and troubleshooting guides.

Our team will help you set up the manufacturer's monitoring app, which allows you to track your energy production and consumption in real-time. You'll be able to see how much energy your system is generating, how much you're using, and how much you're exporting to the grid.

We'll also explain how to read your electricity bills and understand the credits you'll receive for excess energy exported to the grid. And if you ever need assistance, our team is always just a call away.`,
  },
};

export function ProcessSteps() {
  const [activeId, setActiveId] = useState(STEPS[0].id);

  return (
    <section id="process" className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
      <header className="mb-6 md:mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Our Process
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          From first chat to clean energy on your roof — here's how we deliver.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6">
        {/* Sticky stepper */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="font-semibold mb-4">Process Steps</h3>
            <Stepper
              steps={STEPS}
              activeId={activeId}
              onChange={setActiveId}
              orientation="auto"
            />
          </div>
        </aside>

        {/* Content panel with better spacing */}
        <section className="rounded-2xl border bg-background shadow-sm">
          <div className="h-[min(60vh,700px)] overflow-hidden">
            <StepPanel
              activeKey={activeId}
              items={Object.entries(CONTENT).map(([key, v]) => ({
                key,
                node: (
                  <article className="h-full flex flex-col p-6 md:p-8">
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                      <h3 className="text-xl md:text-2xl font-semibold mb-3">{v.title}</h3>
                      <p className="text-muted-foreground mb-6 text-lg">{v.description}</p>
                      <div className="rounded-lg border bg-gradient-to-br from-secondary/40 to-secondary/20 p-6 md:p-8 text-sm md:text-base leading-relaxed shadow-sm">
                        {v.body}
                      </div>
                    </div>
                    
                    {/* Visual enhancement at bottom */}
                    <div className="mt-6 pt-6 border-t border-border/50 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                          <span>Phase {Object.keys(CONTENT).indexOf(key) + 1} of {Object.keys(CONTENT).length}</span>
                        </div>
                        <div className="flex gap-1">
                          {Object.keys(CONTENT).map((_, index) => (
                            <div 
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === Object.keys(CONTENT).indexOf(key) 
                                  ? 'bg-primary' 
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ),
              }))}
            />
          </div>
        </section>
      </div>
    </section>
  );
}

export default ProcessSteps;


