import type { GetServerSideProps } from "next";
import { ExternalLink, Filter, Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

type PwaSite = {
	id: string;
	name: string;
	intro: string;
	category: string;
	url: string;
};

const MOCK_SITES: PwaSite[] = [
	{
		id: "1",
		name: "Todo PWA",
		intro: "오프라인도 되는 투두",
		category: "생산성",
		url: "https://example.com",
	},
	{
		id: "2",
		name: "Budget",
		intro: "간단 가계부",
		category: "금융",
		url: "https://example.com",
	},
	{
		id: "3",
		name: "Workout",
		intro: "운동 루틴",
		category: "헬스",
		url: "https://example.com",
	},
];

type PwaListPageProps = {
	category: string;
	items: PwaSite[];
};

export const getServerSideProps: GetServerSideProps<PwaListPageProps> = async (context) => {
	const raw = context.query.category;
	const category = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
	const items = category ? MOCK_SITES.filter((s) => s.category === category) : MOCK_SITES;

	return {
		props: {
			category,
			items,
		},
	};
};

export default function PwaListPage({ category, items }: PwaListPageProps) {
	return (
		<Container>
			<section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">PWA</h1>
					<p className="mt-1 text-base text-zinc-600">카테고리로 빠르게 찾아보세요.</p>
				</div>
				<ButtonLink href="/pwa/upload" className="w-full sm:w-auto">
					<Plus className="h-4 w-4" /> 업로드
				</ButtonLink>
			</section>

			<form className="mt-6 flex flex-col gap-2 sm:flex-row" action="/pwa" method="get">
					<div className="flex h-11 w-full items-center gap-2 rounded-lg border border-black/[.08] bg-white px-4 transition-all duration-200 focus-within:border-sky-300 focus-within:shadow-sm">
						<Filter className="h-4 w-4 text-zinc-500" />
						<input
							name="category"
							defaultValue={category}
							placeholder="카테고리 (예: 생산성)"
							className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
						/>
					</div>
					<button
						type="submit"
						className="h-11 rounded-xl border border-solid border-black/[.08] bg-transparent px-5 text-sm font-medium transition-all duration-200 hover:bg-black/[.04] active:scale-95"
					>
						조회
					</button>
				</form>

			<div className="mt-6 grid grid-cols-1 gap-3">
					{items.map((site) => (
						<Card key={site.id} className="p-6">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
								<div>
									<div className="text-sm font-semibold tracking-tight">{site.name}</div>
									<div className="mt-1 text-xs text-zinc-500">{site.category}</div>
								</div>
								<a
									href={site.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-black/[.08] bg-white px-4 text-sm font-medium transition-all duration-200 hover:bg-sky-50 hover:shadow-sm active:scale-95 sm:w-auto"
								>
									열기 <ExternalLink className="h-4 w-4" />
								</a>
							</div>
							<p className="mt-1 text-sm text-zinc-600 sm:mt-3">{site.intro}</p>
						</Card>
					))}
			</div>
		</Container>
	);
}
