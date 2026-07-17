import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.webp";
import adzuPortalDark from "../assets/adzu-portal.webp";
import leonora from "../assets/leonora-02.webp";
import dusc from "../assets/dusc-website.webp";
import hospitalDashboard from "../assets/hospital-operations-dashboard.webp";
import hospitalErp from "../assets/hospital-erp.webp";
import gdConverse from "../assets/other-work/gd-converse.webp";
import gdBirthday from "../assets/other-work/birthday.webp";
import gdITannouncement from "../assets/other-work/IT-announcement.webp";
import gdITnews from "../assets/other-work/IT-news.webp";
import gdImissUnification from "../assets/other-work/imiss-unification.webp";
import zcmcUmisFeature from "../assets/other-work/zcmc-post-1.webp";
import zcmcFhir from "../assets/other-work/zcmc-post-2.webp";
import zcmcCongrats from "../assets/other-work/zcmc-post-3.webp";
import zcmcHygiene from "../assets/other-work/zcmc-post-4.webp";
import zcmcImissLaunch from "../assets/other-work/zcmc-post-5.webp";
import ffbbLaunch from "../assets/other-work/ffbb-post-1.webp";
import ffbbGraduation from "../assets/other-work/ffbb-post-2.webp";
import ffbbCorentaso from "../assets/other-work/ffbb-post-3.webp";
import ffbbDecember from "../assets/other-work/ffbb-post-4.webp";
// Get only showcase projects (for Other Works section)
export function getOtherWorkProjects() {
  return projects.filter((p) => p.type === "showcase");
}
// All projects data
export const projects = [
  // Featured Case Studies
  {
    id: "zcmc-erp",
    slug: "zcmc-erp-system",
    title: "Planning and Procurement System",
    subtitle: "Enterprise Resource Planning for Healthcare",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["UI/UX Design", "Design System", "Healthcare"],
    thumbnail: hospitalErp,
    description:
      "Comprehensive enterprise resource planning system for hospital operations. Designed and developed UI workflows, process documentation, and reusable component library.",
    impact: "60% reduction in task completion time",
    year: "2023-2025",
    role: "UI/UX Designer & Front-End Developer",
    client: "Zamboanga City Medical Center",
    duration: "2 years",
    overview:
      "The Planning and Procurement System is a comprehensive enterprise application designed to digitize, strictly regulate, and streamline the financial and procurement workflows of a major medical center. By transforming manual Annual Operational Plans (AOP) and Project Procurement Management Plans (PPMP) into a centralized digital pipeline, the system ensures hospital resources are properly planned, budgeted, and dispersed while maintaining absolute compliance and auditability.",
    challenge:
      "Healthcare procurement involves highly complex, regulation-heavy processes. The primary challenge was converting massive amounts of strict financial data, multi-level approval routing, and inventory tracking into an interface that was intuitive for users of varying technical proficiencies. <br>Beyond the user experience, there was a major technical roadblock. The initial UI drafted by a previous designer relied on deeply nested, multi-step wizard forms to handle the massive amount of required fields. This approach proved incredibly difficult for the engineering team to actually build. Front-end developers struggled with the complex state management required to carry strict financial data and dynamic logic across so many disjointed screens without causing data leaks or performance drops. The system needed a complete structural overhaul to make it both technically feasible for the devs to build, and easy for the end-users to navigate.",
    process: [
      {
        title: "Systems Audit & Analysis",
        description:
          "I evaluated the legacy UI and conducted heuristic evaluations to identify bottlenecks. I discovered that the deeply nested multi-step forms were the root cause of both the engineering team's technical struggles and the end-users' cognitive overload.",
      },
      {
        title: "Information Architecture & Restructuring",
        description:
          "I structurally separated the administrative 'Master Item Library' from the 'End-User Requests' to prevent security risks and declutter the workspace. I then redesigned the heavy PPMP scheduling interface, replacing tedious circular inputs with familiar, bulk-editable data tables.",
      },
      {
        title: "Dynamic Logic & Validation",
        description:
          "To simplify the UI without losing data integrity, I implemented conditional rendering logic in the AOP modals (hiding irrelevant fields until needed). Finally, I established strict global UX standards for real-time system feedback, ensuring users received immediate success/error modals after every transaction.s",
      },
      // {
      //   title: "Prototyping & Testing",
      //   description:
      //     "Created interactive prototypes and conducted usability testing with actual hospital staff. Iterated based on feedback to optimize task completion times.",
      // },
    ],
    solution:
      "Delivered a cohesive design system with 50+ reusable components, streamlined workflows that reduced average task completion time by 60%, and comprehensive documentation for ongoing development.",
    results: [
      { metric: "60%", label: "Reduction in task time" },
      { metric: "50+", label: "UI components created" },
      { metric: "15+", label: "Systems integrated" },
    ],
    images: [],
    tools: ["Figma", "React", "Tailwind CSS", "Documentation"],
  },
  {
    id: "zcmc-website",
    slug: "zcmc-website-redesign",
    title: "ZCMC Website Redesign",
    subtitle: "Public-Facing Healthcare Portal",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["Web Design", "Front-End Dev", "Healthcare"],
    thumbnail: zcmcWebsiteDark,
    description:
      "Complete redesign of the medical center's public-facing website. Improved information architecture, accessibility, and visual identity while maintaining institutional branding.",
    impact: null,
    year: "2024",
    role: "UI/UX Designer & Developer",
    client: "Zamboanga City Medical Center",
    duration: "6 months",
    overview:
      "A complete overhaul of the hospital's public website to better serve patients, visitors, and the community with accessible, up-to-date information about services, departments, and health resources.",
    challenge:
      "The existing website was outdated, difficult to navigate, and not mobile-friendly. Patients struggled to find basic information like department contacts, visiting hours, and available services.",
    process: [
      {
        title: "Content Audit",
        description:
          "Analyzed existing content and identified gaps. Worked with department heads to gather accurate, up-to-date information.",
      },
      {
        title: "User Research",
        description:
          "Surveyed patients and visitors to understand their primary needs when visiting the website. Identified key user journeys.",
      },
      {
        title: "Visual Design",
        description:
          "Created a modern, accessible design that maintains the hospital's institutional identity while feeling welcoming and trustworthy.",
      },
      {
        title: "Development",
        description:
          "Built a responsive, fast-loading website with a focus on accessibility standards (WCAG 2.1).",
      },
    ],
    solution:
      "Launched a fully responsive website with improved navigation, accessibility features, and a content management system for easy updates by hospital staff.",
    results: [
      { metric: "100%", label: "Mobile responsive" },
      { metric: "WCAG 2.1", label: "Accessibility compliant" },
      { metric: "3s", label: "Average load time" },
    ],
    images: [],
    tools: ["Figma", "HTML/CSS", "JavaScript", "CMS"],
  },
  {
    id: "hospital-operations-dashboard",
    slug: "hospital-operations-dashboard",
    title: "Hospital Operations Dashboard",
    subtitle: "Unified Command Center for Healthcare Management",
    category: "ui-ux",
    type: "case-study",
    featured: true,

    tags: ["UI/UX Design", "Dashboard Design", "Healthcare", "Enterprise"],
    thumbnail: hospitalDashboard,
    description:
      "A centralized operations dashboard unifying 15+ hospital information systems into a single, intuitive interface. Designed to reduce cognitive load for healthcare administrators managing employee records, supply chain, finance, and clinical operations.",
    impact: "60% reduction in task completion time",
    year: "2023-2025",
    role: "UI/UX Designer & Front-End Developer",
    client: "Zamboanga City Medical Center",
    duration: "2 years",
    overview:
      "This project showcases the design of a centralized operations dashboard unifying fragmented clinical, financial, and logistical data into a single, real-time command center. Built as an overarching enterprise web system, the platform transforms complex institutional metrics into an intuitive, highly scannable interface. By harmonizing these disparate data streams, the dashboard empowers hospital leadership to continuously monitor critical operational health and make swift, data-driven decisions without suffering from reporting fatigue.",
    challenge:
      "Hospital administrators were navigating between 15+ disconnected systems daily, each with different interfaces, login credentials, and workflows. This fragmentation caused delays in critical operations, increased error rates, and required extensive training for every new system. Staff working in PPE on shared desktop stations needed larger touch targets and clearer visual hierarchy.",
    process: [
      {
        title: "Adaptive UX Research",
        description:
          "Conducted a rigorous deconstruction of the stakeholder-provided executive requirements list. Mapped raw clinical, financial, and logistical metrics to core operational goals to determine exactly which data points were critical for high-level daily hospital management.",
      },
      {
        title: "Information Architecture",
        description:
          "Translated the synthesized data categories into modular wireframes. Reorganized disjointed departmental databases into four logical, highly scannable clusters: Clinical Operations, Claims, Logistics, and Finance—prioritizing spatial memory and visual hierarchy.",
      },
      {
        title: "Visual Design System",
        description:
          "Developed a high-density interface optimized for clinical precision and legibility from a distance. Created a modular card-based layout featuring semantic color-coding (Critical, Low, Normal) and progressive percentage bars to communicate operational health without requiring mental math.",
      },
      {
        title: "Prototyping & Validation",
        description:
          "Presented structural prototypes to executive leadership, which revealed a critical dual-device viewing constraint. Pivoted the UI architecture to seamlessly bridge interactive desktop analysis with a strict 'no-scroll' layout optimized for native Smart TV browsers and remote control navigation.",
      },
    ],
    solution:
      "A unified, single-screen dashboard that utilizes progressive disclosure to eliminate the traditional sidebar, maximizing horizontal real estate. By introducing a flexible chart/table data toggle and high-contrast semantic status tracking, the design allows executives to instantly spot supply emergencies and operational trends from across the room without ever touching a mouse.",
    results: [
      { metric: "60%", label: "Faster task completion" },
      { metric: "15+", label: "Systems unified" },
      { metric: "0", label: "No login required" },
    ],
    images: [],
    tools: ["Figma", "React", "Tailwind CSS", "Shadcn UI"],
    liveUrl: "https://dashboard.zcmc.online/",
    behanceUrl:
      "https://www.behance.net/gallery/247033883/Hospital-Operations-Dashboard-UIUX-Case-Study",
  },
  {
    id: "leonora-financial",
    slug: "leonora-financial",
    title: "Leonora",
    subtitle: "Personal Finance & Budget Management App",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["UI/UX Design", "Fintech", "Mobile App", "Live Product"],
    thumbnail: leonora,
    description:
      "A personal finance application helping users track expenses, manage budgets, and achieve financial goals. Some modules are now live and actively used by real users.",
    impact: "Active users on live modules",
    year: "2024",
    role: "UI/UX Designer & Front-End Developer",
    client: "Product Development",
    duration: "6 months",
    overview:
      "Leonora is a fintech application that empowers users to take control of their finances. The app combines expense tracking, budget management, savings goals, and spending insights into a cohesive mobile-first experience. What started as a design concept has evolved into a live product with active users on core modules.",
    challenge:
      "Most finance apps overwhelm users with complex charts and endless categorization. Users abandon budgeting tools because they feel like chores rather than helpful companions. The challenge was to design — and ship — an interface that makes financial management feel approachable while providing depth for power users.",
    process: [
      {
        title: "Competitive Analysis",
        description:
          "Analyzed leading fintech apps like Mint, YNAB, and Money Lover to identify UX patterns that work and pain points users commonly report — particularly around onboarding complexity and data overload.",
      },
      {
        title: "User Flow Mapping",
        description:
          "Mapped core user journeys: logging expenses, checking budget status, setting savings goals, and reviewing spending insights. Prioritized reducing taps for the most frequent actions.",
      },
      {
        title: "Visual Design System",
        description:
          "Developed a dark-theme interface with yellow and red accents to convey financial importance to growth and stability. Created a modular component library for consistent implementation across all screens.",
      },
      {
        title: "Development & Launch",
        description:
          "Collaborated with developer to implement core modules. Conducted user testing with early adopters and iterated based on real usage patterns. Successfully launched initial modules to active users.",
      },
    ],
    solution:
      "Delivered a comprehensive finance app featuring an intuitive dashboard, quick-add expense logging, visual budget progress bars, savings goal tracking, and detailed spending breakdowns. Core modules are now live with real users providing ongoing feedback for iteration.",
    results: [
      { metric: "20+", label: "Screens designed" },
      { metric: "Live", label: "Product status" },
      { metric: "5", label: "Core modules shipped" },
    ],
    images: [],
    tools: ["Figma", "React", "Tailwind CSS", "User Testing"],
    behanceUrl:
      "https://www.behance.net/gallery/217538059/Leonora-Web-Design-(UIUX)-Financial-App",
  },
  {
    id: "dusc-landing",
    slug: "dusc-landing",
    title: "Desert United Soccer Club",
    subtitle: "Sports Club Website Redesign",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["Web Design", "UI/UX Design", "Sports", "Landing Page"],
    thumbnail: dusc,
    description:
      "Designed and wireframed a modern, user-friendly website for Desert United Soccer Club to showcase their teams, events, programs, and achievements while improving user navigation and brand consistency.",
    impact: null,
    year: "2024",
    role: "Web Designer & UI/UX Designer",
    client: "Desert United Soccer Club",
    duration: "1 month",
    overview:
      "Desert United Soccer Club needed a modern website that effectively communicates their club identity, showcases their teams and achievements, and makes it easy for parents and young athletes to learn about programs and sign up. The redesign focused on creating a clean, engaging interface that reflects the club's energetic brand.",
    challenge:
      "The initial website lacked visual appeal, had poor information hierarchy, and didn't effectively showcase the club's achievements or programs. Navigation was confusing, and the branding felt inconsistent. The client also had concerns about payment processing, timeline flexibility, and ongoing collaboration.",
    process: [
      {
        title: "Understanding the Needs",
        description:
          "Held discussions with the client to clarify requirements, timeline, and brand preferences. Addressed concerns about payment structure, framework flexibility, and developer collaboration.",
      },
      {
        title: "Design & Wireframing",
        description:
          "Created a structured wireframe to outline the site's architecture. Designed multiple pages beyond the initial scope including Teams, Events, Programs, and About — ensuring a cohesive experience.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a bold red and white color scheme matching the club's brand. Implemented modern UI principles for accessibility, responsiveness, and engagement with dynamic imagery of athletes in action.",
      },
      {
        title: "Client Collaboration",
        description:
          "Adapted when the client's situation changed, requiring them to find a developer independently. Maintained professionalism and rapport, ensuring potential future collaboration.",
      },
    ],
    solution:
      "Delivered a complete website redesign featuring a dynamic hero section, featured achievements showcase, team roster displays, upcoming events calendar, programs breakdown by skill level, and a compelling About section — all with consistent branding and improved navigation.",
    results: [
      { metric: "5+", label: "Pages designed" },
      { metric: "100%", label: "Brand consistency" },
      { metric: "2x", label: "Improved navigation" },
    ],
    images: [],
    tools: ["Figma", "Wireframing", "UI Design"],
    behanceUrl:
      "https://www.behance.net/gallery/220704165/Soccer-Club-Web-Design-(UIUX-Design)",
  },
  {
    id: "adzu-portal",
    slug: "adzu-institutional-portal",
    title: "AdZU Institutional Portal",
    subtitle: "University Systems Integration",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["UI/UX Design", "Prototyping", "Education"],
    thumbnail: adzuPortalDark,
    description:
      "Led UI/UX design and prototyping for the university's internal systems portal. Created intuitive interfaces for students, faculty, and administrative staff.",
    impact: null,
    year: "2023-2025",
    role: "Lead UI/UX Designer",
    client: "Ateneo de Zamboanga University",
    duration: "2 years",
    overview:
      "A unified portal bringing together multiple university systems including enrollment, grades, faculty tools, and administrative functions into a cohesive user experience.",
    challenge:
      "Students and faculty had to navigate multiple disconnected systems with inconsistent interfaces. This led to confusion, support tickets, and wasted time.",
    process: [
      {
        title: "Stakeholder Interviews",
        description:
          "Met with students, faculty, and administrators to understand their daily workflows and pain points with existing systems.",
      },
      {
        title: "System Mapping",
        description:
          "Documented all existing systems and identified opportunities for integration and workflow improvements.",
      },
      {
        title: "Prototyping",
        description:
          "Created high-fidelity prototypes for key user flows, testing with representative users from each group.",
      },
      {
        title: "Design Handoff",
        description:
          "Delivered comprehensive design specifications and collaborated with developers throughout implementation.",
      },
    ],
    solution:
      "Created a unified design language and component library that could be applied across all university systems, with role-based dashboards for different user types.",
    results: [
      { metric: "10+", label: "Systems unified" },
      { metric: "300+", label: "Bugs documented" },
      { metric: "3", label: "User role types" },
    ],
    images: [],
    tools: ["Figma", "Prototyping", "User Testing"],
    behanceUrl:
      "https://www.behance.net/gallery/212850521/Modern-UIUX-Redesign-for-University-Portals",
  },
  {
    id: "zcmc-ui-library",
    slug: "zcmc-ui-library",
    title: "ZCMC Systems UI Library",
    subtitle: "Design System & Component Library",
    category: "ui-ux",
    type: "case-study",
    featured: true,
    tags: ["Design System", "Component Library", "Documentation"],
    thumbnail: null,
    description:
      "Developed and standardized reusable design components and patterns for consistent user experience across all hospital information systems.",
    impact: null,
    year: "2024-2025",
    role: "Design System Lead",
    client: "Zamboanga City Medical Center",
    duration: "1 year",
    overview:
      "A comprehensive design system ensuring visual and functional consistency across all ZCMC digital products, reducing design and development time while improving user experience.",
    challenge:
      "Multiple teams were building different modules with inconsistent patterns, leading to a fragmented user experience and duplicated development effort.",
    process: [
      {
        title: "Audit & Inventory",
        description:
          "Catalogued all existing UI patterns across systems, identifying inconsistencies and opportunities for standardization.",
      },
      {
        title: "Token Definition",
        description:
          "Established design tokens for colors, typography, spacing, and other foundational elements.",
      },
      {
        title: "Component Design",
        description:
          "Designed reusable components with multiple states, variants, and accessibility considerations.",
      },
      {
        title: "Documentation",
        description:
          "Created comprehensive documentation with usage guidelines, code examples, and best practices.",
      },
    ],
    solution:
      "Delivered a living design system with 50+ components, design tokens, and documentation that accelerates both design and development workflows.",
    results: [
      { metric: "50+", label: "Components" },
      { metric: "100%", label: "Documented" },
      { metric: "40%", label: "Dev time saved" },
    ],
    images: [],
    tools: ["Figma", "Storybook", "Documentation"],
  },

  // Other Works - Graphic Design
  {
    id: "converse-poster",
    slug: "converse-concept-poster",
    title: "Converse All Star Concept Poster",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Poster Design", "Advertising", "Print"],
    thumbnail: gdConverse,
    description:
      "Concept advertising poster for the Converse Chuck 70, blending archival product photography with torn-paper collage. Presented as a flat print layout and a sidewalk A-frame mockup — a personal piece published under my design handle, qvsions.",
    year: "2023",
    images: gdConverse,
  },
  {
    id: "imiss-birthday-greetings",
    slug: "imiss-birthday-greetings",
    title: "IMISS Birthday Greetings",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Digital Design", "Events"],
    thumbnail: gdBirthday,
    description:
      "Monthly birthday greeting graphic for Zamboanga City Medical Center's IMISS section, designed around a Philippine calendar motif with celebratory confetti and balloons for the section's official Facebook page.",
    year: "2026",
    images: gdBirthday,
  },
  {
    id: "imiss-launch-campaign",
    slug: "imiss-launch-campaign",
    title: "IMISS Launch Campaign",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Campaign", "Branding"],
    thumbnail: zcmcImissLaunch,
    description:
      "Four-slide launch carousel introducing ZCMC's new Integrated Management Information System Section (IMISS) — announcing the merger of the IISU and IHOMP units, the services under one roof, and how staff can reach the section.",
    year: "2024",
    images: [zcmcImissLaunch, gdITannouncement, gdImissUnification],
  },
  {
    id: "imiss-it-news",
    slug: "imiss-it-news-series",
    title: "IT News Series",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Infographics", "Editorial"],
    thumbnail: gdITnews,
    description:
      "Social media news card series covering technology topics for ZCMC's IMISS section — this issue highlights a report on AI-driven cyber attacks outpacing traditional enterprise defenses.",
    year: "2024",
    images: gdITnews,
  },
  {
    id: "zcmc-umis-feature",
    slug: "umis-feature-highlights",
    title: "UMIS Feature Highlights",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Carousel", "Tech"],
    thumbnail: zcmcUmisFeature,
    description:
      "System-feature carousel for ZCMC's User Management Information System (UMIS), walking hospital staff through tracking their DTR and flag ceremony attendance online — from daily logs to exporting full attendance history.",
    year: "2026",
    images: zcmcUmisFeature,
  },
  {
    id: "zcmc-fhir-2026",
    slug: "fhir-2026-connectathon",
    title: "FHIR 2026 Connectathon Highlights",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Event Coverage", "Photo Layout"],
    thumbnail: zcmcFhir,
    description:
      "Event highlights carousel for ZCMC IMISS at the FHIR 2026 Connectathon in Boracay, combining event photography with branded layouts to showcase the team's interoperable referral system.",
    year: "2026",
    images: zcmcFhir,
  },
  {
    id: "zcmc-cse-congrats",
    slug: "civil-service-congratulations",
    title: "Civil Service Congratulations Post",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Recognition", "Photo Manipulation"],
    thumbnail: zcmcCongrats,
    description:
      "Gamified 'achievement unlocked' congratulations graphic celebrating an IMISS team member passing the Civil Service Examination, styled as a system-update HUD with cut-out portrait treatment.",
    year: "2026",
    images: zcmcCongrats,
  },
  {
    id: "zcmc-tech-tip-hygiene",
    slug: "social-media-hygiene-tech-tip",
    title: "Social Media Hygiene Tech Tip",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Infographics", "Cybersecurity"],
    thumbnail: zcmcHygiene,
    description:
      "Cybersecurity awareness carousel for ZCMC's IMISS Tech Tip series — a practical checklist on account security at work, from spotting suspicious messages to enabling multi-factor authentication.",
    year: "2026",
    images: zcmcHygiene,
  },
  {
    id: "ffbb-launch-giveaway",
    slug: "fuzzy-fleur-launch-giveaway",
    title: "Fuzzy Fleur Launch & Giveaway",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Branding", "Small Business"],
    thumbnail: ffbbLaunch,
    description:
      "'Blooming Soon' teaser and in-store giveaway announcement for Fuzzy Fleur by Bia, an artisan crochet flower and gift shop — elegant serif typography over a soft floral illustration system.",
    year: "2026",
    images: ffbbLaunch,
  },
  {
    id: "ffbb-graduation",
    slug: "fuzzy-fleur-graduation-campaign",
    title: "Fuzzy Fleur Graduation Campaign",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Campaign", "Product Photography"],
    thumbnail: ffbbGraduation,
    description:
      "'Celebrate Graduation' campaign for Fuzzy Fleur by Bia's Class of 2026 collection, pairing envelope-motif layouts with product photography of handmade crochet bouquets and graduation flower pins.",
    year: "2026",
    images: ffbbGraduation,
  },
  {
    id: "ffbb-corentaso",
    slug: "fuzzy-fleur-corentaso-popup",
    title: "Corentaso Pop-up Booth Poster",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Poster Design", "Illustration"],
    thumbnail: ffbbCorentaso,
    description:
      "Illustrated announcement poster for Fuzzy Fleur by Bia's pop-up booth at Ateneo de Zamboanga University's Corentaso fair, building a festive campus-market scene with string lights and event mascots.",
    year: "2026",
    images: ffbbCorentaso,
  },
  {
    id: "ffbb-december-events",
    slug: "fuzzy-fleur-december-events",
    title: "December Pop-ups & Events",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Layout Design", "Events"],
    thumbnail: ffbbDecember,
    description:
      "Holiday schedule graphic for Fuzzy Fleur by Bia's December pop-ups, organizing school events and mall dates across Zamboanga into a festive envelope-invitation layout.",
    year: "2025",
    images: ffbbDecember,
  },

  // Other Works — Video, Web Dev, and UI/UX showcase entries are coming soon
  // (assets still being organized); re-add them here once files are ready.
];

// Category definitions
export const categories = [
  {
    id: "all",
    label: "All Work",
    description: "Browse all projects across disciplines",
  },
  {
    id: "ui-ux",
    label: "UI/UX Design",
    description: "User interface and experience design projects",
    color: "#c9a96e",
  },
  {
    id: "web-dev",
    label: "Web Development",
    description: "Websites and web applications",
    color: "#4a9eff",
  },
  {
    id: "graphic-design",
    label: "Graphic Design",
    description: "Branding, print, and visual design",
    color: "#ff6b6b",
  },
  {
    id: "video",
    label: "Video",
    description: "Video editing and motion graphics",
    color: "#9b59b6",
  },
];

// Helper functions
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(categoryId) {
  if (categoryId === "all") return projects;
  return projects.filter((p) => p.category === categoryId);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getCaseStudies() {
  return projects.filter((p) => p.type === "case-study");
}

export function getShowcaseProjects() {
  return projects.filter((p) => p.type === "showcase");
}

export function getRelatedProjects(currentSlug, limit = 3) {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];

  return projects
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

export function getNextPrevProjects(currentSlug) {
  const caseStudies = getCaseStudies();
  const currentIndex = caseStudies.findIndex((p) => p.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? caseStudies[currentIndex - 1] : null,
    next:
      currentIndex < caseStudies.length - 1
        ? caseStudies[currentIndex + 1]
        : null,
  };
}
