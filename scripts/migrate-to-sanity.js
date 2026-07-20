#!/usr/bin/env node
/**
 * One-time migration: pushes all projects.js data + local images into Sanity.
 *
 * Usage:
 *   SANITY_PROJECT_ID=xxx SANITY_TOKEN=xxx node scripts/migrate-to-sanity.js
 *
 * SANITY_TOKEN must be a write token — create one at:
 *   sanity.io/manage → your project → API → Tokens → Add API token (Editor)
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ASSETS = path.join(__dirname, "../src/assets");

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Cache uploads so the same file isn't uploaded twice
const uploadCache = new Map();

async function uploadAsset(relPath) {
  if (!relPath) return null;
  if (uploadCache.has(relPath)) return uploadCache.get(relPath);

  const filePath = path.join(ASSETS, relPath);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠️  Not found, skipping: ${relPath}`);
    return null;
  }

  const filename = path.basename(filePath);
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploadCache.set(relPath, ref);
  return ref;
}

async function uploadAssets(pathOrPaths) {
  const paths = [pathOrPaths].flat().filter(Boolean);
  const results = await Promise.all(paths.map(uploadAsset));
  return results.filter(Boolean);
}

// Asset path map (variable name → relative path from src/assets/)
const A = {
  hospitalErp:        "hospital-erp.webp",
  zcmcWebsiteDark:    "zcmc-website-hero-dark.webp",
  hospitalDashboard:  "hospital-operations-dashboard.webp",
  leonora:            "leonora-02.webp",
  dusc:               "dusc-website.webp",
  adzuPortalDark:     "adzu-portal.webp",
  gdConverse:         "other-work/gd-converse.webp",
  gdBirthday:         "other-work/birthday.webp",
  gdITannouncement:   "other-work/IT-announcement.webp",
  gdITnews:           "other-work/IT-news.webp",
  gdImissUnification: "other-work/imiss-unification.webp",
  zcmcUmisFeature:    "other-work/zcmc-post-1.webp",
  zcmcFhir:           "other-work/zcmc-post-2.webp",
  zcmcCongrats:       "other-work/zcmc-post-3.webp",
  zcmcHygiene:        "other-work/zcmc-post-4.webp",
  zcmcImissLaunch:    "other-work/zcmc-post-5.webp",
  ffbbLaunch:         "other-work/ffbb-post-1.webp",
  ffbbGraduation:     "other-work/ffbb-post-2.webp",
  ffbbCorentaso:      "other-work/ffbb-post-3.webp",
  ffbbDecember:       "other-work/ffbb-post-4.webp",
  hodSlide1:          "showcase/hod/slide-01.png",
};

// All projects — matches projects.js exactly
const PROJECTS = [
  // ── Case Studies ──────────────────────────────────────────────────────────
  {
    slug: "zcmc-erp-system",
    title: "Planning and Procurement System",
    subtitle: "Enterprise Resource Planning for Healthcare",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 1,
    tags: ["UI/UX Design", "Design System", "Healthcare"],
    thumbnailPath: A.hospitalErp,
    showcasePaths: [],
    description: "Comprehensive enterprise resource planning system for hospital operations. Designed and developed UI workflows, process documentation, and reusable component library.",
    impact: "60% reduction in task completion time",
    year: "2025-2026",
    role: "UI/UX Designer",
    client: "A Medical Center",
    duration: "6 months",
    overview: "The Planning and Procurement System is a digital platform built to replace the heavy, paper-based financial workflows of a major medical center. It brings the hospital's Annual Operational Plans (AOP) and Project Procurement Management Plans (PPMP) online, making it vastly easier for departments to manage their budgets, request resources, and maintain strict audit compliance without the traditional bottlenecks.",
    challenge: "Healthcare procurement involves highly complex, regulation-heavy processes. The primary challenge was converting massive amounts of strict financial data, multi-level approval routing, and inventory tracking into an interface that was intuitive for users of varying technical proficiencies. Beyond the user experience, there was a major technical roadblock. The initial UI drafted by a previous designer relied on deeply nested, multi-step wizard forms to handle the massive amount of required fields. This approach proved incredibly difficult for the engineering team to actually build. Front-end developers struggled with the complex state management required to carry strict financial data and dynamic logic across so many disjointed screens without causing data leaks or performance drops. The system needed a complete structural overhaul to make it both technically feasible for the devs to build, and easy for the end-users to navigate.",
    process: [
      { title: "Systems Audit & Analysis", description: "I evaluated the legacy UI and conducted heuristic evaluations to identify bottlenecks. I discovered that the deeply nested multi-step forms were the root cause of both the engineering team's technical struggles and the end-users' cognitive overload." },
      { title: "Information Architecture & Restructuring", description: "I structurally separated the AOP creation in isolated ways to declutter the workspace and not overwhelm the users. I then redesigned the heavy PPMP interface, replacing tedious circular inputs with familiar, bulk-editable data tables." },
      { title: "Dynamic Logic & Validation", description: "To simplify the UI without losing data integrity, I implemented conditional rendering logic in the AOP modals (hiding irrelevant fields until needed). Finally, I established strict global UX standards for real-time system feedback, ensuring users received immediate success/error modals after every transaction." },
    ],
    solution: "Delivered a cohesive design system with 50+ reusable components, streamlined workflows that reduced average task completion time by 60%, and comprehensive documentation for ongoing development.",
    results: [
      { metric: "60%", label: "Reduction in task time" },
      { metric: "50+", label: "UI components created" },
      { metric: "15+", label: "Systems integrated" },
    ],
    tools: ["Figma", "React", "Tailwind CSS", "Documentation"],
  },
  {
    slug: "zcmc-website-redesign",
    title: "ZCMC Website Redesign",
    subtitle: "Public-Facing Healthcare Website",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 2,
    tags: ["Web Design", "Front-End Dev", "Healthcare"],
    thumbnailPath: A.zcmcWebsiteDark,
    showcasePaths: [],
    description: "Complete redesign of the medical center's public-facing website. Improved information architecture, accessibility, and visual identity while maintaining institutional branding.",
    impact: null,
    year: "2024",
    role: "UI/UX Designer & Developer",
    client: "Zamboanga City Medical Center",
    duration: "6 months",
    overview: "A complete overhaul of the hospital's public website to better serve patients, visitors, and the community with accessible, up-to-date information about services, departments, and health resources.",
    challenge: "The existing website was outdated, difficult to navigate, and not mobile-friendly. Patients struggled to find basic information like department contacts, visiting hours, and available services.",
    process: [
      { title: "Content Audit", description: "Analyzed existing content and identified gaps. Worked with department heads to gather accurate, up-to-date information." },
      { title: "User Research", description: "Surveyed patients and visitors to understand their primary needs when visiting the website. Identified key user journeys." },
      { title: "Visual Design", description: "Created a modern, accessible design that maintains the hospital's institutional identity while feeling welcoming and trustworthy." },
      { title: "Development", description: "Built a responsive, fast-loading website with a focus on accessibility standards (WCAG 2.1)." },
    ],
    solution: "Launched a fully responsive website with improved navigation, accessibility features, and a content management system for easy updates by hospital staff.",
    results: [
      { metric: "100%", label: "Mobile responsive" },
      { metric: "WCAG 2.1", label: "Accessibility compliant" },
      { metric: "3s", label: "Average load time" },
    ],
    tools: ["Figma", "HTML/CSS", "JavaScript", "CMS"],
  },
  {
    slug: "hospital-operations-dashboard",
    title: "Hospital Operations Dashboard",
    subtitle: "Unified Command Center for Healthcare Management",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 3,
    tags: ["UI/UX Design", "Dashboard Design", "Healthcare", "Enterprise"],
    thumbnailPath: A.hospitalDashboard,
    showcasePaths: [A.hodSlide1],
    description: "A centralized operations dashboard unifying 15+ hospital information systems into a single, intuitive interface. Designed to reduce cognitive load for healthcare administrators managing employee records, supply chain, finance, and clinical operations.",
    impact: "60% reduction in task completion time",
    year: "2025",
    role: "UI/UX Designer & Front-End Developer",
    client: "A Medical Center",
    duration: "1 month",
    overview: "This project showcases the design of a centralized operations dashboard unifying fragmented clinical, financial, and logistical data into a single, real-time command center. Built as an overarching enterprise web system, the platform transforms complex institutional metrics into an intuitive, highly scannable interface. By harmonizing these disparate data streams, the dashboard empowers hospital leadership to continuously monitor critical operational health and make swift, data-driven decisions without suffering from reporting fatigue.",
    challenge: "Hospital administrators were navigating between 15+ disconnected systems daily, each with different interfaces, login credentials, and workflows. This fragmentation caused delays in critical operations, increased error rates, and required extensive training for every new system. Staff working in PPE on shared desktop stations needed larger touch targets and clearer visual hierarchy.",
    process: [
      { title: "Adaptive UX Research", description: "Conducted a rigorous deconstruction of the stakeholder-provided executive requirements list. Mapped raw clinical, financial, and logistical metrics to core operational goals to determine exactly which data points were critical for high-level daily hospital management." },
      { title: "Information Architecture", description: "Translated the synthesized data categories into modular wireframes. Reorganized disjointed departmental databases into four logical, highly scannable clusters: Clinical Operations, Claims, Logistics, and Finance—prioritizing spatial memory and visual hierarchy." },
      { title: "Visual Design System", description: "Developed a high-density interface optimized for clinical precision and legibility from a distance. Created a modular card-based layout featuring semantic color-coding (Critical, Low, Normal) and progressive percentage bars to communicate operational health without requiring mental math." },
      { title: "Prototyping & Validation", description: "Presented structural prototypes to executive leadership, which revealed a critical dual-device viewing constraint. Pivoted the UI architecture to seamlessly bridge interactive desktop analysis with a strict 'no-scroll' layout optimized for native Smart TV browsers and remote control navigation." },
    ],
    solution: "A unified, single-screen dashboard that utilizes progressive disclosure to eliminate the traditional sidebar, maximizing horizontal real estate. By introducing a flexible chart/table data toggle and high-contrast semantic status tracking, the design allows executives to instantly spot supply emergencies and operational trends from across the room without ever touching a mouse.",
    results: [
      { metric: "60%", label: "Faster task completion" },
      { metric: "15+", label: "Systems unified" },
      { metric: "0", label: "No login required" },
    ],
    tools: ["Figma", "React", "Tailwind CSS", "Shadcn UI"],
    liveUrl: "https://dashboard.zcmc.online/",
    behanceUrl: "https://www.behance.net/gallery/247033883/Hospital-Operations-Dashboard-UIUX-Case-Study",
  },
  {
    slug: "leonora-financial",
    title: "Leonora",
    subtitle: "Personal Finance & Budget Management App",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 4,
    tags: ["UI/UX Design", "Fintech", "Mobile App", "Live Product"],
    thumbnailPath: A.leonora,
    showcasePaths: [],
    description: "A personal finance application helping users track expenses, manage budgets, and achieve financial goals. Some modules are now live and actively used by real users.",
    impact: "Active users on live modules",
    year: "2024",
    role: "UI/UX Designer & Front-End Developer",
    client: "Startup",
    duration: "1 year",
    overview: "Leonora is a fintech application that empowers users to take control of their finances. The app combines expense tracking, budget management, savings goals, and spending insights into a cohesive mobile-first experience. What started as a design concept has evolved into a live product with active users on core modules.",
    challenge: "Most finance apps overwhelm users with complex charts and endless categorization. Users abandon budgeting tools because they feel like chores rather than helpful companions. The challenge was to design — and ship — an interface that makes financial management feel approachable while providing depth for power users.",
    process: [
      { title: "Competitive Analysis", description: "Analyzed leading fintech apps like Mint, YNAB, and Money Lover to identify UX patterns that work and pain points users commonly report — particularly around onboarding complexity and data overload." },
      { title: "User Flow Mapping", description: "Mapped core user journeys: logging expenses, checking budget status, setting savings goals, and reviewing spending insights. Prioritized reducing taps for the most frequent actions." },
      { title: "Visual Design System", description: "Developed a dark-theme interface with yellow and red accents to convey financial importance to growth and stability. Created a modular component library for consistent implementation across all screens." },
      { title: "Development & Launch", description: "Collaborated with developer to implement core modules. Conducted user testing with early adopters and iterated based on real usage patterns. Successfully launched initial modules to active users." },
    ],
    solution: "Delivered a comprehensive finance app featuring an intuitive dashboard, quick-add expense logging, visual budget progress bars, savings goal tracking, and detailed spending breakdowns. Core modules are now live with real users providing ongoing feedback for iteration.",
    results: [
      { metric: "20+", label: "Screens designed" },
      { metric: "Live", label: "Product status" },
      { metric: "5", label: "Core modules shipped" },
    ],
    tools: ["Figma", "React", "Tailwind CSS", "User Testing"],
    behanceUrl: "https://www.behance.net/gallery/217538059/Leonora-Web-Design-(UIUX)-Financial-App",
  },
  {
    slug: "dusc-landing",
    title: "Desert United Soccer Club",
    subtitle: "Sports Club Website Redesign",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 5,
    tags: ["Web Design", "UI/UX Design", "Sports", "Landing Page"],
    thumbnailPath: A.dusc,
    showcasePaths: [],
    description: "Designed and wireframed a modern, user-friendly website for Desert United Soccer Club to showcase their teams, events, programs, and achievements while improving user navigation and brand consistency.",
    impact: null,
    year: "2024",
    role: "Web Designer & UI/UX Designer",
    client: "Desert United Soccer Club",
    duration: "1 month",
    overview: "Desert United Soccer Club needed a modern website that effectively communicates their club identity, showcases their teams and achievements, and makes it easy for parents and young athletes to learn about programs and sign up. The redesign focused on creating a clean, engaging interface that reflects the club's energetic brand.",
    challenge: "The initial website lacked visual appeal, had poor information hierarchy, and didn't effectively showcase the club's achievements or programs. Navigation was confusing, and the branding felt inconsistent. The client also had concerns about payment processing, timeline flexibility, and ongoing collaboration.",
    process: [
      { title: "Understanding the Needs", description: "Held discussions with the client to clarify requirements, timeline, and brand preferences. Addressed concerns about payment structure, framework flexibility, and developer collaboration." },
      { title: "Design & Wireframing", description: "Created a structured wireframe to outline the site's architecture. Designed multiple pages beyond the initial scope including Teams, Events, Programs, and About — ensuring a cohesive experience." },
      { title: "Visual Design", description: "Developed a bold red and white color scheme matching the club's brand. Implemented modern UI principles for accessibility, responsiveness, and engagement with dynamic imagery of athletes in action." },
      { title: "Client Collaboration", description: "Adapted when the client's situation changed, requiring them to find a developer independently. Maintained professionalism and rapport, ensuring potential future collaboration." },
    ],
    solution: "Delivered a complete website redesign featuring a dynamic hero section, featured achievements showcase, team roster displays, upcoming events calendar, programs breakdown by skill level, and a compelling About section — all with consistent branding and improved navigation.",
    results: [
      { metric: "5+", label: "Pages designed" },
      { metric: "100%", label: "Brand consistency" },
      { metric: "2x", label: "Improved navigation" },
    ],
    tools: ["Figma", "Wireframing", "UI Design"],
    behanceUrl: "https://www.behance.net/gallery/220704165/Soccer-Club-Web-Design-(UIUX-Design)",
  },
  {
    slug: "adzu-institutional-portal",
    title: "AdZU Institutional Portal",
    subtitle: "University Systems Integration",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 6,
    tags: ["UI/UX Design", "Prototyping", "Education"],
    thumbnailPath: A.adzuPortalDark,
    showcasePaths: [],
    description: "Led UI/UX design and prototyping for the university's internal systems portal. Created intuitive interfaces for students, faculty, and administrative staff.",
    impact: null,
    year: "2023-2025",
    role: "Lead UI/UX Designer",
    client: "Ateneo de Zamboanga University",
    duration: "2 years",
    overview: "A unified portal bringing together multiple university systems including enrollment, grades, faculty tools, and administrative functions into a cohesive user experience.",
    challenge: "Students and faculty had to navigate multiple disconnected systems with inconsistent interfaces. This led to confusion, support tickets, and wasted time.",
    process: [
      { title: "Stakeholder Interviews", description: "Met with students, faculty, and administrators to understand their daily workflows and pain points with existing systems." },
      { title: "System Mapping", description: "Documented all existing systems and identified opportunities for integration and workflow improvements." },
      { title: "Prototyping", description: "Created high-fidelity prototypes for key user flows, testing with representative users from each group." },
      { title: "Design Handoff", description: "Delivered comprehensive design specifications and collaborated with developers throughout implementation." },
    ],
    solution: "Created a unified design language and component library that could be applied across all university systems, with role-based dashboards for different user types.",
    results: [
      { metric: "10+", label: "Systems unified" },
      { metric: "300+", label: "Bugs documented" },
      { metric: "3", label: "User role types" },
    ],
    tools: ["Figma", "Prototyping", "User Testing"],
    behanceUrl: "https://www.behance.net/gallery/212850521/Modern-UIUX-Redesign-for-University-Portals",
  },
  {
    slug: "zcmc-ui-library",
    title: "ZCMC Systems UI Library",
    subtitle: "Design System & Component Library",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    status: "published",
    sortOrder: 7,
    tags: ["Design System", "Component Library", "Documentation"],
    thumbnailPath: null,
    showcasePaths: [],
    description: "Developed and standardized reusable design components and patterns for consistent user experience across all hospital information systems.",
    impact: null,
    year: "2024-2025",
    role: "Design System Lead",
    client: "Zamboanga City Medical Center",
    duration: "1 year",
    overview: "A comprehensive design system ensuring visual and functional consistency across all ZCMC digital products, reducing design and development time while improving user experience.",
    challenge: "Multiple teams were building different modules with inconsistent patterns, leading to a fragmented user experience and duplicated development effort.",
    process: [
      { title: "Audit & Inventory", description: "Catalogued all existing UI patterns across systems, identifying inconsistencies and opportunities for standardization." },
      { title: "Token Definition", description: "Established design tokens for colors, typography, spacing, and other foundational elements." },
      { title: "Component Design", description: "Designed reusable components with multiple states, variants, and accessibility considerations." },
      { title: "Documentation", description: "Created comprehensive documentation with usage guidelines, code examples, and best practices." },
    ],
    solution: "Delivered a living design system with 50+ components, design tokens, and documentation that accelerates both design and development workflows.",
    results: [
      { metric: "50+", label: "Components" },
      { metric: "100%", label: "Documented" },
      { metric: "40%", label: "Dev time saved" },
    ],
    tools: ["Figma", "Storybook", "Documentation"],
  },

  // ── Showcase / Other Works ─────────────────────────────────────────────────
  {
    slug: "converse-concept-poster",
    title: "Converse All Star Concept Poster",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 10,
    tags: ["Poster Design", "Advertising", "Print"],
    thumbnailPath: A.gdConverse,
    showcasePaths: [A.gdConverse],
    description: "Concept advertising poster for the Converse Chuck 70, blending archival product photography with torn-paper collage. Presented as a flat print layout and a sidewalk A-frame mockup — a personal piece published under my design handle, qvsions.",
    year: "2023",
  },
  {
    slug: "imiss-birthday-greetings",
    title: "IMISS Birthday Greetings",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 11,
    tags: ["Social Media", "Digital Design", "Events"],
    thumbnailPath: A.gdBirthday,
    showcasePaths: [A.gdBirthday],
    description: "Monthly birthday greeting graphic for Zamboanga City Medical Center's IMISS section, designed around a Philippine calendar motif with celebratory confetti and balloons for the section's official Facebook page.",
    year: "2026",
  },
  {
    slug: "imiss-launch-campaign",
    title: "IMISS Launch Campaign",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 12,
    tags: ["Social Media", "Campaign", "Branding"],
    thumbnailPath: A.zcmcImissLaunch,
    showcasePaths: [A.zcmcImissLaunch, A.gdITannouncement, A.gdImissUnification],
    description: "Four-slide launch carousel introducing ZCMC's new Integrated Management Information System Section (IMISS) — announcing the merger of the IISU and IHOMP units, the services under one roof, and how staff can reach the section.",
    year: "2024",
    fbPostUrl: "https://www.facebook.com/zcmcimiss/posts/pfbid0rYFLxcuoTfyGTBpiMgxibH6gxSa6qd3ZtWtU1Nm6FPtzbYEs2S5tNeHLRGy8ugscl?rdid=EoGAYn4R3EU3vIeP#",
  },
  {
    slug: "imiss-it-news-series",
    title: "IT News Series",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 13,
    tags: ["Social Media", "Infographics", "Editorial"],
    thumbnailPath: A.gdITnews,
    showcasePaths: [A.gdITnews],
    description: "Social media news card series covering technology topics for ZCMC's IMISS section — this issue highlights a report on AI-driven cyber attacks outpacing traditional enterprise defenses.",
    year: "2024",
  },
  {
    slug: "umis-feature-highlights",
    title: "UMIS Feature Highlights",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 14,
    tags: ["Social Media", "Carousel", "Tech"],
    thumbnailPath: A.zcmcUmisFeature,
    showcasePaths: [A.zcmcUmisFeature],
    description: "System-feature carousel for ZCMC's User Management Information System (UMIS), walking hospital staff through tracking their DTR and flag ceremony attendance online — from daily logs to exporting full attendance history.",
    year: "2026",
    fbPostUrl: "https://www.facebook.com/zcmcimiss/posts/pfbid02Upj7c2es9PW5QN7zJBAXYUbKHUfVqyTXG8jhEdQdy1Z5gtNrn2vSAz9F1YXVWCg4l",
  },
  {
    slug: "fhir-2026-connectathon",
    title: "FHIR 2026 Connectathon Highlights",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 15,
    tags: ["Social Media", "Event Coverage", "Photo Layout"],
    thumbnailPath: A.zcmcFhir,
    showcasePaths: [A.zcmcFhir],
    description: "Event highlights carousel for ZCMC IMISS at the FHIR 2026 Connectathon in Boracay, combining event photography with branded layouts to showcase the team's interoperable referral system.",
    year: "2026",
    fbPostUrl: "https://www.facebook.com/zcmcimiss/posts/pfbid0e7nibcvb1SNP7gy25TTJh758yR7jPKMBSfFYFpsHQmVuidVYgJvBjjJ8CcwyvfHLl",
  },
  {
    slug: "civil-service-congratulations",
    title: "Civil Service Congratulations Post",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 16,
    tags: ["Social Media", "Recognition", "Photo Manipulation"],
    thumbnailPath: A.zcmcCongrats,
    showcasePaths: [A.zcmcCongrats],
    description: "Gamified 'achievement unlocked' congratulations graphic celebrating an IMISS team member passing the Civil Service Examination, styled as a system-update HUD with cut-out portrait treatment.",
    year: "2026",
    fbPostUrl: "https://www.facebook.com/zcmcimiss/posts/pfbid0RvDXQXzn6q9mhdnPmsWQFpaiLDGSSasQecm4SwY5qQ6ugup3bXsUcuUEf9k6h9Eul",
  },
  {
    slug: "social-media-hygiene-tech-tip",
    title: "Social Media Hygiene Tech Tip",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 17,
    tags: ["Social Media", "Infographics", "Cybersecurity"],
    thumbnailPath: A.zcmcHygiene,
    showcasePaths: [A.zcmcHygiene],
    description: "Cybersecurity awareness carousel for ZCMC's IMISS Tech Tip series — a practical checklist on account security at work, from spotting suspicious messages to enabling multi-factor authentication.",
    year: "2026",
    fbPostUrl: "https://www.facebook.com/zcmcimiss/posts/pfbid096yExiDMm2PYDF5Pcc9QL6NBAXNN2WbMfAj4WvytCR9MMfiUK342j5AxJC2X1Gxhl?rdid=i9OTe6N67v9d6th8#",
  },
  {
    slug: "fuzzy-fleur-launch-giveaway",
    title: "Fuzzy Fleur Launch & Giveaway",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 18,
    tags: ["Social Media", "Branding", "Small Business"],
    thumbnailPath: A.ffbbLaunch,
    showcasePaths: [A.ffbbLaunch],
    description: "'Blooming Soon' teaser and in-store giveaway announcement for Fuzzy Fleur by Bia, an artisan crochet flower and gift shop — elegant serif typography over a soft floral illustration system.",
    year: "2026",
    fbPostUrl: "https://www.facebook.com/fuzzyfleur.bybia/posts/pfbid0mHzH2kabBo44AswNcwVevi3JX1n44LpoxVoDFdAppvP8gEVrdacZ9GYMzPrqnFYQl?rdid=ZXaAfnSOt8w9f8iN#",
  },
  {
    slug: "fuzzy-fleur-graduation-campaign",
    title: "Fuzzy Fleur Graduation Campaign",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 19,
    tags: ["Social Media", "Campaign", "Product Photography"],
    thumbnailPath: A.ffbbGraduation,
    showcasePaths: [A.ffbbGraduation],
    description: "'Celebrate Graduation' campaign for Fuzzy Fleur by Bia's Class of 2026 collection, pairing envelope-motif layouts with product photography of handmade crochet bouquets and graduation flower pins.",
    year: "2026",
  },
  {
    slug: "fuzzy-fleur-corentaso-popup",
    title: "Corentaso Pop-up Booth Poster",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 20,
    tags: ["Social Media", "Poster Design", "Illustration"],
    thumbnailPath: A.ffbbCorentaso,
    showcasePaths: [A.ffbbCorentaso],
    description: "Illustrated announcement poster for Fuzzy Fleur by Bia's pop-up booth at Ateneo de Zamboanga University's Corentaso fair, building a festive campus-market scene with string lights and event mascots.",
    year: "2026",
  },
  {
    slug: "fuzzy-fleur-december-events",
    title: "December Pop-ups & Events",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    status: "published",
    sortOrder: 21,
    tags: ["Social Media", "Layout Design", "Events"],
    thumbnailPath: A.ffbbDecember,
    showcasePaths: [A.ffbbDecember],
    description: "Holiday schedule graphic for Fuzzy Fleur by Bia's December pop-ups, organizing school events and mall dates across Zamboanga into a festive envelope-invitation layout.",
    year: "2025",
  },
];

async function migrate() {
  console.log(`\n🚀 Migrating ${PROJECTS.length} projects to Sanity...\n`);

  for (const p of PROJECTS) {
    process.stdout.write(`  → ${p.title} ... `);

    try {
      const thumbnail = await uploadAsset(p.thumbnailPath);
      const showcaseImages = await uploadAssets(p.showcasePaths || []);

      const { thumbnailPath, showcasePaths, ...fields } = p;

      await client.create({
        _type: "project",
        ...fields,
        slug: { _type: "slug", current: p.slug },
        ...(thumbnail && { thumbnail }),
        ...(showcaseImages.length > 0 && {
          showcaseImages: showcaseImages.map((img, i) => ({
            _key: `showcase_${i}`,
            ...img,
          })),
        }),
        process: (p.process || []).map((step, i) => ({
          _key: `step_${i}`,
          ...step,
        })),
        results: (p.results || []).map((r, i) => ({
          _key: `result_${i}`,
          ...r,
        })),
      });

      console.log("✓");
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }

  console.log("\n✅ Migration complete!\n");
}

migrate().catch(console.error);
