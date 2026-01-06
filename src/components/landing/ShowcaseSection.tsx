import type { FC } from 'react';
import { Briefcase, Palette, Heart, Gamepad2, GraduationCap, Music } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

const categories = [
  {
    icon: Briefcase,
    title: '생산성',
    description: '업무 효율을 높이는 도구',
    color: 'bg-blue-50 text-blue-600',
    count: 124,
  },
  {
    icon: Palette,
    title: '디자인',
    description: '창작을 위한 도구',
    color: 'bg-purple-50 text-purple-600',
    count: 89,
  },
  {
    icon: Heart,
    title: '라이프스타일',
    description: '일상을 편리하게',
    color: 'bg-rose-50 text-rose-600',
    count: 156,
  },
  {
    icon: Gamepad2,
    title: '엔터테인먼트',
    description: '즐거운 시간을 위한',
    color: 'bg-amber-50 text-amber-600',
    count: 203,
  },
  {
    icon: GraduationCap,
    title: '교육',
    description: '배움을 돕는 도구',
    color: 'bg-emerald-50 text-emerald-600',
    count: 67,
  },
  {
    icon: Music,
    title: '음악',
    description: '음악과 함께하는',
    color: 'bg-sky-50 text-sky-600',
    count: 45,
  },
];

export const ShowcaseSection: FC = () => (
  <section className="bg-sky-50/30 py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <AnimatedSection className="text-center">
        <span className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600 sm:mb-4 sm:text-sm">
          카테고리
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
          다양한 카테고리의 웹앱
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-500 sm:mt-4 sm:text-base">
          원하는 분야에서 최고의 웹앱을 발견하세요
        </p>
      </AnimatedSection>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <AnimatedSection key={category.title} animation="fadeInUp">
              <Link
                href={`/home?category=${encodeURIComponent(category.title)}`}
                className="group flex flex-col rounded-2xl border border-sky-100 bg-white p-4 transition-all hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 sm:p-6"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${category.color} sm:mb-4 sm:h-12 sm:w-12`}>
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 sm:text-lg">{category.title}</h3>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{category.description}</p>
                <div className="mt-3 flex items-center justify-between sm:mt-4">
                  <span className="text-xs text-zinc-400 sm:text-sm">{category.count}개의 앱</span>
                  <span className="text-xs font-medium text-sky-500 opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm">
                    둘러보기 →
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="mt-10 text-center sm:mt-12">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-2.5 text-sm font-medium text-sky-600 transition-all hover:bg-sky-50 sm:px-6 sm:py-3"
        >
          전체 카테고리 보기
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default ShowcaseSection;
