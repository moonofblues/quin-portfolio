import { ExternalLink } from "lucide-react";

// Behance's own embed only accepts a numeric project id, extracted from the
// gallery URL an editor pastes in Studio (e.g. .../gallery/217538059/Name).
// If a URL doesn't match (typo, wrong link type), we fall back to a plain
// outbound link rather than rendering a broken iframe — see ADR 0010.
function behanceProjectId(url) {
  const match = url?.match(/behance\.net\/gallery\/(\d+)/i);
  return match ? match[1] : null;
}

// Breaks out of the page's max-w-7xl section to full viewport width by
// measuring from the viewport (100vw) rather than the parent container, then
// pulling itself back so it stays centred. See ADR 0010.
//
// 100vw counts the scrollbar's width, so this is ~15px wider than the visible
// page on desktop; `overflow-x: clip` on `body` (index.css) absorbs the
// difference. `clip` rather than `hidden` on purpose — `hidden` would turn the
// body into a scroll container and break sticky positioning and Lenis.
//
// No rounded corners: at full bleed they'd sit at the viewport edge where
// they can't be seen. The iframe inside keeps its own rounding.
function FullBleed({ children }) {
  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-bg-secondary p-4 md:p-8">
      {children}
    </div>
  );
}

// Height note: `h-[min(80vh,900px)]` — tall enough to fill most of a laptop
// screen, capped so it doesn't become an absurd wall of iframe on a large
// monitor. It is spelled out literally at both call sites below rather than
// shared through a constant: Tailwind generates CSS by scanning the source for
// whole class names, so a name assembled at runtime produces no styles at all.

function BehanceEmbed({ url, title }) {
  const projectId = behanceProjectId(url);

  if (!projectId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-accent hover:underline"
      >
        View on Behance
        <ExternalLink size={16} />
      </a>
    );
  }

  return (
    <FullBleed>
      <iframe
        src={`https://www.behance.net/embed/project/${projectId}?ilo0=1`}
        className="block w-full h-[min(80vh,900px)] rounded-xl border-0"
        allowFullScreen
        loading="lazy"
        allow="clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title || "Behance project"}
      />
    </FullBleed>
  );
}

function FacebookEmbed({ url, title }) {
  return (
    <div className="flex justify-center overflow-x-auto rounded-2xl bg-bg-secondary p-4 md:p-8">
      <iframe
        src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
          url,
        )}&show_text=true&width=500`}
        width="500"
        height="720"
        className="max-w-full overflow-hidden rounded-xl border-0 bg-white"
        scrolling="no"
        loading="lazy"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={title || "Facebook post"}
      />
    </div>
  );
}

// embedCode is only ever entered by the site owner in Sanity Studio, so
// dangerouslySetInnerHTML here isn't a public-input risk.
//
// Platforms ship their snippets at a hardcoded thumbnail size — Behance's is
// `width="404" height="316"` — which left the frame as a small box adrift in a
// wide card. The `[&_iframe]:*` rules restyle whatever iframe the snippet
// contains so it fills the full-bleed card instead. CSS beats the width/height
// HTML attributes, so the pasted numbers are ignored without editing the
// snippet. Deliberate trade-off: a custom embed that *wants* to be small (a
// narrow social widget, say) gets stretched too — see ADR 0010.
function CustomEmbed({ embedCode }) {
  return (
    <FullBleed>
      <div
        className="[&_iframe]:block [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:h-[min(80vh,900px)] [&_iframe]:rounded-xl [&_iframe]:border-0"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </FullBleed>
  );
}

export function ProjectEmbeds({ embeds }) {
  if (!embeds?.length) return null;

  return (
    <div className="space-y-8">
      {embeds.map((embed, i) => (
        <div key={i}>
          {embed.title && (
            <h3 className="font-display text-sm uppercase tracking-wider mb-3 text-text-muted">
              {embed.title}
            </h3>
          )}
          {embed.platform === "behance" && embed.url && (
            <BehanceEmbed url={embed.url} title={embed.title} />
          )}
          {embed.platform === "facebook" && embed.url && (
            <FacebookEmbed url={embed.url} title={embed.title} />
          )}
          {embed.platform === "custom" && embed.embedCode && (
            <CustomEmbed embedCode={embed.embedCode} />
          )}
        </div>
      ))}
    </div>
  );
}
