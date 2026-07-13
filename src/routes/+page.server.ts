import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const prerender = true;

export function load() {
	redirect(307, `${base}/micro-apps/overview`);
}
