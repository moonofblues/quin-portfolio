import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const footerLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-bg-tertiary">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl">
            <span className="text-text-primary">Quin</span>
            <span className="text-accent"> Ledesma</span>
          </Link>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-text-muted">
            © {currentYear} Quin Ledesma
          </p>
        </div>
      </div>
    </footer>
  );
}
