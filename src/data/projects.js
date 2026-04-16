import zcmcWebsiteDark from "../assets/zcmc-website-hero-dark.png";
import adzuPortalDark from "../assets/adzu-portal.png";
import leonora from "../assets/leonora-02.png";
import dusc from "../assets/dusc-website.png";
import hospitalDashboard from "../assets/hospital-operations-dashboard.png";
import hospitalErp from "../assets/hospital-erp.png";
import gdConverse from "../assets/other-work/gd-converse.png";
import gdBirthday from "../assets/other-work/birthday.png";
import gdITannouncement from "../assets/other-work/IT-announcement.png";
import gdITnews from "../assets/other-work/IT-news.png";
// Get only showcase projects (for Other Works section)
export function getOtherWorkProjects() {
  return projects.filter(
    (p) => p.category !== "ui-ux" && p.type === "showcase",
  );
}
// All projects data
export const projects = [
  // Featured Case Studies
  {
    id: "zcmc-erp",
    slug: "zcmc-erp-system",
    title: "ZCMC ERP System",
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
      "The ZCMC ERP System is a comprehensive hospital information system designed to streamline administrative and clinical operations. As the lead UI/UX designer and front-end developer, I was responsible for creating intuitive interfaces that reduced cognitive load for healthcare workers.",
    challenge:
      "Healthcare workers were spending excessive time navigating complex legacy systems, leading to inefficiencies and potential errors. The existing system lacked consistency, had poor information hierarchy, and required extensive training for new staff.",
    process: [
      {
        title: "Research & Discovery",
        description:
          "Conducted user interviews with nurses, doctors, and administrative staff. Shadowed workflows to understand pain points and inefficiencies in the existing system.",
      },
      {
        title: "Information Architecture",
        description:
          "Restructured the navigation and information hierarchy based on task frequency and user mental models. Created user flows for critical processes like patient registration and inventory management.",
      },
      {
        title: "Design System Creation",
        description:
          "Developed a comprehensive UI library with reusable components, ensuring consistency across all modules. Established design tokens for colors, typography, and spacing.",
      },
      {
        title: "Prototyping & Testing",
        description:
          "Created interactive prototypes and conducted usability testing with actual hospital staff. Iterated based on feedback to optimize task completion times.",
      },
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
      "ZCMC needed a unified command center to replace fragmented legacy systems scattered across multiple platforms. Healthcare administrators were juggling 15+ separate applications daily — from employee management to supply chain to financial reporting. I designed and developed a centralized dashboard that brings all critical hospital operations into one cohesive interface, enabling faster decision-making and reducing the learning curve for new staff.",
    challenge:
      "Hospital administrators were navigating between 15+ disconnected systems daily, each with different interfaces, login credentials, and workflows. This fragmentation caused delays in critical operations, increased error rates, and required extensive training for every new system. Staff working in PPE on shared desktop stations needed larger touch targets and clearer visual hierarchy.",
    process: [
      {
        title: "User Research & Shadowing",
        description:
          "Conducted contextual interviews with nurses, administrators, and department heads. Shadowed daily workflows to identify which systems were accessed most frequently and where bottlenecks occurred. Discovered that 80% of tasks involved just 5 core modules.",
      },
      {
        title: "Information Architecture",
        description:
          "Mapped all 15+ systems and reorganized them into logical clusters: Employee Management, Supply Chain & Inventory, Finance & Budgeting, and Clinical Operations. Prioritized placement based on usage frequency and task urgency.",
      },
      {
        title: "Visual Design System",
        description:
          "Created a dark-theme interface optimized for long work sessions and reducing eye strain. Developed a modular card-based layout with consistent iconography, color-coded categories, and clear typography hierarchy using the hospital's brand colors.",
      },
      {
        title: "Prototyping & Validation",
        description:
          "Built interactive Figma prototypes and tested with actual hospital staff on their workstation monitors. Iterated on card sizes, button placement, and navigation patterns based on feedback from users wearing PPE gloves.",
      },
    ],
    solution:
      "Delivered a unified operations dashboard featuring a modular card-based interface, role-based access views, and one-click navigation to all hospital systems. The design includes a dark theme for reduced eye strain, large touch targets for PPE accessibility, and a consistent visual language across all modules.",
    results: [
      { metric: "60%", label: "Faster task completion" },
      { metric: "15+", label: "Systems unified" },
      { metric: "0", label: "No login required" },
    ],
    images: [],
    tools: ["Figma", "React", "Tailwind CSS", "Shadcn UI"],
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
          "Developed a dark-theme interface with green accents to convey financial growth and stability. Created a modular component library for consistent implementation across all screens.",
      },
      {
        title: "Development & Launch",
        description:
          "Collaborated with developers to implement core modules. Conducted user testing with early adopters and iterated based on real usage patterns. Successfully launched initial modules to active users.",
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
    id: "brand-identity-1",
    slug: "brand-identity-system",
    title: "Brand Identity System",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Branding", "Logo Design", "Identity"],
    thumbnail: gdConverse,
    description:
      "Complete brand identity system including logo, color palette, typography, and brand guidelines.",
    year: "2023",
    images: gdConverse,
  },
  {
    id: "event-posters",
    slug: "event-poster-series",
    title: "Event Poster Series",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Print Design", "Posters", "Events"],
    thumbnail: gdBirthday,
    description:
      "A series of event posters designed for university and community events.",
    year: "2023",
    images: gdBirthday,
  },
  {
    id: "social-media-kit",
    slug: "social-media-kit",
    title: "Social Media Kit",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Social Media", "Digital Design", "Templates"],
    thumbnail: null,
    description:
      "Comprehensive social media template kit for consistent brand presence across platforms.",
    year: "2024",
    images: [],
  },
  {
    id: "infographic-design",
    slug: "infographic-design",
    title: "Infographic Design",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Infographics", "Data Visualization", "Print"],
    thumbnail: gdITnews,
    description:
      "Educational and informational infographics for healthcare and academic contexts.",
    year: "2024",
    images: gdITnews,
  },
  {
    id: "infographic-design",
    slug: "infographic-design",
    title: "Infographic Design",
    category: "graphic-design",
    type: "showcase",
    featured: false,
    tags: ["Infographics", "Data Visualization", "Print"],
    thumbnail: gdITannouncement,
    description:
      "Educational and informational infographics for healthcare and academic contexts.",
    year: "2024",
    images: gdITannouncement,
  },

  // Other Works - Video
  {
    id: "promo-video-1",
    slug: "promotional-video",
    title: "Promotional Video",
    category: "video",
    type: "showcase",
    featured: false,
    tags: ["Video Editing", "Motion Graphics", "Promotional"],
    thumbnail: null,
    description:
      "Promotional video content for institutional and commercial purposes.",
    year: "2023",
    videoUrl: null,
    images: [],
  },
  {
    id: "product-demo",
    slug: "product-demo-video",
    title: "Product Demo Video",
    category: "video",
    type: "showcase",
    featured: false,
    tags: ["Video Editing", "Demo", "Tutorial"],
    thumbnail: null,
    description:
      "Product demonstration and tutorial video with motion graphics.",
    year: "2024",
    videoUrl: null,
    images: [],
  },
  {
    id: "event-coverage",
    slug: "event-coverage",
    title: "Event Coverage",
    category: "video",
    type: "showcase",
    featured: false,
    tags: ["Videography", "Event", "Editing"],
    thumbnail: null,
    description:
      "Event documentation and highlight reels for various occasions.",
    year: "2024",
    videoUrl: null,
    images: [],
  },

  // Other Works - Web Development
  {
    id: "ecommerce-landing",
    slug: "ecommerce-landing-page",
    title: "E-commerce Landing Page",
    category: "web-dev",
    type: "showcase",
    featured: false,
    tags: ["Web Development", "Landing Page", "E-commerce"],
    thumbnail: null,
    description: "High-converting landing page design for e-commerce products.",
    year: "2024",
    images: [],
    liveUrl: null,
  },
  {
    id: "dashboard-ui",
    slug: "dashboard-interface",
    title: "Dashboard Interface",
    category: "web-dev",
    type: "showcase",
    featured: false,
    tags: ["Dashboard", "React", "Data Visualization"],
    thumbnail: null,
    description:
      "Administrative dashboard with complex data visualization components.",
    year: "2024",
    images: [],
  },
  {
    id: "mobile-app-proto",
    slug: "mobile-app-prototype",
    title: "Mobile App Prototype",
    category: "ui-ux",
    type: "showcase",
    featured: false,
    tags: ["Mobile", "Prototype", "UI/UX"],
    thumbnail: null,
    description: "Interactive mobile app prototype with user flow animations.",
    year: "2024",
    images: [],
  },
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
