declare module '*.md' {
	import type { SvelteComponent } from 'svelte';
	export default class Comp extends SvelteComponent {}
}

declare module '@content/*' {
	import type { SvelteComponent } from 'svelte';
	export default class Comp extends SvelteComponent {}
}
