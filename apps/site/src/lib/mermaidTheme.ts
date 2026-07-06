import type { Theme } from '$lib/theme';

/** Mermaid only allows themeVariables on the `base` theme. */
export function mermaidThemeConfig(siteTheme: Theme) {
	if (siteTheme === 'dark') {
		return {
			theme: 'base' as const,
			themeVariables: {
				darkMode: true,
				background: '#1d232a',
				primaryColor: '#2a323c',
				primaryTextColor: '#e7e9ea',
				primaryBorderColor: '#6b7280',
				secondaryColor: '#2a323c',
				secondaryTextColor: '#e7e9ea',
				secondaryBorderColor: '#6b7280',
				tertiaryColor: '#1d232a',
				tertiaryTextColor: '#e7e9ea',
				tertiaryBorderColor: '#6b7280',
				lineColor: '#d1d5db',
				textColor: '#e7e9ea',
				mainBkg: '#2a323c',
				nodeBorder: '#6b7280',
				clusterBkg: '#2a323c',
				clusterBorder: '#6b7280',
				titleColor: '#e7e9ea',
				edgeLabelBackground: '#1d232a'
			}
		};
	}

	return {
		theme: 'base' as const,
		themeVariables: {
			darkMode: false,
			background: '#ffffff',
			primaryColor: '#e8e8e8',
			primaryTextColor: '#18181b',
			primaryBorderColor: '#a1a1aa',
			secondaryColor: '#f4f4f5',
			secondaryTextColor: '#18181b',
			secondaryBorderColor: '#a1a1aa',
			tertiaryColor: '#fafafa',
			tertiaryTextColor: '#18181b',
			tertiaryBorderColor: '#a1a1aa',
			lineColor: '#52525b',
			textColor: '#18181b',
			mainBkg: '#e8e8e8',
			nodeBorder: '#a1a1aa',
			clusterBkg: '#f4f4f5',
			clusterBorder: '#a1a1aa',
			titleColor: '#18181b',
			edgeLabelBackground: '#ffffff'
		}
	};
}
