import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

/** Shown for any Product address that matches no route. */
export function NotFoundPage() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <title>Page not found | Quin Ledesma</title>
      <meta name="robots" content="noindex" />
      <div className="text-center px-6">
        <h1 className="font-display text-2xl mb-4 text-text-primary">
          No page at this address
        </h1>
        <p className="mb-6 text-text-secondary">
          It may have moved, or the link has a typo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/work">
            <Button>Back to Work</Button>
          </Link>
          <Link to="/">
            <Button variant="ghost">Main page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
