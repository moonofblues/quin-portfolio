import { cn } from "../../utils/cn";

export function Tag({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/15 text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
