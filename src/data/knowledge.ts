/**
 * Real articles published by HXHD, taken from the company news archive
 * (news_sitemap.xml, verified 2026-08-09). Titles and dates are as published;
 * `href` points at the original article. Nothing here is invented.
 */

export type ArticleKind = 'Technical' | 'Company';

export interface Article {
  title: string;
  kind: ArticleKind;
  date: string;
  /** ISO date for <time> and sorting. */
  iso: string;
  href: string;
  summary: string;
  topics: string[];
}

const BASE = 'https://www.hxhdchemical.com/news';

export const ARTICLES: Article[] = [
  {
    title: 'Acrylic Emulsion in Architectural Coatings',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/acrylic-emulsion-in-architectural-coatings/`,
    summary:
      'How acrylic emulsions behave as the binder in architectural paint systems, and what that means for durability and finish.',
    topics: ['Architectural', 'Binders'],
  },
  {
    title:
      'What are the Differences Between Silicone-acrylic, Pure Acrylic and Styrene-acrylic Emulsions?',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/what-are-the-differences-between-silicone-acrylic-pure-acrylic-and-styrene-acrylic-emulsions/`,
    summary:
      'A side-by-side comparison of the three main emulsion chemistries and where each is the right specification.',
    topics: ['Selection', 'Chemistry'],
  },
  {
    title: 'What Is The Difference Between Pure Acrylic And Styrene Acrylic (Emulsion)?',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/what-is-the-difference-between-pure-acrylic-and-styrene-acrylic-emulsion/`,
    summary:
      'Weathering, cost and performance trade-offs between pure acrylic and styrene acrylic systems.',
    topics: ['Selection', 'Chemistry'],
  },
  {
    title: 'Differences between water-based acrylic resin and water-based acrylic emulsion',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/differences-between-water-based-acrylic-resin-and-water-based-acrylic-emulsion/`,
    summary:
      'Clarifying two terms that are often used interchangeably but describe different materials.',
    topics: ['Fundamentals'],
  },
  {
    title: 'How is Acrylic Emulsion Produced',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/how-is-acrylic-emulsion-produced/`,
    summary:
      'The emulsion polymerisation route — emulsification, copolymerisation, post-treatment and filling.',
    topics: ['Process', 'Manufacturing'],
  },
  {
    title: 'Introduction of Rust Removal Converter',
    kind: 'Technical',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/introduction-of-rust-removal-converter/`,
    summary:
      'How rust converters turn existing corrosion into a stable primer layer on metal surfaces.',
    topics: ['Anti-corrosion', 'Metal'],
  },
  {
    title: 'The Three-day China Coating Show 2025 Came to a Successful Conclusion',
    kind: 'Company',
    date: '4 Dec 2025',
    iso: '2025-12-04',
    href: `${BASE}/the-three-day-china-coating-show-2025-came-to-a-successful-conclusion/`,
    summary:
      'Hongxing Hongda exhibited its emulsion and waterproofing portfolio across the three-day show.',
    topics: ['Events'],
  },
  {
    title:
      'Hubei Hongxing Hongda production line: 200,000 t/yr water-based emulsion and 5,000 t/yr vinylidene chloride copolymer',
    kind: 'Company',
    date: '3 Dec 2025',
    iso: '2025-12-03',
    href: `${BASE}/hubei-hongxing-hongda-new-materials-co-ltd-production-line-with-annual-output-capacity-of-200-000-tons-of-water-based-emulsion-and-5-000-tons-of-vinylidene-chloride-copolymer/`,
    summary:
      '16 automatic water-based emulsion lines and 4 VDC copolymer lines, with DCS process control and on-site effluent and waste-gas treatment.',
    topics: ['Manufacturing', 'Capacity'],
  },
  {
    title:
      'Hongxing Hongda Cooperates with Keshun Waterproof Technology Co., Ltd',
    kind: 'Company',
    date: '12 Dec 2023',
    iso: '2023-12-12',
    href: `${BASE}/hongxing-hongda-cooperates-with-keshun-waterproof-technology-co-ltd-to-bring-a-new-future-of-the-industry/`,
    summary:
      'Strategic cooperation agreement for in-depth collaboration in the field of waterproof coatings.',
    topics: ['Partnership', 'Waterproofing'],
  },
  {
    title:
      'Hongxing Hongda plans to invest 1.6 billion yuan in new emulsion capacity',
    kind: 'Company',
    date: '15 Jul 2021',
    iso: '2021-07-15',
    href: `${BASE}/hongxing-hongda-plans-to-invest-1-6-billion-yuan-to-build-a-new-emulsion-production-plant-with-output-capacity-510000-tons-year/`,
    summary:
      'CNY 1.1 bn for 400,000 t/yr water-based and 60,000 t/yr butadiene emulsion, plus CNY 500 m for 50,000 t/yr VDC copolymer emulsion.',
    topics: ['Investment', 'Capacity'],
  },
  {
    title: 'Hongxing Hongda Will Establish a New Plant in Bangladesh',
    kind: 'Company',
    date: '8 Jan 2024',
    iso: '2024-01-08',
    href: `${BASE}/hongxing-hongda-will-establish-a-new-plant-in-bangladesh/`,
    summary:
      'USD 76.41 million committed with Mingda for a plant in the BEPZA Economic Zone, Mirsharai, Chattogram, creating 500+ local positions.',
    topics: ['Bangladesh', 'Investment'],
  },
];

export const TECHNICAL_ARTICLES = ARTICLES.filter((a) => a.kind === 'Technical');
export const COMPANY_ARTICLES = ARTICLES.filter((a) => a.kind === 'Company');
