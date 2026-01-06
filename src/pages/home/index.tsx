import { useState, useMemo, type ChangeEvent } from 'react';
import { Search, Star, Clock, TrendingUp, Layers, Briefcase, Music, Wrench, Users, BookOpen, DollarSign, Heart } from 'lucide-react';
import Container from '@/components/ui/Container';
import { AppCard } from '@/components/app';
import { MOCK_APPS } from '@/lib/data/apps';

const CATEGORY_CONFIG = {
  '전체': { icon: Layers, color: 'text-sky-600', bgColor: 'bg-sky-500', badgeBg: 'bg-sky-50', badgeText: 'text-sky-700' },
  '생산성': { icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-500', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
  '엔터테인먼트': { icon: Music, color: 'text-purple-600', bgColor: 'bg-purple-500', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700' },
  '유틸리티': { icon: Wrench, color: 'text-emerald-600', bgColor: 'bg-emerald-500', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700' },
  '소셜': { icon: Users, color: 'text-pink-600', bgColor: 'bg-pink-500', badgeBg: 'bg-pink-50', badgeText: 'text-pink-700' },
  '교육': { icon: BookOpen, color: 'text-amber-600', bgColor: 'bg-amber-500', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
  '금융': { icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-500', badgeBg: 'bg-green-50', badgeText: 'text-green-700' },
  '헬스': { icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-500', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700' },
} as const;

type CategoryKey = keyof typeof CATEGORY_CONFIG;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(MOCK_APPS.map((app) => app.category))),
    []
  );

  const popularApps = useMemo(
    () => MOCK_APPS.filter((app) => app.isPopular),
    []
  );

  const newApps = useMemo(
    () => MOCK_APPS.filter((app) => app.isNew),
    []
  );

  const filteredApps = useMemo(() => {
    return MOCK_APPS.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category: CategoryKey | null) => {
    setSelectedCategory(category);
  };

  const getCategoryConfig = (category: string) =>
    CATEGORY_CONFIG[category as CategoryKey] || CATEGORY_CONFIG['전체'];

  const showDefaultSections = !searchTerm && !selectedCategory;

  return (
    <Container>
      {/* 검색 영역 */}
      <section className="mx-auto max-w-2xl px-4 sm:px-0">
        <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
          어떤 웹앱을 찾으시나요?
        </h1>
        <div className="mt-5 flex h-12 items-center gap-3 rounded-xl border border-sky-200 bg-white px-4 shadow-sm transition-all duration-200 focus-within:border-sky-400 focus-within:shadow-md sm:mt-6 sm:h-14 sm:rounded-2xl">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="웹앱 이름이나 키워드로 검색하세요"
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-full w-full bg-transparent text-base outline-none placeholder:text-zinc-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="mt-6 flex flex-wrap justify-center gap-2 px-2 sm:mt-8 sm:px-0">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
            !selectedCategory
              ? 'bg-sky-500 text-white shadow-sm'
              : 'border border-sky-200 bg-white text-zinc-600 hover:border-sky-300 hover:bg-sky-50'
          }`}
        >
          <Layers className="h-4 w-4" />
          전체
        </button>
        {categories.map((category) => {
          const config = getCategoryConfig(category);
          const IconComponent = config.icon;
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category as CategoryKey)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                isSelected
                  ? `${config.bgColor} text-white shadow-sm`
                  : 'border border-sky-200 bg-white text-zinc-600 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {category}
            </button>
          );
        })}
      </section>

      {/* 인기 웹앱 */}
      {showDefaultSections && popularApps.length > 0 && (
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">인기 웹앱</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                categoryConfig={getCategoryConfig(app.category)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 새로운 웹앱 */}
      {showDefaultSections && newApps.length > 0 && (
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">새로운 웹앱</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                categoryConfig={getCategoryConfig(app.category)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 검색 결과 또는 전체 목록 */}
      {!showDefaultSections && (
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
              <TrendingUp className="h-4 w-4 text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              {searchTerm ? '검색 결과' : selectedCategory || '전체 웹앱'}
            </h2>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-sm text-zinc-600">
              {filteredApps.length}개
            </span>
          </div>
          {filteredApps.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  categoryConfig={getCategoryConfig(app.category)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                <Search className="h-8 w-8 text-zinc-400" />
              </div>
              <p className="font-medium text-zinc-700">검색 결과가 없습니다</p>
              <p className="mt-1 text-sm text-zinc-500">다른 검색어를 시도해보세요</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="mt-4 text-sm font-medium text-zinc-900 underline hover:no-underline"
              >
                전체 웹앱 보기
              </button>
            </div>
          )}
        </section>
      )}
    </Container>
  );
};

export default HomePage;
