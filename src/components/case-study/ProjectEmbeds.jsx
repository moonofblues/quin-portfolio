import { ExternalLink } from "lucide-react";

// Behance's own embed only accepts a numeric project id, extracted from the
// gallery URL an editor pastes in Studio (e.g. .../gallery/217538059/Name).
// If a URL doesn't match (typo, wrong link type), we fall back to a plain
// outbound link rather than rendering a broken iframe — see ADR 0010.
function behanceProjectId(url) {
  const match = url?.match(/behance\.net\/gallery\/(\d+)/i);
  return match ? match[1] : null;
}

// Always renders full viewport width — breaks out of the page's max-w-7xl
// section by measuring from the viewport rather than the parent container.
// See ADR 0010.
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
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 rounded-2xl bg-bg-secondary p-4 md:p-8">
      <div className="flex justify-center">
        <iframe
          src={`https://www.behance.net/embed/project/${projectId}?ilo0=1`}
          height={720}
          width="100%"
          className="max-w-full rounded-xl border-0"
          allowFullScreen
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title || "Behance project"}
        />
      </div>
    </div>
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
function CustomEmbed({ embedCode }) {
  return (
    <div
      className="flex justify-center overflow-x-auto rounded-2xl bg-bg-secondary p-4 md:p-8"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
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
