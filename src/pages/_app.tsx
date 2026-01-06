import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth';
import { LoginModal } from '@/components/auth';
import PwaRegister from '@/components/PwaRegister';
import Container from '@/components/ui/Container';
import '@/styles/globals.css';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/90 backdrop-blur-lg">
        <Container className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-sky-600">
            webpocket
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 sm:flex">
            {isAuthenticated ? (
              <>
                <button
                  onClick={logout}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
              >
                로그인
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-sky-50 sm:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-sky-100 bg-white px-4 py-3 sm:hidden">
            <nav className="flex flex-col gap-1">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-zinc-500 hover:bg-zinc-50"
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-white"
                >
                  로그인
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

const FloatingUploadButton = () => {
  const { isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    let rafId = 0;
    let lastTranslateY = -1;

    const updatePosition = () => {
      rafId = 0;

      const button = buttonRef.current;
      if (!button) return;

      const footerRect = footer.getBoundingClientRect();
      const defaultBottom = window.innerWidth >= 640 ? 32 : 24; // sm:bottom-8 : bottom-6
      const padding = 16; // 푸터와의 최소 여백

      const overlap = window.innerHeight - footerRect.top;
      const pushUp = Math.max(0, overlap + padding - defaultBottom);

      // Avoid needless style writes (reduces jitter)
      if (Math.abs(lastTranslateY - pushUp) > 0.5) {
        lastTranslateY = pushUp;
        button.style.bottom = `${defaultBottom}px`;
        button.style.transform = `translateY(-${pushUp}px)`;
      }
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updatePosition);
    };

    // initial
    requestUpdate();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Link
        ref={buttonRef}
        href={isAuthenticated ? '/upload' : '#'}
        onClick={!isAuthenticated ? handleClick : undefined}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-600 hover:shadow-xl active:scale-95 sm:bottom-8 sm:right-8"
        aria-label="웹사이트 등록하기"
      >
        <Plus className="h-6 w-6" />
      </Link>
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectTo="/upload"
      />
    </>
  );
};

const Footer = () => (
  <footer className="border-t border-sky-100 bg-sky-50/50">
    <Container className="py-8 sm:py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-bold text-sky-600">webpocket</h3>
          <p className="mt-2 text-sm text-zinc-500">
            좋아하는 웹앱을 앱처럼 사용하세요
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-700">서비스</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><Link href="/home" className="hover:text-sky-600">웹앱 둘러보기</Link></li>
            <li><Link href="/upload" className="hover:text-sky-600">웹사이트 등록</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-700">지원</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><Link href="/faq" className="hover:text-sky-600">자주 묻는 질문</Link></li>
            <li><Link href="/contact" className="hover:text-sky-600">문의하기</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-700">법적 고지</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><Link href="/terms" className="hover:text-sky-600">이용약관</Link></li>
            <li><Link href="/privacy" className="hover:text-sky-600">개인정보처리방침</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-sky-100 pt-6 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} webpocket. All rights reserved.
      </div>
    </Container>
  </footer>
);

const AppContent = ({ Component, pageProps }: AppProps) => {
  const isLandingPage = Component.displayName === 'LandingPage';

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <PwaRegister />
      {!isLandingPage && <Header />}
      <main className={`flex-1 ${isLandingPage ? '' : 'py-6 sm:py-8'}`}>
        <Component {...pageProps} />
      </main>
      <Footer />
      {!isLandingPage && <FloatingUploadButton />}
    </div>
  );
};

const App = (props: AppProps) => (
  <AuthProvider>
    <AppContent {...props} />
  </AuthProvider>
);

export default App;
