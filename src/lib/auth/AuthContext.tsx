import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from './config';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (provider: 'kakao' | 'google') => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      // 실제로는 백엔드 API 호출
      // const res = await fetch('/api/auth/me');
      // if (res.ok) setUser(await res.json());
      
      // 개발용: localStorage에서 mock user 확인
      const savedUser = localStorage.getItem('webpocket_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((provider: 'kakao' | 'google') => {
    // Spring Security OAuth2 로그인 페이지로 리다이렉트
    // 실제 배포시: window.location.href = `/oauth2/authorization/${provider}`;
    
    // 개발용 mock login
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      name: '테스트 유저',
      provider,
    };
    localStorage.setItem('webpocket_user', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      // 실제로는: await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('webpocket_user');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
