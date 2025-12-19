import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className,
  href,
  ...props 
}) {
  const { theme } = useTheme();
  
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full';
  
  const variants = {
    primary: theme === 'light' 
      ? 'bg-[#b8954f] text-[#faf8f5] hover:bg-[#a07f3a]'
      : 'bg-[#c9a96e] text-[#0a1628] hover:bg-[#dfc07a]',
    secondary: theme === 'light'
      ? 'bg-transparent border-2 border-[#b8954f] text-[#b8954f] hover:bg-[#b8954f]/10'
      : 'bg-transparent border-2 border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e]/10',
    ghost: theme === 'light'
      ? 'bg-transparent text-[#4a5568] hover:text-[#b8954f]'
      : 'bg-transparent text-[#a8a39c] hover:text-[#c9a96e]',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
}
