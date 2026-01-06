import type { FC } from 'react';
import { Search, Download, Smartphone, Zap, Shield, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    icon: Search,
    title: '쉽게 찾기',
    description: '카테고리별로 정리된 웹앱을 검색하고 원하는 앱을 빠르게 찾으세요.',
    color: 'bg-sky-500',
  },
  {
    icon: Download,
    title: '설치 없이 사용',
    description: '앱 스토어 없이 바로 사용하세요. 저장 공간 걱정도 없어요.',
    color: 'bg-emerald-500',
  },
  {
    icon: Smartphone,
    title: '홈 화면에 추가',
    description: '좋아하는 웹앱을 홈 화면에 추가하면 네이티브 앱처럼 사용해요.',
    color: 'bg-purple-500',
  },
  {
    icon: Zap,
    title: '빠른 성능',
    description: 'PWA 기술로 빠른 로딩 속도와 부드러운 사용 경험을 제공해요.',
    color: 'bg-amber-500',
  },
  {
    icon: Shield,
    title: '안전한 사용',
    description: '검증된 웹앱만 등록되어 있어 안심하고 사용할 수 있어요.',
    color: 'bg-rose-500',
  },
  {
    icon: Globe,
    title: '어디서나 접근',
    description: '인터넷만 있다면 어떤 기기에서든 동일한 경험을 누리세요.',
    color: 'bg-blue-500',
  },
];

export const FeatureSection: FC = () => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <AnimatedSection className="text-center">
        <span className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600 sm:mb-4 sm:text-sm">
          특징
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
          왜 webpocket인가요?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-500 sm:mt-4 sm:text-base">
          설치 없이 사용하는 새로운 앱 경험
        </p>
      </AnimatedSection>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <AnimatedSection
            key={feature.title}
            animation="fadeInUp"
            delay={i * 100}
            className="group rounded-2xl border border-sky-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100/50 sm:p-6"
          >
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.color} text-white sm:h-12 sm:w-12`}
            >
              <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-zinc-900 sm:mt-4 sm:text-lg">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500 sm:mt-2 sm:text-base">{feature.description}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;
