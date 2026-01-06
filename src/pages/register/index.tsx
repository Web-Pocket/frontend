import { useState } from "react";
import { UserRound, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

export default function RegisterPage() {
	const [nickname, setNickname] = useState("");
	const [done, setDone] = useState(false);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setDone(true);
	};

	return (
		<Container className="max-w-2xl">
			<section className="grid gap-2">
				<h1 className="text-3xl font-bold tracking-tight">닉네임 설정</h1>
				<p className="text-base text-zinc-600">나중에 언제든 바꿀 수 있어요.</p>
			</section>

				{done ? (
					<Card className="mt-6">
						<div className="flex items-center gap-2 text-sm font-medium">
							<CheckCircle2 className="h-4 w-4" /> 가입 완료
						</div>
						<p className="mt-2 text-sm text-zinc-600">
							API 연결 전이라 실제 저장은 하지 않아요.
						</p>
						<div className="mt-4">
							<ButtonLink href="/pwa" className="w-full sm:w-auto">
								PWA 목록 보기
							</ButtonLink>
						</div>
					</Card>
				) : (
					<form onSubmit={onSubmit} className="mt-6">
						<Card>
							<div className="flex items-center gap-2">
								<UserRound className="h-4 w-4 text-zinc-500" />
								<Input
									value={nickname}
									onChange={(e) => setNickname(e.target.value)}
									placeholder="닉네임"
									required
									maxLength={20}
									className="h-12 border-0 bg-transparent px-0 focus:border-transparent"
								/>
							</div>
							<Button type="submit" className="mt-3 h-12 w-full">
								가입 완료
							</Button>
						</Card>
					</form>
				)}
		</Container>
	);
}
