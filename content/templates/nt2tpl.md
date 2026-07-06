---
title: .nt2tpl format
description: Offline category template artifact format for NT² Vault.
---

# .nt2tpl interchange format

`.nt2tpl` files are JSON artifacts with extension **`.nt2tpl`** and MIME type **`application/vnd.nt2.template+json`**.

## Artifact kinds

| kind | Contains |
|------|----------|
| `categoryTemplate` | One or more `categories[]` definitions |
| `displayProfilePreset` | Reusable display chrome recipes |
| `bundle` | Both categories and presets |

## Shared envelope (required fields)

- `artifactKind`, `packId`, `publisher`, `displayName`, `version`
- `templateProtocol` (currently **3**)
- `registryVersion` — must match a field registry version the vault supports
- `minAppVersion` — minimum NT² Vault build

## Import path

1. Download a `.nt2tpl` from the [template catalog](https://nt2-community.github.io/category-templates-catalog/)
2. Open [Vault → Settings → Templates](https://se.nt2.me/settings/templates)
3. Import the downloaded file

Community templates are validated against the **built-in field type catalog** only — unknown field types are rejected.
