import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route, useParams } from "react-router-dom";
import { ProjectsProvider, useProjects } from "./shared/context/ProjectsContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { HubPage } from "./hub/HubPage";

// Route-level code splitting. The hub (/) and the Product homepage (/dev) stay
// eager: the hub is the landing page, and /dev is where résumé and LinkedIn
// links go, so lazying it would add a round trip for exactly the hiring
// managers it is meant for.
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

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

// Case study v2 (ADR 0011) is the default page for case studies. The old
// CaseStudyPage is kept only for Showcase-type projects until that branch is
// moved out of it.
const CaseStudyPageV2 = lazy(() =>
  import("./pages/CaseStudyPageV2").then((m) => ({ default: m.CaseStudyPageV2 })),
);

// The Visual experience (ADR 0014) is its own lazy chunk with its own layout
// and stylesheet, so the homepage bundle does not grow.
const VisualApp = lazy(() =>
  import("./experiences/visual/VisualApp").then((m) => ({ default: m.VisualApp })),
);

function CaseStudyRoute() {
  const { slug } = useParams();
  const { getProjectBySlug, loading } = useProjects();
  const card = getProjectBySlug(slug);

  // The project's type is only known once the list has loaded. Until then show
  // the neutral placeholder instead of guessing, so a photo set never flashes
  // the case study page first.
  if (!card && loading) return <RouteFallback />;

  // Photo sets and films live in the Visual experience (ADR 0014, 0015). Links
  // shared as /work/<slug> keep working by redirecting to the new address.
  if (card?.type === "photo-set" || card?.type === "film") {
    return <Navigate to={`/visual/${slug}`} replace />;
  }

  // Showcase projects keep the old page; everything else gets v2.
  if (card?.type === "showcase") return <CaseStudyPage />;

  return <CaseStudyPageV2 />;
}

/** Neutral placeholder while a route chunk streams in. */
function RouteFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

function App() {
  return (
    <BrowserRouter>
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
          {/* The portfolio hub (ADR 0016): its own screen, outside both
              Experiences' layouts. */}
          <Route
            path="/"
            element={
              <ProjectsProvider>
                <HubPage />
              </ProjectsProvider>
            }
          />
          {/* The contact sheet hero used to live here while it was a prototype.
              It is the hub's hero now, so old /sheet links go to the hub. */}
          <Route path="/sheet" element={<Navigate to="/" replace />} />
          {/* Visual has its own layout, so it sits outside the Product Layout. */}
          <Route
            path="/visual/*"
            element={
              <ProjectsProvider>
                <Suspense fallback={<RouteFallback />}>
                  <VisualApp />
                </Suspense>
              </ProjectsProvider>
            }
          />
          <Route
            path="/*"
            element={
              <ProjectsProvider>
                <Layout>
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/dev" element={<HomePage />} />
                      <Route path="/work" element={<WorkPage />} />
                      <Route path="/work/:slug" element={<CaseStudyRoute />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </ProjectsProvider>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
