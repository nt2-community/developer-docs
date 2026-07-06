# Contributing to NT² developer docs

This site publishes **author-facing excerpts** of NT² ecosystem contracts. Executable acceptance criteria remain in the private `nt2` monorepo `specs/` tree.

## PR workflow

1. Fork `nt2-community/developer-docs`.
2. Edit Markdown under `content/` (English only in v1).
3. Open a PR — CI runs `npm run check`.
4. Maintainers review for accuracy against shipped vault behavior.

## Syncing from private specs

For bulk updates, NT² maintainers run `npm run community:sync-developer-docs` in the private monorepo. That script rewrites internal links to public `nt2-community.github.io` URLs. Do not commit private-repo-relative paths in published artifacts.

## Style

- English prose, accessible headings
- Link to live catalog sites (`/micro-apps-catalog/`, `/category-templates-catalog/`) rather than duplicating catalog data
- No third-party trackers or fonts ([DEC-024](https://github.com/nt2/nt2/blob/main/docs/DECISIONS.md#dec-024-no-third-party-scripts))

## Questions

Join [NT² Community on Discord](https://discord.gg/K3YmGgwvV).
