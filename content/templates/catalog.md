---
title: Template catalog
description: How to contribute category templates to the community catalog.
---

# Community template catalog

List shareable `.nt2tpl` templates via pull request on [nt2-community/category-templates-catalog](https://github.com/nt2-community/category-templates-catalog).

| Resource | URL |
|----------|-----|
| Browse site | https://nt2-community.github.io/category-templates-catalog/ |
| Machine index | https://nt2-community.github.io/category-templates-catalog/catalog.json |
| Contributor guide | [CONTRIBUTING](https://github.com/nt2-community/category-templates-catalog/blob/main/CONTRIBUTING.md) |

Each listing pairs a catalog entry JSON with a `.nt2tpl` file. CI validates schema and field types against the published allowlist in that repository.

Templates do **not** add new field types — compose existing `FieldTypeId` values from the global registry. For new field types, see [Field packs overview](https://nt2-community.github.io/developer-docs/field-packs/overview).
