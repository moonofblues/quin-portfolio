// Renders pasted <iframe> embed codes (Behance, YouTube, Figma, etc.) —
// used instead of uploading images when the work already lives on another
// site. The embedCode field is only ever entered by the site owner in
// Sanity Studio, so dangerouslySetInnerHTML here isn't a public-input risk.
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
          <div
            className="flex justify-center rounded-2xl p-4 md:p-8 bg-bg-secondary overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: embed.embedCode }}
          />
        </div>
      ))}
    </div>
  );
}
