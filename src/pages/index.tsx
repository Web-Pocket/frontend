import { useState } from 'react';
import { HeroSection, FeatureSection, ShowcaseSection, CTASection } from '@/components/landing';
import { LoginModal } from '@/components/auth';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleRegisterClick = () => {
    if (isAuthenticated) {
      router.push('/upload');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <HeroSection onLoginClick={handleRegisterClick} />
      <FeatureSection />
      <ShowcaseSection />
      <CTASection onLoginClick={handleRegisterClick} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectTo="/upload"
      />
    </>
  );
};

LandingPage.displayName = 'LandingPage';

export default LandingPage;
