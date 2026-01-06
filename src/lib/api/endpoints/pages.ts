import { apiFetch } from "../client";

export type PageCategory = string;

export type PageSummary = {
	id: string;
	name: string;
	intro: string;
	category: PageCategory;
};

export type PageDetail = PageSummary;

export type CreatePageRequest = {
	name: string;
	intro: string;
	category: PageCategory;
};

export const createPage = (body: CreatePageRequest) =>
	apiFetch<PageDetail>("/api/pages", {
		method: "POST",
		body: JSON.stringify(body),
	});

export const listPages = (category?: PageCategory) => {
	const query = category ? `?category=${encodeURIComponent(category)}` : "";
	return apiFetch<PageSummary[]>(`/api/pages${query}`, {
		method: "GET",
	});
};

export const getPageById = (id: string) =>
	apiFetch<PageDetail>(`/api/pages/${encodeURIComponent(id)}`, {
		method: "GET",
	});
