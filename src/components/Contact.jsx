import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Moon } from './decorative/Moon';
import { Star } from './decorative/Stars';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/quinledesma', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/quinledesma', icon: Github },
  { label: 'Behance', href: 'https://behance.net/quinledesma', icon: ExternalLink },
];

export function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <Moon className="absolute bottom-12 right-8 md:right-16 opacity-50 z-0" size={80} />
      <Star className="absolute top-24 left-12" size={20} delay={0.5} />
      <Star className="absolute bottom-32 left-1/4" size={14} delay={1} />

      <div className="container relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle className="justify-center">Let's Work Together</SectionTitle>

          <p className="text-lg md:text-xl mb-8 text-text-secondary">
            Whether you have a project in mind or just want to chat about design
            and development, I'd love to hear from you.
          </p>

          {/* CSS hover — see Button.jsx for why these aren't whileHover. */}
          <a
            href="mailto:quinledesma@gmail.com"
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-display mb-10 text-text-primary hover:text-accent transition duration-200 hover:scale-[1.02] motion-reduce:transform-none"
          >
            <Mail size={28} className="text-accent" />
            quinledesma@gmail.com
          </a>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-bg-tertiary text-text-secondary hover:bg-accent hover:text-on-accent transition duration-200 hover:-translate-y-0.5 hover:scale-110 active:scale-95 motion-reduce:transform-none"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-text-muted">
            Based in Zamboanga City, Philippines · Open to remote work worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
