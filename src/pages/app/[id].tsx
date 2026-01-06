import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExternalLink, Star, MessageCircle, Share2, Bookmark, Flag, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MOCK_APPS, type WebApp } from '@/lib/data/apps';

const AppDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const app = MOCK_APPS.find((item) => item.id === id);

  const getFaviconUrl = (url: string, size: number = 128) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`;
    } catch {
      return null;
    }
  };

  if (!app) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
            <span className="text-2xl">🔍</span>
          </div>
          <h1 className="text-xl font-bold text-zinc-900">앱을 찾을 수 없습니다</h1>
          <p className="mt-2 text-zinc-500">요청하신 앱이 존재하지 않거나 삭제되었습니다.</p>
          <Link
            href="/home"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </Container>
    );
  }

  const faviconUrl = getFaviconUrl(app.url);
  const hostname = (() => {
    try {
      return new URL(app.url).hostname;
    } catch {
      return app.url;
    }
  })();

  return (
    <Container className="max-w-4xl py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 메인 컨텐츠 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 앱 헤더 */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* 파비콘 */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 sm:h-20 sm:w-20">
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt={app.name}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-200 to-sky-300 sm:h-12 sm:w-12" />
                )}
              </div>

              {/* 앱 정보 */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl md:text-3xl">{app.name}</h1>
                  {app.isPopular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                      <Star className="h-3 w-3 fill-current" />
                      인기
                    </span>
                  )}
                  {app.isNew && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      NEW
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-500 sm:text-base">{app.category}</p>
              </div>
            </div>

            {/* 설명 */}
            <p className="mt-5 text-sm leading-relaxed text-zinc-600 sm:mt-6 sm:text-base">{app.description}</p>

            {/* 액션 버튼들 */}
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <Button className="h-11 w-full px-5 text-sm sm:h-12 sm:w-auto sm:px-6 sm:text-base">
                  사이트 방문하기
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-3 text-sky-600 transition-all hover:border-sky-300 hover:bg-sky-50 sm:h-12 sm:px-4">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">저장</span>
              </button>
              <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-3 text-sky-600 transition-all hover:border-sky-300 hover:bg-sky-50 sm:h-12 sm:px-4">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">공유</span>
              </button>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
                  <MessageCircle className="h-4 w-4 text-sky-600" />
                </div>
                <h2 className="text-lg font-bold text-zinc-900">댓글</h2>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-600">0</span>
              </div>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-6 text-center sm:p-8">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                <MessageCircle className="h-6 w-6 text-sky-400" />
              </div>
              <p className="font-medium text-zinc-700">아직 댓글이 없습니다</p>
              <p className="mt-1 text-sm text-zinc-500">첫 번째 댓글을 작성해보세요!</p>
              <button className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600">
                댓글 작성하기
              </button>
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            {/* 사이트 정보 */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold text-zinc-900">사이트 정보</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="mb-1 text-xs font-medium text-zinc-500">주소</dt>
                  <dd>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-sky-600 transition-colors hover:text-sky-700"
                    >
                      <span className="truncate">{hostname}</span>
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs font-medium text-zinc-500">카테고리</dt>
                  <dd className="text-sm text-zinc-900">{app.category}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs font-medium text-zinc-500">등록일</dt>
                  <dd className="text-sm text-zinc-900">2026년 1월</dd>
                </div>
              </dl>
            </div>

            {/* 신고 버튼 */}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm text-zinc-500 transition-all hover:border-sky-300 hover:text-zinc-700">
              <Flag className="h-4 w-4" />
              문제 신고하기
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AppDetailPage;
