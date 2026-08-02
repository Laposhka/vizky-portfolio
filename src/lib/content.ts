/**
 * Every piece of copy on the site lives here.
 * Edit this file to make the portfolio yours — no component changes needed.
 */

export const site = {
  name: "Vizky Sanzani",
  initials: "VS",
  role: "Software Engineer",
  // Rotated in the hero, one after another.
  roles: ["Software Engineer", "Full-stack Developer", "Systems Thinker"],
  location: "Tokyo, Japan",
  email: "vizky.sanzani@aalda.co.jp",
  tagline: "I build fast, resilient products for the web.",
  intro:
    "I design and ship end-to-end systems — from database schema to the last pixel. Currently focused on developer tooling, performance, and interfaces that feel instant.",
  available: true,
  availableLabel: "Available for new work",
  url: "https://example.com",
} as const;

/** Bittensor account shown in the About section. */
export const wallet = {
  address: "5GerVWPyRTZsSgrDmVRnSUD1FBMbwentCzHJqkJfQKmz58ra",
  label: "Bittensor wallet",
  explorer: "https://taostats.io/account",
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  { label: "X", href: "https://x.com/yourhandle" },
] as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Go",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
];

export const about = {
  paragraphs: [
    "I'm a software engineer with a bias for shipping. Most of my work sits where product meets infrastructure: the API that has to stay up, the query that has to stay fast, the interface that has to stay obvious.",
    "Before this I spent years in early-stage teams where the job description was whatever was broken that week — which turned out to be the best possible training. I like small teams, tight feedback loops, and code that a new hire can read on day one.",
    "Outside of work you'll find me tinkering with synthesizers, reading about distributed systems, and slowly failing to keep my espresso setup reasonable.",
  ],
  facts: [
    { label: "Based in", value: site.location },
    { label: "Experience", value: "6+ years" },
    { label: "Focus", value: "Product & platform" },
    { label: "Open to", value: "Full-time / contract" },
  ],
};

export type Project = {
  title: string;
  year: string;
  blurb: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
  /** Two hex stops used for the card's accent gradient. */
  gradient: [string, string];
};

export const projects: Project[] = [
  {
    title: "Orbit",
    year: "2026",
    blurb: "Realtime collaboration platform",
    description:
      "A multiplayer workspace with CRDT-backed documents, presence, and offline sync. Cut p95 sync latency from 800ms to 60ms by moving conflict resolution to the edge.",
    tags: ["TypeScript", "Next.js", "WebSockets", "Postgres"],
    href: "https://example.com",
    repo: "https://github.com/yourhandle/orbit",
    featured: true,
    gradient: ["#67e8f9", "#a78bfa"],
  },
  {
    title: "Ledgerline",
    year: "2025",
    blurb: "Double-entry payments ledger",
    description:
      "An append-only ledger service handling 40M+ entries with strict consistency guarantees. Designed the reconciliation engine and the audit trail that finance actually trusts.",
    tags: ["Go", "Postgres", "gRPC", "Kubernetes"],
    repo: "https://github.com/yourhandle/ledgerline",
    featured: true,
    gradient: ["#a78bfa", "#f472b6"],
  },
  {
    title: "Pulse",
    year: "2025",
    blurb: "Observability for small teams",
    description:
      "Self-hostable metrics and tracing with a query language people can hold in their head. Ingests 2B spans/month on three modest nodes.",
    tags: ["Rust", "ClickHouse", "React"],
    href: "https://example.com",
    gradient: ["#34d399", "#67e8f9"],
  },
  {
    title: "Draftsman",
    year: "2024",
    blurb: "Schema-driven form builder",
    description:
      "Turns a JSON schema into an accessible, validated, fully typed React form. Used across a dozen internal tools to delete about 15k lines of bespoke form code.",
    tags: ["React", "TypeScript", "Zod"],
    repo: "https://github.com/yourhandle/draftsman",
    gradient: ["#fbbf24", "#f472b6"],
  },
  {
    title: "Nightshift",
    year: "2024",
    blurb: "Distributed job scheduler",
    description:
      "Cron-compatible scheduler with exactly-once semantics, backpressure, and a dead-letter queue you can actually replay from.",
    tags: ["Go", "Redis", "Terraform"],
    gradient: ["#60a5fa", "#a78bfa"],
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Aalda",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    location: "Tokyo",
    summary:
      "Lead engineer on the platform team, owning the services everything else is built on.",
    highlights: [
      "Rebuilt the core API on a typed contract layer, cutting integration bugs by roughly 70%.",
      "Drove a migration to incremental static rendering that took median page load from 2.4s to 0.6s.",
      "Set up the CI pipeline and review culture the team still runs on.",
    ],
    stack: ["TypeScript", "Next.js", "Go", "Postgres", "AWS"],
  },
  {
    company: "Northbound Labs",
    role: "Software Engineer",
    period: "2021 — 2023",
    location: "Remote",
    summary:
      "Third engineering hire at a seed-stage startup; built product and infrastructure in equal measure.",
    highlights: [
      "Shipped the first paid product from empty repo to 5,000 monthly active users.",
      "Designed the multi-tenant data model that carried the company through Series A.",
      "Introduced end-to-end testing, dropping production regressions to near zero.",
    ],
    stack: ["React", "Node.js", "Postgres", "Docker"],
  },
  {
    company: "Kite Interactive",
    role: "Frontend Developer",
    period: "2020 — 2021",
    location: "Jakarta",
    summary:
      "Built interfaces for client products across e-commerce and media.",
    highlights: [
      "Delivered a component library adopted across six client projects.",
      "Brought Lighthouse accessibility scores from the 60s to consistent 95+.",
    ],
    stack: ["React", "TypeScript", "Sass"],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Rust", "SQL", "Python"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Testing Library", "Playwright"],
  },
  {
    group: "Backend",
    items: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "gRPC", "Kafka"],
  },
  {
    group: "Platform",
    items: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions"],
  },
];
