import type { FC } from 'react';
import { X } from 'lucide-react';
import SocialLoginButtons from './SocialLoginButtons';
import { useAuth } from '@/lib/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, redirectTo }) => {
  const { login, isLoading } = useAuth();

  const handleLogin = (provider: 'kakao' | 'google') => {
    // 실제 배포시에는 redirectTo를 쿼리 파라미터로 전달
    login(provider);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm animate-in zoom-in-95 fade-in duration-200">
        <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl sm:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-2 text-zinc-400 transition-colors hover:bg-sky-50 hover:text-sky-600 sm:right-4 sm:top-4"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-5 text-center sm:mb-6">
            <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">로그인</h2>
            <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
              소셜 계정으로 간편하게 시작하세요
            </p>
          </div>

          {/* Social Login Buttons */}
          <SocialLoginButtons
            onKakaoLogin={() => handleLogin('kakao')}
            onGoogleLogin={() => handleLogin('google')}
            isLoading={isLoading}
          />

          {/* Terms */}
          <p className="mt-5 text-center text-xs text-zinc-400 sm:mt-6">
            로그인 시{' '}
            <a href="/terms" className="text-sky-500 underline hover:text-sky-600">
              이용약관
            </a>{' '}
            및{' '}
            <a href="/privacy" className="text-sky-500 underline hover:text-sky-600">
              개인정보처리방침
            </a>
            에 동의합니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
