import { Palette, Code, Smartphone, Layers, Video, Wand2 } from "lucide-react";

// Single source of truth for the Service taxonomy (Phase 6, ADR 0008).
// Drives: Focus chooser, Focused hero, work filter, and What I Do pills.
// heroHeadline / heroDescription / heroTags are populated in Phase 6 step 3
// once Quin supplies the per-Focus copy — leave null until then.
export const SERVICES = [
  {
    id: "ui-ux",
    label: "UI/UX Design",
    description: "User interface and experience design",
    icon: Palette,
    heroHeadline: "Interfaces That *Reduce Friction* and *Drive Results*",
    heroDescription:
      "I've designed hospital systems used by 500+ healthcare workers daily. My approach: research-driven decisions, not guesswork — resulting in 60% faster task completion and significantly fewer user errors.",
    heroTags: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Healthcare UX",
    ],
  },
  {
    id: "front-end",
    label: "Front-End Development",
    description: "Front-end engineering and component-level work",
    icon: Code,
    heroHeadline: "Clean Code That Scales With Your Product",
    heroDescription:
      "I don't just design — I build. From reusable component libraries to pixel-perfect implementations, I deliver production-ready code that your dev team can actually maintain.",
    heroTags: [
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Component Libraries",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    id: "web-dev",
    label: "Web Development",
    description: "Websites and web applications",
    icon: Smartphone,
    heroHeadline: "Websites Built for *Performance* and *Conversion*",
    heroDescription:
      "Fast load times, mobile-first design, and SEO best practices baked in from day one. I build sites that don't just look good — they rank well and convert visitors into users.",
    heroTags: [
      "React",
      "Next.js",
      "Vite",
      "CMS Integration",
      "Performance Optimization",
      "SEO",
    ],
  },
  {
    id: "low-code",
    label: "Low-Code / No-Code",
    description: "Low-code and no-code solutions",
    icon: Wand2,
    heroHeadline: "Launch in Days, Not Months",
    heroDescription:
      "Need an MVP fast? Internal tool on a tight budget? I leverage low-code platforms to ship functional products quickly — without sacrificing quality or user experience.",
    heroTags: [
      "Webflow",
      "Framer",
      "Notion",
      "Airtable",
      "Rapid Prototyping",
      "MVP Development",
    ],
  },
  {
    id: "graphic-design",
    label: "Graphic Design",
    description: "Branding, print, and visual design",
    icon: Layers,
    heroHeadline: "Visuals That *Communicate*, Not Just Decorate",
    heroDescription:
      "10+ years of design experience — from brand identities to marketing collateral. I create visuals that align with brand strategy and actually move the needle on engagement.",
    heroTags: [
      "Brand Identity",
      "Print Design",
      "Social Media Graphics",
      "Presentation Design",
      "Marketing Collateral",
    ],
  },
  {
    id: "video",
    label: "Video Editing",
    description: "Video editing and motion graphics",
    icon: Video,
    heroHeadline: "Video Content That Captures and Converts",
    heroDescription:
      "Promotional videos, event highlights, explainer content — edited with purpose. Clean pacing, intentional motion graphics, and deliverables optimized for your target platform.",
    heroTags: [
      "Video Editing",
      "Motion Graphics",
      "Promotional Videos",
      "Event Coverage",
      "Social Media Content",
    ],
  },
];

// O(1) lookup by id — used by CaseStudyPage, OtherWork, and the Focused hero.
export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

// Parses *marked* segments in a headline string into alternating plain/gradient parts.
// "Hello *World* today" → [{text:"Hello ", gradient:false}, {text:"World", gradient:true}, ...]
// Segments with no text (e.g. leading/trailing "*") are filtered out.
export function parseHeadline(str) {
  if (!str) return [];
  return str
    .split("*")
    .map((part, i) => ({ text: part, gradient: i % 2 === 1 }))
    .filter((p) => p.text);
}
