import type { FC, ReactNode, HTMLAttributes } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  className?: string;
}

const animationClasses = {
  fadeIn: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  fadeInUp: {
    hidden: 'opacity-0 translate-y-12',
    visible: 'opacity-100 translate-y-0',
  },
  fadeInLeft: {
    hidden: 'opacity-0 -translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  fadeInRight: {
    hidden: 'opacity-0 translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  scaleIn: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
};

export const AnimatedSection: FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  ...props
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.15 });
  const { hidden, visible } = animationClasses[animation];

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visible : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
