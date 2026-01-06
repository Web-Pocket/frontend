import { type FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface CTASectionProps {
  onLoginClick: () => void;
}

const AnimatedCounter: FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={elementRef} className="text-xl font-bold text-white sm:text-3xl md:text-4xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

export const CTASection: FC<CTASectionProps> = ({ onLoginClick }) => (
  <section className="bg-gradient-to-br from-sky-500 to-blue-600 py-16 sm:py-24">
    <AnimatedSection animation="scaleIn" className="mx-auto max-w-4xl px-4 text-center sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
        지금 바로 시작하세요
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:mt-4 sm:text-base">
        수천 개의 웹앱이 당신을 기다리고 있어요.
        <br className="hidden sm:block" />
        무료로 시작하고, 나만의 웹앱도 등록해보세요.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="/home"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-sky-600 shadow-lg transition-all duration-200 hover:bg-sky-50 active:scale-[0.98] sm:h-14 sm:w-auto sm:px-8 sm:text-base"
        >
          웹앱 둘러보기
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
        <button
          onClick={onLoginClick}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-[0.98] sm:h-14 sm:w-auto sm:px-8 sm:text-base"
        >
          내 웹사이트 등록하기
        </button>
      </div>

      {/* Stats with animation */}
      <div className="mt-10 grid grid-cols-3 gap-4 sm:mt-14 sm:gap-8">
        <div>
          <AnimatedCounter end={2000} suffix="+" />
          <div className="mt-1 text-xs text-white/70 sm:text-sm">등록된 웹앱</div>
        </div>
        <div>
          <AnimatedCounter end={50000} suffix="+" />
          <div className="mt-1 text-xs text-white/70 sm:text-sm">월간 사용자</div>
        </div>
        <div>
          <AnimatedCounter end={98} suffix="%" />
          <div className="mt-1 text-xs text-white/70 sm:text-sm">만족도</div>
        </div>
      </div>
    </AnimatedSection>
  </section>
);

export default CTASection;
