export const AUTH_CONFIG = {
  // Spring Security OAuth2 엔드포인트
  KAKAO_AUTH_URL: '/oauth2/authorization/kakao',
  GOOGLE_AUTH_URL: '/oauth2/authorization/google',
  
  // 프론트엔드 리다이렉트 URL
  REDIRECT_AFTER_LOGIN: '/upload',
  REDIRECT_AFTER_LOGOUT: '/',
} as const;

export type AuthProvider = 'kakao' | 'google';

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  provider: AuthProvider;
}
