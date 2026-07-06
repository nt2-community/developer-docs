import { siteMeta } from '$lib/site';

export const prerender = true;

export function load() {
	return { meta: siteMeta };
}
