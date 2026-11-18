import { Navigate, Route, Routes } from "react-router-dom";
import { VisualLayout } from "./VisualLayout";
import { VisualHome } from "./VisualHome";

/**
 * The Visual experience (ADR 0014), mounted at /visual/* by App.jsx.
 *
 * Rule: nothing in this folder imports from the Product code (src/components,
 * src/pages, src/data). It may use src/shared and neutral assets.
 */
export function VisualApp() {
  return (
    <VisualLayout>
      <Routes>
        <Route index element={<VisualHome />} />
        {/* Photo set and film pages arrive in plan steps 4 and 6. */}
        <Route path="*" element={<Navigate to="/visual" replace />} />
      </Routes>
    </VisualLayout>
  );
}
