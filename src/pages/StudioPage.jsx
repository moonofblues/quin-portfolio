import { Studio } from "sanity";
import config from "../../sanity.config";

export function StudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} basePath="/studio" />
    </div>
  );
}
