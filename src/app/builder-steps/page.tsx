"use client";

import { Stepper } from "@/components/ui/stepper";
import { StepPanel } from "@/components/ui/step-panel";
import { useState } from "react";

const STEPS = [
  { id: "phase-1", label: "Phase 1: Cavity Rough-In" },
  { id: "phase-2", label: "Phase 2: Inverter & Cabling" },
  { id: "phase-3", label: "Phase 3: Panels" },
  { id: "phase-4", label: "Phase 4: Commissioning" },
  { id: "handover", label: "Handover & Paperwork" },
];

const CONTENT: Record<string, { title: string; body: string; details: string[] }> = {
  "phase-1": {
    title: "Cavity Rough-In",
    body: "Conduits, isolator positions, compliance checks…",
    details: [
      "Install conduit runs from switchboard to roof",
      "Position isolator switches according to AS/NZS 3000",
      "Complete compliance documentation",
      "Schedule electrical inspection"
    ]
  },
  "phase-2": {
    title: "Inverter & Cabling",
    body: "Mounting, clearances, AC/DC runs, labeling…",
    details: [
      "Mount inverter with proper clearances",
      "Run AC and DC cabling with correct sizing",
      "Install proper labeling and identification",
      "Complete electrical connections"
    ]
  },
  "phase-3": {
    title: "Panels",
    body: "Layout, rail, earthing, penetrations, wind zones…",
    details: [
      "Install mounting rails according to wind zone requirements",
      "Position panels for optimal sun exposure",
      "Complete earthing and bonding",
      "Install roof penetrations with proper sealing"
    ]
  },
  "phase-4": {
    title: "Commissioning",
    body: "AS/NZS 4777 checks, apps, firmware, photos…",
    details: [
      "Complete AS/NZS 4777 compliance testing",
      "Configure monitoring apps and firmware",
      "Take commissioning photos",
      "Complete final electrical testing"
    ]
  },
  "handover": {
    title: "Handover & Paperwork",
    body: "CEC forms, STCs, Solar Vic docs, manuals…",
    details: [
      "Complete CEC installation forms",
      "Submit STC applications",
      "Provide Solar Victoria documentation",
      "Hand over user manuals and warranties"
    ]
  },
};

export default function BuilderStepsPage() {
  const [activeId, setActiveId] = useState(STEPS[0].id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Builder Installation Process</h1>
        <p className="text-muted-foreground">
          Follow our step-by-step process for professional solar installations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6">
        {/* Sticky stepper (no page push) */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-lg border bg-card p-4">
            <h2 className="font-semibold mb-4">Installation Steps</h2>
            <Stepper
              steps={STEPS}
              activeId={activeId}
              onChange={setActiveId}
              orientation="auto" // vertical on desktop, horizontal on mobile
            />
          </div>
        </aside>

        {/* Fixed-height content panel prevents layout shift */}
        <section className="rounded-2xl border bg-background shadow-sm">
          <div className="h-[min(76vh,900px)] overflow-hidden">
            <StepPanel
              activeKey={activeId}
              items={Object.entries(CONTENT).map(([key, v]) => ({
                key,
                node: (
                  <article className="h-full overflow-auto p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">{v.title}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{v.body}</p>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Key Tasks:</h3>
                      <ul className="space-y-2">
                        {v.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Duration: 2-4 hours</h4>
                      <p className="text-sm text-muted-foreground">
                        This phase typically takes 2-4 hours depending on complexity and site conditions.
                      </p>
                    </div>
                  </article>
                ),
              }))}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

