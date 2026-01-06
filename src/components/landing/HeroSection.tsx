import type { FC } from 'react';
import { ArrowRight, Search, Smartphone, Globe, Zap, Shield, Music, Camera, FileText, Calculator } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  onLoginClick: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({ onLoginClick }) => (
  <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
    {/* Background with floating icons */}
    <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white" />
    
    {/* Floating background icons */}
    <div className="absolute inset-0 overflow-hidden">
      <Globe className="absolute left-[5%] top-[15%] h-8 w-8 text-sky-200 sm:h-12 sm:w-12" />
      <Smartphone className="absolute right-[10%] top-[20%] h-10 w-10 rotate-12 text-sky-100 sm:h-14 sm:w-14" />
      <Search className="absolute left-[15%] top-[60%] h-8 w-8 -rotate-12 text-sky-200 sm:h-10 sm:w-10" />
      <Zap className="absolute right-[15%] top-[50%] h-6 w-6 text-sky-100 sm:h-10 sm:w-10" />
      <Shield className="absolute bottom-[25%] left-[8%] h-10 w-10 rotate-6 text-sky-100 sm:h-12 sm:w-12" />
      <Music className="absolute bottom-[30%] right-[8%] h-8 w-8 -rotate-6 text-sky-200 sm:h-10 sm:w-10" />
      <Camera className="absolute left-[25%] top-[25%] h-6 w-6 text-sky-100 sm:h-8 sm:w-8" />
      <FileText className="absolute right-[25%] top-[70%] h-8 w-8 rotate-12 text-sky-200 sm:h-10 sm:w-10" />
      <Calculator className="absolute bottom-[15%] left-[30%] h-6 w-6 text-sky-100 sm:h-8 sm:w-8" />
    </div>

    {/* Content */}
    <div className="relative z-10 w-full max-w-3xl text-center">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-sky-700 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-600 sm:h-2 sm:w-2" />
        </span>
        2,000+ 웹앱이 등록되어 있어요
      </div>

      {/* Main heading */}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-6xl">
        좋아하는 웹사이트를
        <br />
        <span className="text-sky-500">앱처럼</span> 사용하세요
      </h1>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500 sm:mt-6 sm:text-lg">
        설치 없이 웹에서 바로 실행되는 가벼운 앱들.
        <br className="hidden sm:block" />
        홈 화면에 추가하고 네이티브 앱처럼 사용하세요.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
        <Link
          href="/home"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl active:scale-[0.98] sm:h-14 sm:px-8 sm:text-base"
        >
          웹앱 둘러보기
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
        <button
          onClick={onLoginClick}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-6 text-sm font-semibold text-sky-600 transition-all hover:bg-sky-50 active:scale-[0.98] sm:h-14 sm:px-8 sm:text-base"
        >
          내 웹사이트 등록하기
        </button>
      </div>

      {/* Social proof */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-sky-200 to-sky-300 sm:h-10 sm:w-10"
            />
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-sky-600">1,200+</span> 명이 등록했어요
        </p>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-8">
      <div className="flex h-7 w-4 items-start justify-center rounded-full border-2 border-sky-300 p-1 sm:h-8 sm:w-5">
        <div className="h-1.5 w-0.5 rounded-full bg-sky-400 sm:h-2 sm:w-1" />
      </div>
    </div>
  </section>
);

export default HeroSection;
