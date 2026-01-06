import type { FC } from 'react';
import Link from 'next/link';
import type { WebApp } from '@/lib/data/apps';

interface AppCardProps {
  app: WebApp;
  categoryConfig?: {
    badgeBg: string;
    badgeText: string;
  };
}

const DEFAULT_CONFIG = {
  badgeBg: 'bg-sky-50',
  badgeText: 'text-sky-600',
};

export const AppCard: FC<AppCardProps> = ({ app, categoryConfig = DEFAULT_CONFIG }) => {
  const getFaviconUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(app.url);

  return (
    <Link href={`/app/${app.id}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-2xl border border-sky-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Favicon */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 transition-colors group-hover:border-sky-200 sm:h-14 sm:w-14">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt={app.name}
                className="h-6 w-6 sm:h-8 sm:w-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-sky-200 to-sky-300 sm:h-8 sm:w-8" />
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-sm font-semibold text-zinc-900 group-hover:text-sky-600 sm:text-base">
                {app.name}
              </h3>
              {app.isNew && (
                <span className="flex-shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  NEW
                </span>
              )}
            </div>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryConfig.badgeBg} ${categoryConfig.badgeText}`}
            >
              {app.category}
            </span>
          </div>
        </div>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-zinc-500 line-clamp-2 sm:mt-3 sm:text-sm">
          {app.description}
        </p>

        {app.isPopular && (
          <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 sm:mt-3">
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            인기
          </div>
        )}
      </div>
    </Link>
  );
};

export default AppCard;
