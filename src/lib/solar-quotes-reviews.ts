// Curated SolarQuotes reviews shown on the homepage slider.
//
// SolarQuotes doesn't provide a stable public API for installer reviews in this project,
// so we store 3 hand-curated testimonials here. Replace the placeholder entries with
// your real SolarQuotes reviews.

export interface SolarQuotesReview {
  id: string;
  author_name: string;
  rating: number; // usually 5
  text: string;
  time: number; // unix ms
  relative_time_description: string;
  source: "solarquotes";
}

export const solarQuotesReviews: SolarQuotesReview[] = [
  {
    id: "sq-1",
    // Replace with the real customer name as shown on SolarQuotes
    author_name: "Chris W.",
    rating: 5,
    text:
      "Fantastic installer, friendly salesman and extremely helpful. The sales and quoting process was smooth. The installation went smoothly. The customer service was excellent, polite and punctual. They helped organise the rebate, paper work, and arranged the grid connection after the install.",
    // Use a fixed date so it always displays the correct review date
    time: Date.parse("2026-01-14T00:00:00+11:00"),
    relative_time_description: "14 January 2026",
    source: "solarquotes",
  },
  {
    id: "sq-2",
    author_name: "Amelia K.",
    rating: 5,
    text:
      "Replace this text with a real SolarQuotes review. Tip: keep it under ~400 characters so it fits nicely on mobile.",
    time: Date.parse("2026-01-03T00:00:00+11:00"),
    relative_time_description: "03 January 2026",
    source: "solarquotes",
  },
  {
    id: "sq-3",
    author_name: "Priya N.",
    rating: 5,
    text:
      "Replace this text with a real SolarQuotes review.",
    time: Date.parse("2025-12-10T00:00:00+11:00"),
    relative_time_description: "10 December 2025",
    source: "solarquotes",
  },
];

