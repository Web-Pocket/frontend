import type { FC } from 'react';
import { KakaoIcon, GoogleIcon } from '@/components/icons';

interface SocialLoginButtonsProps {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
  isLoading?: boolean;
}

export const SocialLoginButtons: FC<SocialLoginButtonsProps> = ({
  onKakaoLogin,
  onGoogleLogin,
  isLoading = false,
}) => (
  <div className="flex flex-col gap-3">
    <button
      onClick={onKakaoLogin}
      disabled={isLoading}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#FEE500] font-medium text-[#191919] transition-all duration-200 hover:bg-[#FDD800] active:scale-[0.98] disabled:opacity-60"
    >
      <KakaoIcon className="h-5 w-5" />
      카카오로 시작하기
    </button>
    <button
      onClick={onGoogleLogin}
      disabled={isLoading}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-60"
    >
      <GoogleIcon className="h-5 w-5" />
      Google로 시작하기
    </button>
  </div>
);

export default SocialLoginButtons;
