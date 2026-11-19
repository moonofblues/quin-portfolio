// Each experience loads different fonts, so the caller names them.
function joinNames(names) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** One line crediting the typefaces and tools behind the page. */
export function Colophon({ fonts, className }) {
  return (
    <p className={className}>
      Set in {joinNames(fonts)}. Built with React, Vite and Tailwind. Content
      in Sanity.
    </p>
  );
}
