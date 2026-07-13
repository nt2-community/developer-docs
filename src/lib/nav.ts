export type NavItem = {
	href: string;
	label: string;
};

export type NavSection = {
	title: string;
	items: NavItem[];
};

export const navSections: NavSection[] = [
	{
		title: 'Micro-apps',
		items: [
			{ href: '/micro-apps/overview', label: 'Overview' },
			{ href: '/micro-apps/quick-start', label: 'Quick start' },
			{ href: '/micro-apps/sdk', label: 'SDK & permissions' },
			{ href: '/micro-apps/security', label: 'Security' },
			{ href: '/micro-apps/catalog', label: 'Catalog submission' }
		]
	},
	{
		title: 'Templates',
		items: [
			{ href: '/templates/nt2tpl', label: '.nt2tpl format' },
			{ href: '/templates/catalog', label: 'Template catalog' }
		]
	},
	{
		title: 'Field packs',
		items: [{ href: '/field-packs/overview', label: 'Overview' }]
	}
];

export function findNavLabel(pathname: string): string | undefined {
	for (const section of navSections) {
		for (const item of section.items) {
			if (item.href === pathname) return item.label;
		}
	}
	return undefined;
}
