---
title: Security guidelines
description: Security obligations for micro-app authors.
---

## 5. Security guidelines

### H — Trust boundary

| ID | Rule |
|----|------|
| **H1** | **MUST** access vault data **only** via Vault SDK `postMessage` — **MUST NOT** touch `window.parent.localStorage`, `indexedDB`, OPFS, `__TAURI_INTERNALS__`, or host plugins. |
| **H2** | **MUST NOT** attempt to export vault `CryptoKey` material via `crypto.subtle.exportKey` or any other path. |
| **H3** | **MUST NOT** load remote JavaScript at runtime (`import('https://…')`, dynamic `<script src>`, `eval` of remote strings). |
| **H4** | **MUST NOT** embed cross-origin iframes to external domains. |
| **H5** | **MUST NOT** put master password, keys, or decrypted secrets in SDK **request** payloads — send structured item fields only; kernel handles crypto. |

The sandbox limits blast radius but **does not** sanitize your HTML — you are responsible for DOM XSS in your own bundle.

### I — Minimal permissions

| ID | Rule |
|----|------|
| **I1** | **MUST** list only permissions the app actually calls. |
| **I2** | **MUST** document per-slug rationale in catalog metadata. |
| **I3** | **MUST NOT** use wildcard category permissions. |
| I4 | **SHOULD** prefer category-specific slugs (`items:list:note`) over broader access. |
| I5 | **SHOULD** pin `sdkVersion` and handle `PROTOCOL_MISMATCH` (see [L3](#l--supply-chain--bundle-integrity)). |

### J — No secret exfiltration

| ID | Rule |
|----|------|
| **J1** | **MUST NOT** log decrypted payloads or sensitive user input in production builds. |
| **J2** | **MUST NOT** send vault data to external servers — local-first and zero-knowledge apply to your app too (). |
| **J3** | **MUST** clear in-memory secrets on `LOCKED` / teardown. |
| **J4** | **MUST NOT** embed API keys or credentials in the bundle (users can inspect local files). |
| J5 | **SHOULD NOT** persist SDK-returned plaintext in `localStorage` / `sessionStorage`. |

### K — Sensitive data handling

| ID | Rule |
|----|------|
| **K1** | **MUST NOT** persist decrypted SDK payloads across sessions — re-fetch after unlock. |
| **K2** | **MUST NOT** copy sensitive values to clipboard without explicit user action and clear feedback. |
| **K3** | **MUST** treat `LOCKED` as a hard stop — halt in-flight calls; do not auto-retry writes. |
| K4 | **SHOULD** auto-clear clipboard after 30–60 s when copying secrets (N12). |
| K5 | **SHOULD** obscure sensitive fields when `document.visibilityState === 'hidden'`. |

### L — Supply chain and bundle integrity

| ID | Rule |
|----|------|
| **L1** | **MUST** set `entry.integrity` to a valid **SHA-384** SRI hash (`sha384-…`) of the entry file; host rejects mismatch at install. |
| **L2** | **MUST** sign the manifest with your publisher **Vault Key DID**; host verifies before install (). |
| **L3** | **MUST** pin `sdkVersion` to the protocol package you tested against; show a user-readable "please update" message on `PROTOCOL_MISMATCH`. |
| **L4** | **MUST NOT** ship a vendored `@nt2/vault-sdk-protocol` older than the host's `PROTOCOL_VERSION` at submission time. |
| L5 | **SHOULD** ship `CHANGELOG.md` in your source repo for reviewer diffs. |

**Compute SHA-384 integrity (example):**

```bash
# Node one-liner for entry file bytes → base64 digest → sha384- prefix
node -e "
const fs=require('fs');const c=fs.readFileSync('index.html');
const h=require('crypto').createHash('sha384').update(c).digest('base64');
console.log('sha384-'+h);
"
```

### M — Writer awareness

Only one browser tab is the **Writer** for mutations.

| ID | Rule |
|----|------|
| **M1** | **MUST** handle `NOT_WRITER` with clear copy and **MUST NOT** retry mutations in a tight loop. |
| **M2** | **MUST NOT** assume the current tab is always Writer — check `GET_STATUS` / error codes. |
| M3 | **SHOULD** offer a manual Retry button after `NOT_WRITER`. |

Suggested copy: *"Another tab is editing this vault. Switch to that tab or close extra tabs, then try again."*

### N — Input validation

| ID | Rule |
|----|------|
| **N1** | **MUST** validate required fields before `ITEMS_CREATE` / `ITEMS_UPDATE` — prevent `BAD_REQUEST` via client checks. |
| **N2** | **MUST** escape or sanitize user-controlled HTML before inserting into the DOM. |
| N3 | **SHOULD** show inline field errors instead of generic toasts. |

---

See also UX integration norms in the [Quick start](https://nt2-community.github.io/developer-docs/micro-apps/quick-start) and [SDK reference](https://nt2-community.github.io/developer-docs/micro-apps/sdk).
