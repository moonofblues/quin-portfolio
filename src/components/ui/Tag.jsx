import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

export function Tag({ children, className }) {
  const { theme } = useTheme();

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        theme === "light"
          ? "bg-[#b8954f]/15 text-accent"
          : "bg-[#c9a96e]/15 text-[#c9a96e]",
        className
      )}
    >
      {children}
    </span>
  );
}
