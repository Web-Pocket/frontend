import { apiFetch } from '../client';

export type HealthResponse = {
	status: string;
};

// Example Spring endpoint: GET /actuator/health

export const getHealth = () =>
	apiFetch<HealthResponse>('/actuator/health', {
		method: 'GET',
	});

