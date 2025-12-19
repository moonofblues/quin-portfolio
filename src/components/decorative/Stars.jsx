import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

export function Star({ className, size = 24, delay = 0 }) {
  const { theme } = useTheme();
  const color = theme === 'light' ? '#0a1628' : '#c9a96e';
  
  return (
    <motion.svg
      className={cn('', className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      animate={{ 
        opacity: [1, 0.5, 1],
        scale: [1, 0.95, 1]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: 'easeInOut',
        delay 
      }}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </motion.svg>
  );
}

export function Stars({ count = 5, className }) {
  const positions = [
    { top: '10%', right: '15%', size: 16, delay: 0 },
    { top: '20%', right: '8%', size: 24, delay: 0.5 },
    { top: '35%', right: '20%', size: 12, delay: 1 },
    { top: '15%', left: '10%', size: 14, delay: 1.5 },
    { top: '45%', left: '5%', size: 18, delay: 2 },
  ];

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {positions.slice(0, count).map((pos, i) => (
        <Star
          key={i}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
          }}
          size={pos.size}
          delay={pos.delay}
        />
      ))}
    </div>
  );
}
