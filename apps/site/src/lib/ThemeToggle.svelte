<script lang="ts">
	import { onMount } from 'svelte';
	import { getActiveTheme, setTheme, type Theme } from '$lib/theme';

	let theme = $state<Theme>('light');

	onMount(() => {
		theme = getActiveTheme();
	});

	function toggle() {
		theme = theme === 'light' ? 'dark' : 'light';
		setTheme(theme);
	}
</script>

<button
	type="button"
	class="btn btn-ghost btn-sm btn-circle"
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	onclick={toggle}
>
	{#if theme === 'dark'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	{/if}
</button>
