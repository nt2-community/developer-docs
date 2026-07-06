---
title: Quick start
description: Bundle layout, manifest, and minimal SDK client.
---

## 2. Quick start

### Bundle layout

```
my-app/
├── manifest.json
├── index.html # entry.path
├── app.js # optional split assets
└── styles.css
```

Pack as `my-app.nt2app` (zip) for distribution. The host extracts to `vaults/{vaultId}/micro-apps/{appId}/`.

### Example manifest

See the pilot app `hello/manifest.json`:

```json
{
	"id": "my-expense-tracker",
	"version": "1.0.0",
	"sdkVersion": "1.0.0",
	"publisher": "did:key:z6Mk…",
	"signature": "<base64-or-multibase-signature-over-canonical-manifest-bytes>",
	"permissions": [
		"vault:status",
		"items:list:note",
		"items:create:note"
	],
	"entry": {
		"type": "iframe",
		"path": "index.html",
		"integrity": "sha384-…"
	},
	"routes": [{ "path": "/", "label": "Expenses" }],
	"minHostVersion": "0.1.0"
}
```

| Field | Notes |
|-------|-------|
| `id` | Stable slug — **never rename** after publish |
| `sdkVersion` | Semver of `@nt2/vault-sdk-protocol` you built against |
| `publisher` | Your Vault Key DID (`did:key:…`) — used to verify `signature` |
| `permissions` | Minimum slugs required (see [§3.2](#32-permissions)) |
| `entry.integrity` | **SHA-384** SRI hash of entry file bytes (`sha384-…`) |
| `routes` | Optional nav entries in vault shell after install |

### Minimal SDK client

The pilot `hello/index.html` shows a vanilla JS client. Pattern:

1. Generate a UUID `id` per request.
2. `window.parent.postMessage({ protocolVersion: 1, id, type, … }, '*')`.
3. Listen for `{ id, type: 'OK' | 'ERR', … }` on `window.addEventListener('message', …)`.
4. Enforce a timeout (e.g. 10 s) so the UI never hangs.

Use `@nt2/vault-sdk-protocol` types in TypeScript projects for compile-time safety. Pin `PROTOCOL_VERSION` from the package — do not hard-code a stale integer.

### Development without a full install

---

Replace the placeholder manifest above with your own app id, permissions, and integrity hash.

### Pilot manifest (reference)

```json
{
	"id": "nt2-app-hello",
	"version": "0.0.1",
	"sdkVersion": "1.0.0",
	"publisher": "did:key:z6MkdevHelloFixture000000000000000000000000000000",
	"permissions": ["vault:status", "items:list:note", "items:create:note"],
	"entry": {
		"type": "iframe",
		"path": "index.html",
		"integrity": "sha384-ek3vaFKe0ug4SP1+PO1ZrjN1RI8aZqQPGwD/O33IfNvCaVmbo8Q89b7y4QWREcEX"
	},
	"routes": [{ "path": "/", "label": "Hello" }],
	"minHostVersion": "0.0.1"
}
```

Install the **nt2-app-hello** listing from the [micro-app catalog](https://nt2-community.github.io/micro-apps-catalog/) to study a signed pilot bundle.
