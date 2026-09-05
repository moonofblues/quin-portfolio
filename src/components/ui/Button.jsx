import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  className,
  href,
  ...props
}) {
  // Hover/press feedback is CSS. This component renders many times per page,
  // and framer-motion's whileHover/whileTap would mount an animation
  // controller and pointer listeners for each instance; the hover:/active:
  // variants below do the same job on the compositor for free.
  // Uses Tailwind's plain `transition` (not `transition-all`, not a
  // hand-written `transition-[...]` list): a single class means a single
  // `transition-property` rule, so it can't lose a cascade fight the way
  // stacking transition-colors + transition-transform did (same CSS
  // property set twice on one element — only the later rule wins, silently
  // dropping the other). `transition` still excludes layout-affecting
  // properties like width/padding that true transition-all would include.
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full ' +
    'transition duration-200 ' +
    'hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none';

  const variants = {
    primary: 'bg-accent text-on-accent hover:bg-accent-hover',
    secondary: 'bg-transparent border-2 border-accent text-accent hover:bg-accent/10',
    ghost: 'bg-transparent text-text-secondary hover:text-accent',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
