# NT² Community Developer Docs

Public developer documentation for NT² Vault ecosystem contributors — micro-app authors, category template authors, and field-pack maintainers.

## Published URL

**https://nt2-community.github.io/developer-docs/**

Community hub: https://nt2-community.github.io/

## Content sections

| Path | Topic |
|------|-------|
| `/micro-apps/overview` | Micro-apps trust model |
| `/micro-apps/quick-start` | Hello-world author flow |
| `/micro-apps/sdk` | SDK protocol and permissions |
| `/micro-apps/security` | Security requirements |
| `/micro-apps/catalog` | Catalog submission |
| `/templates/nt2tpl` | `.nt2tpl` interchange format |
| `/templates/catalog` | Template catalog contribution |
| `/field-packs/overview` | Field pack submodule workflow |

## Sync from private monorepo

Normative specs live in the private `nt2` repo. Maintainers refresh Markdown via:

```bash
# In private nt2 repo
npm run community:sync-developer-docs
```

## Local development

```bash
npm install
npm run dev
```

## Contribute

Doc fixes welcome via PR — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
