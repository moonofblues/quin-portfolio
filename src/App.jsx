import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useParams, useSearchParams } from "react-router-dom";
import { ProjectsProvider, useProjects } from "./context/ProjectsContext";
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

// Case study v2 preview (ADR 0011, D14): /work/<slug>?v=2 renders the new
// page while the current one stays the default. Remove this switch, and the
// old page, once v2 is approved.
const CaseStudyPageV2 = lazy(() =>
  import("./pages/CaseStudyPageV2").then((m) => ({ default: m.CaseStudyPageV2 })),
);

// Photo sets (ADR 0013) have their own gallery page. Loaded lazily like the
// others, so the homepage bundle does not grow.
const PhotoSetPage = lazy(() =>
  import("./pages/PhotoSetPage").then((m) => ({ default: m.PhotoSetPage })),
);

function CaseStudyRoute() {
  const [params] = useSearchParams();
  const { slug } = useParams();
  const { getProjectBySlug, loading } = useProjects();
  const card = getProjectBySlug(slug);

  // The project's type is only known once the list has loaded. Until then show
  // the neutral placeholder instead of guessing, so a photo set never flashes
  // the case study page first.
  if (!card && loading) return <RouteFallback />;

  // A photo set always gets the gallery page, with or without ?v=2.
  if (card?.type === "photo-set") return <PhotoSetPage />;

  return params.get("v") === "2" ? <CaseStudyPageV2 /> : <CaseStudyPage />;
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
          <Route
            path="/*"
            element={
              <ProjectsProvider>
                <Layout>
                  <Suspense fallback={<RouteFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/work" element={<WorkPage />} />
                      <Route path="/work/:slug" element={<CaseStudyRoute />} />
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
