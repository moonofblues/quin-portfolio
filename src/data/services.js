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
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
  {
    id: "front-end",
    label: "Front-End Development",
    description: "Front-end engineering and component-level work",
    icon: Code,
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
  {
    id: "web-dev",
    label: "Web Development",
    description: "Websites and web applications",
    icon: Smartphone,
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
  {
    id: "low-code",
    label: "Low-Code / No-Code",
    description: "Low-code and no-code solutions",
    icon: Wand2,
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
  {
    id: "graphic-design",
    label: "Graphic Design",
    description: "Branding, print, and visual design",
    icon: Layers,
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
  {
    id: "video",
    label: "Video Editing",
    description: "Video editing and motion graphics",
    icon: Video,
    heroHeadline: null,
    heroDescription: null,
    heroTags: [],
  },
];

// O(1) lookup by id — used by CaseStudyPage, OtherWork, and the Focused hero.
export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s]));
