require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@sanity/client");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "d441i0yh";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_TOKEN. Create a token with write access and set it in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const docs = [
  {
    _id: "series-salt-shadow",
    _type: "series",
    title: "Salt + Shadow Series",
    description: "A coastal thriller trilogy about memory, guilt, and the sea.",
    order: 1,
  },
  {
    _id: "series-stillwater",
    _type: "series",
    title: "Stillwater Files",
    description: "Two linked investigations that unfold across a resort town.",
    order: 2,
  },
  {
    _id: "book-salt-shadow",
    _type: "book",
    title: "Salt + Shadow",
    slug: { _type: "slug", current: "salt-shadow" },
    blurb: "A coastal psychologist unravels a family’s vanishing past after a body surfaces.",
    series: { _type: "reference", _ref: "series-salt-shadow" },
    seriesOrder: 1,
    order: 1,
  },
  {
    _id: "book-hollow-witness",
    _type: "book",
    title: "The Hollow Witness",
    slug: { _type: "slug", current: "the-hollow-witness" },
    blurb: "A missing juror ties two cold cases together and exposes a courtroom conspiracy.",
    series: { _type: "reference", _ref: "series-salt-shadow" },
    seriesOrder: 2,
    order: 2,
  },
  {
    _id: "book-glass-orchard",
    _type: "book",
    title: "Glass Orchard",
    slug: { _type: "slug", current: "glass-orchard" },
    blurb: "A therapist returns to her hometown and discovers the patient she failed to save.",
    series: { _type: "reference", _ref: "series-salt-shadow" },
    seriesOrder: 3,
    order: 3,
  },
  {
    _id: "book-stillwater-files",
    _type: "book",
    title: "The Stillwater Files",
    slug: { _type: "slug", current: "the-stillwater-files" },
    blurb: "A journalist maps a pattern of disappearances hiding in a quiet resort town.",
    series: { _type: "reference", _ref: "series-stillwater" },
    seriesOrder: 1,
    order: 4,
  },
  {
    _id: "book-night-signal",
    _type: "book",
    title: "Night Signal",
    slug: { _type: "slug", current: "night-signal" },
    blurb: "A late-night radio host receives a call that only her sister could make.",
    series: { _type: "reference", _ref: "series-stillwater" },
    seriesOrder: 2,
    order: 5,
  },
  {
    _id: "book-thirteenth-room",
    _type: "book",
    title: "The Thirteenth Room",
    slug: { _type: "slug", current: "the-thirteenth-room" },
    blurb: "A locked ward’s hidden journal reveals a pact no one was meant to survive.",
    order: 6,
  },
  {
    _id: "book-echoes-glasshouse",
    _type: "book",
    title: "Echoes in the Glasshouse",
    slug: { _type: "slug", current: "echoes-in-the-glasshouse" },
    blurb: "A botanist’s new job reveals a mirror of crimes committed decades earlier.",
    order: 7,
  },
  {
    _id: "service-developmental",
    _type: "service",
    title: "Developmental Edit",
    slug: { _type: "slug", current: "developmental-edit" },
    summary: "Big-picture guidance on structure, character arcs, and momentum.",
    ctaLabel: "Apply for this service",
    order: 1,
  },
  {
    _id: "service-line",
    _type: "service",
    title: "Line Edit",
    slug: { _type: "slug", current: "line-edit" },
    summary: "Sentence-level craft to sharpen tone, clarity, and flow.",
    ctaLabel: "Apply for this service",
    order: 2,
  },
  {
    _id: "service-audit",
    _type: "service",
    title: "Manuscript Audit",
    slug: { _type: "slug", current: "manuscript-audit" },
    summary: "A diagnostic report with prioritized, actionable revisions.",
    ctaLabel: "Apply for this service",
    order: 3,
  },
  {
    _id: "course-finish-draft",
    _type: "course",
    title: "Finish the Draft",
    slug: { _type: "slug", current: "finish-the-draft" },
    summary: "A four-week sprint plan with prompts, checkpoints, and accountability.",
    syllabus: [
      "Week 1: Draft momentum and micro-goals",
      "Week 2: Scene scaffolding and daily targets",
      "Week 3: Midpoint reset and pacing checks",
      "Week 4: Final push and clean handoff",
    ],
    highlights: [
      { label: "Format", value: "4 modules · self-paced" },
      { label: "Support", value: "Weekly check-ins" },
      { label: "Tools", value: "Sprint tracker + prompts" },
    ],
    ctaLabel: "Join the course",
    order: 1,
  },
  {
    _id: "course-revision-roadmap",
    _type: "course",
    title: "Revision Roadmap",
    slug: { _type: "slug", current: "revision-roadmap" },
    summary: "Step-by-step strategies to revise with focus and confidence.",
    syllabus: [
      "Module 1: Diagnosing the draft",
      "Module 2: Structure and arc revisions",
      "Module 3: Character and motivation tuning",
      "Module 4: Scene-level tightening",
      "Module 5: Voice and line-level polish",
      "Module 6: Final pass and submission prep",
    ],
    highlights: [
      { label: "Format", value: "6 modules · self-paced" },
      { label: "Support", value: "Office hours" },
      { label: "Tools", value: "Revision map + checklist" },
    ],
    ctaLabel: "Join the course",
    order: 2,
  },
  {
    _id: "post-20-minute-revision",
    _type: "post",
    title: "The 20-minute revision routine that actually sticks",
    slug: { _type: "slug", current: "20-minute-revision-routine" },
    publishedAt: "2024-04-18T09:00:00Z",
    excerpt: "A lightweight workflow to keep your draft moving without marathon sessions.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder intro for the post summary, key promise, and who it is for.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for the routine breakdown, steps, and how to apply them in a weekly schedule.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for takeaways, a quick recap, and a gentle call to action.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-outline-hate",
    _type: "post",
    title: "How to outline when you hate outlining",
    slug: { _type: "slug", current: "outlining-for-non-outliners" },
    publishedAt: "2024-03-30T09:00:00Z",
    excerpt: "Flexible story scaffolds for writers who want structure without rigidity.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder intro for a flexible outlining approach that keeps discovery writing intact.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for the mindset shift, why outlines can be light-touch, and how to keep creativity alive.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for the actual framework, steps, and an example structure.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-beta-readers",
    _type: "post",
    title: "Finding beta readers who tell the truth",
    slug: { _type: "slug", current: "finding-honest-beta-readers" },
    publishedAt: "2024-03-08T09:00:00Z",
    excerpt: "A simple invite script plus feedback prompts that keep the critique useful.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder intro for recruiting feedback partners who provide useful, actionable critique.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for how to source readers, how many to invite, and what to look for in a good fit.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Placeholder paragraph for the invite script, expectations, and feedback questions.",
          },
        ],
      },
    ],
  },
];

async function seed() {
  console.log("Seeding Sanity dataset:", { projectId, dataset });
  const results = await Promise.all(docs.map((doc) => client.createOrReplace(doc)));
  console.log(`Seeded ${results.length} documents.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
