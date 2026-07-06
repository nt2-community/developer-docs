<script lang="ts">
	import { onMount } from 'svelte';
	import { getActiveTheme } from '$lib/theme';
	import { mermaidThemeConfig } from '$lib/mermaidTheme';

	const MERMAID_SELECTOR = '.prose-docs pre.mermaid';

	function stashSources() {
		for (const el of document.querySelectorAll<HTMLElement>(MERMAID_SELECTOR)) {
			if (!el.dataset.mermaidSource) {
				el.dataset.mermaidSource = el.textContent?.trim() ?? '';
			}
		}
	}

	function restoreSources() {
		for (const el of document.querySelectorAll<HTMLElement>(MERMAID_SELECTOR)) {
			const source = el.dataset.mermaidSource;
			if (!source) continue;
			el.textContent = source;
			el.removeAttribute('data-processed');
		}
	}

	async function renderMermaid() {
		const { default: mermaid } = await import('mermaid');
		const siteTheme = getActiveTheme();
		const { theme, themeVariables } = mermaidThemeConfig(siteTheme);

		stashSources();
		restoreSources();

		mermaid.initialize({
			startOnLoad: false,
			theme,
			themeVariables,
			securityLevel: 'strict',
			fontFamily: 'ui-sans-serif, system-ui, sans-serif'
		});

		await mermaid.run({ querySelector: MERMAID_SELECTOR });
	}

	onMount(() => {
		void renderMermaid();

		const observer = new MutationObserver(() => {
			void renderMermaid();
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		return () => observer.disconnect();
	});
</script>
