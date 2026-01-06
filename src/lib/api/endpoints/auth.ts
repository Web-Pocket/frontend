import { apiFetch } from "../client";

export type SignupRequest = {
	nickname: string;
};

export type UserMeResponse = {
	id: string;
	nickname: string;
};

export const completeSignup = (body: SignupRequest) =>
	apiFetch<void>("/api/auth/signup", {
		method: "POST",
		body: JSON.stringify(body),
	});

export const getMe = () =>
	apiFetch<UserMeResponse>("/api/auth/me", {
		method: "GET",
	});

export const getOAuthAuthorizeUrl = (provider: string) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
	const path = `/oauth2/authorization/${encodeURIComponent(provider)}`;
	return `${baseUrl}${path}`;
};
