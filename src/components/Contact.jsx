import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Moon } from './decorative/Moon';
import { Star } from './decorative/Stars';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const socialLinks = [
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/quinledesma', 
    icon: Linkedin 
  },
  { 
    label: 'GitHub', 
    href: 'https://github.com/quinledesma', 
    icon: Github 
  },
  { 
    label: 'Behance', 
    href: 'https://behance.net/quinledesma', 
    icon: ExternalLink 
  },
];

export function Contact() {
  const { theme } = useTheme();

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Decorative elements */}
      <Moon 
        className="absolute bottom-12 right-8 md:right-16 opacity-50 z-0" 
        size={80} 
      />
      <Star 
        className="absolute top-24 left-12" 
        size={20} 
        delay={0.5} 
      />
      <Star 
        className="absolute bottom-32 left-1/4" 
        size={14} 
        delay={1} 
      />

      <div className="container relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle className="justify-center">Let's Work Together</SectionTitle>

          <p className={cn(
            'text-lg md:text-xl mb-8',
            theme === 'light' ? 'text-[#4a5568]' : 'text-[#a8a39c]'
          )}>
            Whether you have a project in mind or just want to chat about design 
            and development, I'd love to hear from you.
          </p>

          {/* Email */}
          <motion.a
            href="mailto:quinledesma@gmail.com"
            className={cn(
              'inline-flex items-center gap-3 text-2xl md:text-3xl font-display mb-10',
              'transition-colors duration-200',
              theme === 'light' 
                ? 'text-[#0a1628] hover:text-[#b8954f]' 
                : 'text-[#f5f0e8] hover:text-[#c9a96e]'
            )}
            whileHover={{ scale: 1.02 }}
          >
            <Mail size={28} className={theme === 'light' ? 'text-[#b8954f]' : 'text-[#c9a96e]'} />
            quinledesma@gmail.com
          </motion.a>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    'transition-all duration-200',
                    theme === 'light'
                      ? 'bg-[#e5e0d8] text-[#4a5568] hover:bg-[#b8954f] hover:text-[#faf8f5]'
                      : 'bg-[#1a2a3f] text-[#a8a39c] hover:bg-[#c9a96e] hover:text-[#0a1628]'
                  )}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Location note */}
          <p className={cn(
            'mt-10 text-sm',
            theme === 'light' ? 'text-[#718096]' : 'text-[#6b7280]'
          )}>
            Based in Zamboanga City, Philippines · Open to remote work worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
