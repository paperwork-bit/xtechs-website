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
    author_name: "SolarQuotes Customer",
    rating: 5,
    text:
      "Fantastic installer, friendly salesman and extremely helpful. The sales and quoting process was smooth. The installation went smoothly. The customer service was excellent, polite and punctual. They helped organise the rebate, paper work, and arranged the grid connection after the install.",
    time: Date.now() - 9 * 24 * 60 * 60 * 1000,
    relative_time_description: "recently",
    source: "solarquotes",
  },
  {
    id: "sq-2",
    author_name: "SolarQuotes Customer",
    rating: 5,
    text:
      "Replace this text with a real SolarQuotes review. Tip: keep it under ~400 characters so it fits nicely on mobile.",
    time: Date.now() - 20 * 24 * 60 * 60 * 1000,
    relative_time_description: "recently",
    source: "solarquotes",
  },
  {
    id: "sq-3",
    author_name: "SolarQuotes Customer",
    rating: 5,
    text:
      "Replace this text with a real SolarQuotes review.",
    time: Date.now() - 35 * 24 * 60 * 60 * 1000,
    relative_time_description: "recently",
    source: "solarquotes",
  },
];

