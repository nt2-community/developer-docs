<script lang="ts">
	import { onMount } from 'svelte';
	import { getActiveTheme } from '$lib/theme';

	onMount(async () => {
		const { default: mermaid } = await import('mermaid');
		const theme = getActiveTheme() === 'dark' ? 'dark' : 'neutral';
		mermaid.initialize({
			startOnLoad: false,
			theme,
			securityLevel: 'strict',
			fontFamily: 'ui-sans-serif, system-ui, sans-serif'
		});
		await mermaid.run({ querySelector: '.prose-docs pre.mermaid' });
	});
</script>
