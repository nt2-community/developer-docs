<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import MermaidHydrate from '$lib/MermaidHydrate.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { navSections } from '$lib/nav';
	import type { LayoutData } from './$types';

	const { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	function navHref(href: string): string {
		return `${base}${href}`;
	}
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="mx-auto flex w-full max-w-6xl items-center gap-4 px-4">
		<a
			class="btn btn-ghost btn-sm shrink-0 text-base-content/70"
			href={data.meta.communityHomeUrl}
			rel="noopener noreferrer"
		>
			← NT² Community
		</a>
		<a href="{base}/micro-apps/overview" class="text-lg font-semibold text-primary"
			>{data.meta.siteTitle}</a
		>
		<div class="flex-1"></div>
		<ThemeToggle />
		<a class="btn btn-outline btn-sm" href={data.meta.vaultMarketingUrl} rel="noopener noreferrer"
			>Get Vault</a
		>
	</div>
</div>

<div class="mx-auto flex w-full max-w-6xl gap-8 px-4 py-8">
	<aside class="hidden w-56 shrink-0 lg:block">
		<nav class="sticky top-8 space-y-6 text-sm">
			{#each navSections as section (section.title)}
				<div>
					<p class="mb-2 font-semibold uppercase tracking-wide text-base-content/50">
						{section.title}
					</p>
					<ul class="space-y-1">
						{#each section.items as item (item.href)}
							<li>
								<a
									class="block rounded-lg px-2 py-1.5 hover:bg-base-300 {page.url.pathname ===
									navHref(item.href)
										? 'bg-base-300 font-medium text-primary'
										: 'text-base-content/80'}"
									href={navHref(item.href)}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>

	<main class="min-w-0 flex-1">
		{@render children()}
		<MermaidHydrate />
	</main>
</div>

<footer class="border-t border-base-300 bg-base-100 py-6 text-center text-sm text-base-content/60">
	<p>
		<a class="link" href={data.meta.communityHomeUrl} rel="noopener noreferrer">NT² Community</a>
		·
		<a class="link" href={data.meta.microAppsCatalogUrl} rel="noopener noreferrer"
			>Micro-apps catalog</a
		>
		·
		<a class="link" href={data.meta.templateCatalogUrl} rel="noopener noreferrer"
			>Template catalog</a
		>
		·
		<a class="link" href={data.meta.communityDiscordUrl} rel="noopener noreferrer">Discord</a>
		·
		<a class="link" href="https://github.com/nt2-community/developer-docs">Source on GitHub</a>
	</p>
</footer>
