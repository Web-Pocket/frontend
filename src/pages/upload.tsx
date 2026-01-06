import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Upload, CheckCircle2, AlertCircle, Globe, FileText, Tag, Link as LinkIcon, Image, ArrowLeft, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Field';
import { useAuth } from '@/lib/auth';
import { LoginModal } from '@/components/auth';

const CATEGORIES = [
  '생산성',
  '금융',
  '엔터테인먼트',
  '유틸리티',
  '소셜',
  '교육',
  '헬스',
  '기타',
] as const;

type Category = (typeof CATEGORIES)[number];

interface FormData {
  name: string;
  description: string;
  category: Category | '';
  url: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  category?: string;
  url?: string;
}

const UploadPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    category: '',
    url: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewFavicon, setPreviewFavicon] = useState<string | null>(null);

  // URL 변경시 파비콘 미리보기
  useEffect(() => {
    if (formData.url) {
      try {
        const url = new URL(formData.url);
        setPreviewFavicon(`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`);
      } catch {
        setPreviewFavicon(null);
      }
    } else {
      setPreviewFavicon(null);
    }
  }, [formData.url]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '웹사이트 이름을 입력해주세요';
    } else if (formData.name.length > 50) {
      newErrors.name = '이름은 50자 이내로 입력해주세요';
    }

    if (!formData.description.trim()) {
      newErrors.description = '설명을 입력해주세요';
    } else if (formData.description.length > 300) {
      newErrors.description = '설명은 300자 이내로 입력해주세요';
    }

    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL을 입력해주세요';
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = '올바른 URL 형식을 입력해주세요';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // 에러 클리어
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: 실제 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', description: '', category: '', url: '' });
    setErrors({});
    setIsSuccess(false);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
      </Container>
    );
  }

  // 성공 상태
  if (isSuccess) {
    return (
      <Container className="max-w-xl">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900">등록 완료!</h1>
          <p className="mt-2 text-zinc-600">
            웹사이트가 성공적으로 등록되었습니다.
            <br />
            검토 후 목록에 표시됩니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/home">웹앱 둘러보기</ButtonLink>
            <Button variant="secondary" onClick={handleReset}>
              다른 웹사이트 등록
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      {/* 헤더 */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
          <Sparkles className="h-4 w-4" />
          무료 등록
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:mt-4 sm:text-3xl">웹사이트 등록하기</h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          당신의 웹사이트를 webpocket에 등록하고 더 많은 사용자에게 알려보세요.
        </p>
      </div>

      {/* 로그인 안내 */}
      {!isAuthenticated && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="font-medium text-amber-900">로그인이 필요합니다</p>
            <p className="mt-1 text-sm text-amber-700">
              웹사이트를 등록하려면 먼저 로그인해주세요.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="mt-2 text-sm font-medium text-amber-700 underline hover:text-amber-900"
            >
              로그인하기 →
            </button>
          </div>
        </div>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 웹사이트 이름 */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900">
            <FileText className="h-4 w-4 text-zinc-400" />
            웹사이트 이름
          </label>
          <Input
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="예: Todoist, Notion, Figma"
            maxLength={50}
            className={errors.name ? 'border-red-300 focus:border-red-400' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
          <p className="mt-1 text-xs text-zinc-400">{formData.name.length}/50</p>
        </div>

        {/* URL */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900">
            <LinkIcon className="h-4 w-4 text-zinc-400" />
            웹사이트 주소
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={formData.url}
                onChange={handleChange('url')}
                placeholder="https://example.com"
                className={errors.url ? 'border-red-300 focus:border-red-400' : ''}
              />
            </div>
            {previewFavicon && (
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                <img
                  src={previewFavicon}
                  alt="Favicon"
                  className="h-6 w-6"
                  onError={() => setPreviewFavicon(null)}
                />
              </div>
            )}
          </div>
          {errors.url && (
            <p className="mt-1 text-sm text-red-500">{errors.url}</p>
          )}
        </div>

        {/* 카테고리 */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900">
            <Tag className="h-4 w-4 text-zinc-400" />
            카테고리
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, category: cat }));
                  if (errors.category) {
                    setErrors((prev) => ({ ...prev, category: undefined }));
                  }
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
                  formData.category === cat
                    ? 'bg-sky-500 text-white'
                    : 'border border-sky-200 bg-white text-zinc-600 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="mt-2 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* 설명 */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900">
            <Globe className="h-4 w-4 text-zinc-400" />
            웹사이트 소개
          </label>
          <Textarea
            value={formData.description}
            onChange={handleChange('description')}
            placeholder="웹사이트의 주요 기능과 특징을 간단히 설명해주세요"
            maxLength={300}
            rows={4}
            className={errors.description ? 'border-red-300 focus:border-red-400' : ''}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-zinc-400">{formData.description.length}/300</p>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full text-base"
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                등록 중...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                웹사이트 등록하기
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-zinc-400">
            등록된 웹사이트는 검토 후 목록에 표시됩니다
          </p>
        </div>
      </form>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectTo="/upload"
      />
    </Container>
  );
};

export default UploadPage;
