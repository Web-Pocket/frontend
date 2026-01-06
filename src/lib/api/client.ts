export type ApiClientOptions = {
	baseUrl?: string;
	defaultHeaders?: HeadersInit;
};

export class ApiError extends Error {
	status: number;
	body?: unknown;

	constructor(message: string, status: number, body?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.body = body;
	}
}

const DEFAULT_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';


const buildUrl = (baseUrl: string, path: string) => {
	const normalizedBase = baseUrl.replace(/\/$/, '');
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${normalizedBase}${normalizedPath}`;
};


export const apiFetch = async <T>(
	path: string,
	init: RequestInit = {},
	options: ApiClientOptions = {},
): Promise<T> => {
	const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
	if (!baseUrl) {
		throw new Error(
			'Missing NEXT_PUBLIC_API_BASE_URL. Set it in .env.local (e.g. http://localhost:8080).',
		);
	}

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(options.defaultHeaders ?? {}),
		...(init.headers ?? {}),
	};

	const res = await fetch(buildUrl(baseUrl, path), {
		...init,
		headers,
		cache: init.cache ?? 'no-store',
	});

	const contentType = res.headers.get('content-type') ?? '';
	const isJson = contentType.includes('application/json');
	const body = isJson ? await res.json().catch(() => undefined) : await res.text();

	if (!res.ok) {
		throw new ApiError(
			`API request failed: ${res.status} ${res.statusText}`,
			res.status,
			body,
		);
	}

	return body as T;
};
