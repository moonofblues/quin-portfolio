import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";

// Route-level code splitting. HomePage stays eager because it is the landing
// route — lazying it would only add a round trip before first paint.
//
// StudioPage matters most: it pulls in the whole Sanity Studio (~4.5 MB). As a
// static import that shipped in the entry chunk, so every visitor downloaded
// and parsed the CMS before the homepage could become interactive.
const StudioPage = lazy(() =>
  import("./pages/StudioPage").then((m) => ({ default: m.StudioPage })),
);
const WorkPage = lazy(() =>
  import("./pages/WorkPage").then((m) => ({ default: m.WorkPage })),
);
const CaseStudyPage = lazy(() =>
  import("./pages/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage })),
);

/** Neutral placeholder while a route chunk streams in. */
function RouteFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Studio lives outside the portfolio layout — Sanity handles its own auth */}
          <Route
            path="/studio/*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <StudioPage />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <ProjectsProvider>
                <Layout>
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/work" element={<WorkPage />} />
                      <Route
                        path="/work/category/:category"
                        element={<WorkPage />}
                      />
                      <Route path="/work/:slug" element={<CaseStudyPage />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </ProjectsProvider>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
