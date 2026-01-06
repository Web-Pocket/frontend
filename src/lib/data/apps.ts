export type WebApp = {
	id: string;
	name: string;
	description: string;
	category: string;
	url: string;
	favicon?: string;
	isPopular?: boolean;
	isNew?: boolean;
};

export const MOCK_APPS: WebApp[] = [
	{
		id: "1",
		name: "할일 관리",
		description: "오프라인에서도 작동하는 간편한 투두 리스트",
		category: "생산성",
		url: "https://todoist.com",
		isPopular: true,
	},
	{
		id: "2",
		name: "가계부",
		description: "지출 내역을 쉽게 기록하고 통계로 확인하세요",
		category: "금융",
		url: "https://mint.intuit.com",
		isPopular: true,
	},
	{
		id: "3",
		name: "음악 플레이어",
		description: "브라우저에서 즐기는 음악 스트리밍",
		category: "엔터테인먼트",
		url: "https://spotify.com",
		isNew: true,
	},
	{
		id: "4",
		name: "운동 기록",
		description: "매일의 운동을 기록하고 목표를 달성하세요",
		category: "생산성",
		url: "https://strava.com",
	},
	{
		id: "5",
		name: "노트 필기",
		description: "메모와 아이디어를 체계적으로 정리하세요",
		category: "생산성",
		url: "https://notion.so",
		isPopular: true,
	},
	{
		id: "6",
		name: "사진 편집",
		description: "온라인에서 쉽게 사진을 보정하고 편집하세요",
		category: "유틸리티",
		url: "https://photopea.com",
		isNew: true,
	},
	{
		id: "7",
		name: "언어 학습",
		description: "재미있는 게임으로 새로운 언어를 배워보세요",
		category: "교육",
		url: "https://duolingo.com",
		isPopular: true,
	},
	{
		id: "8",
		name: "SNS 매니저",
		description: "여러 소셜 미디어를 한 곳에서 관리하세요",
		category: "소셜",
		url: "https://buffer.com",
	},
	{
		id: "9",
		name: "코딩 연습",
		description: "인터랙티브한 방식으로 프로그래밍을 배우세요",
		category: "교육",
		url: "https://codecademy.com",
		isNew: true,
	},
	{
		id: "10",
		name: "디자인 도구",
		description: "협업하며 디자인을 만들고 프로토타입을 제작하세요",
		category: "유틸리티",
		url: "https://figma.com",
		isPopular: true,
	},
	{
		id: "11",
		name: "날씨 앱",
		description: "상세한 날씨 정보와 예보를 확인하세요",
		category: "유틸리티",
		url: "https://weather.com",
	},
	{
		id: "12",
		name: "레시피 모음",
		description: "전 세계의 다양한 요리 레시피를 찾아보세요",
		category: "엔터테인먼트",
		url: "https://allrecipes.com",
	},
	{
		id: "13",
		name: "주식 거래",
		description: "실시간 시세를 확인하고 투자하세요",
		category: "금융",
		url: "https://robinhood.com",
		isPopular: true,
	},
	{
		id: "14",
		name: "명상 가이드",
		description: "마음을 편안하게 하는 명상과 수면 사운드",
		category: "엔터테인먼트",
		url: "https://calm.com",
		isNew: true,
	},
	{
		id: "15",
		name: "채팅 앱",
		description: "친구들과 실시간으로 소통하세요",
		category: "소셜",
		url: "https://discord.com",
		isPopular: true,
	},
	{
		id: "16",
		name: "온라인 화이트보드",
		description: "팀과 함께 아이디어를 시각화하고 협업하세요",
		category: "생산성",
		url: "https://miro.com",
	},
	{
		id: "17",
		name: "PDF 편집기",
		description: "PDF 파일을 쉽게 편집하고 변환하세요",
		category: "유틸리티",
		url: "https://smallpdf.com",
	},
	{
		id: "18",
		name: "영어 사전",
		description: "단어의 뜻과 발음, 예문을 확인하세요",
		category: "교육",
		url: "https://dictionary.cambridge.org",
	},
	{
		id: "19",
		name: "암호화폐 지갑",
		description: "디지털 자산을 안전하게 보관하고 관리하세요",
		category: "금융",
		url: "https://metamask.io",
	},
	{
		id: "20",
		name: "독서 관리",
		description: "읽은 책을 기록하고 독서 목표를 달성하세요",
		category: "교육",
		url: "https://goodreads.com",
		isNew: true,
	},
];
