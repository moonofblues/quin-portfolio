import { defineConfig, devices } from "@playwright/test";

// End-to-end tests drive the real site in a browser. They read live content
// from Sanity, so they need the same .env.local the dev server uses.
//
// Results: the console list, a JSON file kept in test-reports/ (committed), and
// an HTML report in playwright-report/ (not committed).
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-reports/latest.json" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    // The site opens with a loader and plays arrival animations (ADR 0020). The
    // tests check the finished page, which is exactly what reduced motion shows.
    // A test about the motion itself turns it back on with page.emulateMedia.
    reducedMotion: "reduce",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Reuses a dev server that is already running; starts one otherwise.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
