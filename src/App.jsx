import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { WorkPage } from "./pages/WorkPage";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { StudioPage } from "./pages/StudioPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Studio lives outside the portfolio layout — Sanity handles its own auth */}
          <Route path="/studio/*" element={<StudioPage />} />
          <Route
            path="/*"
            element={
              <ProjectsProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/work" element={<WorkPage />} />
                    <Route path="/work/category/:category" element={<WorkPage />} />
                    <Route path="/work/:slug" element={<CaseStudyPage />} />
                  </Routes>
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
