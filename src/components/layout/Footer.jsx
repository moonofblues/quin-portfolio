import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "../../utils/cn";

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "py-8 border-t",
        theme === "light" ? "border-[#e5e0d8]" : "border-[#1a2a3f]",
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl">
            <span
              className={
                theme === "light" ? "text-[#0a1628]" : "text-[#f5f0e8]"
              }
            >
              Quin
            </span>
            <span
              className={
                theme === "light" ? "text-[#b8954f]" : "text-[#c9a96e]"
              }
            >
              {" "}
              Ledesma
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  theme === "light"
                    ? "text-[#4a5568] hover:text-[#b8954f]"
                    : "text-[#a8a39c] hover:text-[#c9a96e]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p
            className={cn(
              "text-sm",
              theme === "light" ? "text-[#718096]" : "text-[#6b7280]",
            )}
          >
            © {currentYear} Quin Ledesma
          </p>
        </div>
      </div>
    </footer>
  );
}
