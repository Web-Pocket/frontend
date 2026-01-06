import Link from 'next/link';
import type { ComponentProps, PropsWithChildren, FC } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonBaseProps = PropsWithChildren<{
  variant?: Variant;
  className?: string;
}>;

type ButtonProps = ButtonBaseProps & ComponentProps<'button'>;
type ButtonLinkProps = ButtonBaseProps & ComponentProps<typeof Link>;

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm shadow-sky-500/20',
  secondary: 'border border-sky-200 bg-white text-sky-600 hover:border-sky-300 hover:bg-sky-50',
  ghost: 'text-zinc-600 hover:bg-sky-50 hover:text-sky-600',
};

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => (
  <button
    {...props}
    className={`${baseClass} h-10 ${variantClasses[variant]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => (
  <Link
    {...props}
    className={`${baseClass} h-10 ${variantClasses[variant]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 ${className}`}
  >
    {children}
  </Link>
);
