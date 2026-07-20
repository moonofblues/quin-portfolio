import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectSchema } from "./src/sanity/schema/project";

export default defineConfig({
  name: "quin-portfolio",
  title: "Quin Portfolio",
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [projectSchema],
  },
});
