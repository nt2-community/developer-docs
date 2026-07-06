import { visit } from 'unist-util-visit';

/**
 * @param {string} value
 */
function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

/** Turn ```mermaid fences into <pre class="mermaid"> for client-side rendering. */
export function remarkMermaid() {
	return (tree) => {
		visit(tree, 'code', (node, index, parent) => {
			if (node.lang !== 'mermaid' || !parent || index === undefined) return;
			parent.children[index] = {
				type: 'html',
				value: `<pre class="mermaid">${escapeHtml(node.value)}</pre>`
			};
		});
	};
}
