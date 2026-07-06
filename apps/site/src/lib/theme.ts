export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getActiveTheme(): Theme {
	const current = document.documentElement.getAttribute('data-theme');
	return current === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: Theme) {
	localStorage.setItem(STORAGE_KEY, theme);
	document.documentElement.setAttribute('data-theme', theme);
}
