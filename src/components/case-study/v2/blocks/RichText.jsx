import { PortableText } from "@portabletext/react";
import { cn } from "../../../../utils/cn";

// Mirrors the schema's minimal toolbar (portableText in caseStudyBlocks.js):
// paragraphs, bold, italic, links and lists. Headings never come from here.
function makeComponents(paragraphClass) {
  return {
    block: {
      normal: ({ children }) => <p className={paragraphClass}>{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className={cn(paragraphClass, "list-disc pl-6 space-y-2")}>{children}</ul>
      ),
      number: ({ children }) => (
        <ol className={cn(paragraphClass, "list-decimal pl-6 space-y-2")}>{children}</ol>
      ),
    },
    listItem: ({ children }) => <li className="pl-1">{children}</li>,
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-text-primary">{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      link: ({ value, children }) => {
        const external = /^https?:/.test(value?.href ?? "");
        return (
          <a
            href={value?.href}
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-[text-decoration-color] duration-200"
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {children}
          </a>
        );
      },
    },
  };
}

const COMPONENTS = {
  lg: makeComponents("text-lg leading-[1.75] text-text-secondary"),
  base: makeComponents("text-base leading-[1.7] text-text-secondary"),
};

export function RichText({ value, size = "lg", className }) {
  if (!value?.length) return null;
  return (
    // 68ch keeps lines in the comfortable 65-75 character range.
    <div className={cn("max-w-[68ch]", size === "lg" ? "space-y-6" : "space-y-4", className)}>
      <PortableText value={value} components={COMPONENTS[size]} />
    </div>
  );
}
