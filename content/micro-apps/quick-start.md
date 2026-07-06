---
title: Quick start
description: Bundle layout, manifest, and @nt2/vault-sdk client setup.
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
| `sdkVersion` | Semver of **`@nt2/vault-sdk`** you built against (matches npm package version) |
| `publisher` | Your Vault Key DID (`did:key:…`) — used to verify `signature` |
| `permissions` | Minimum slugs required (see [§3.2](#32-permissions)) |
| `entry.integrity` | **SHA-384** SRI hash of entry file bytes (`sha384-…`) |
| `routes` | Optional nav entries in vault shell after install |

### SDK-first client (recommended)

Install the typed client in your bundle build (esbuild, Vite, etc.):

```bash
npm install @nt2/vault-sdk
```

The hello pilot source uses `createVaultClient()` — correlation, timeouts, and typed responses are handled for you:

```typescript
import { createVaultClient, VaultSdkError } from '@nt2/vault-sdk';

const client = createVaultClient();

async function loadNotes() {
	const status = await client.getStatus();
	console.log('Connected:', status.displayName);

	const { rows } = await client.items.forCategory('note').list();
	for (const row of rows) {
		console.log(row.title);
	}
}

async function createNote(title: string) {
	try {
		await client.items.forCategory('note').create({
			title,
			body: 'Created by my micro-app.'
		});
	} catch (error) {
		if (error instanceof VaultSdkError) {
			// Map error.code — see Appendix B
			console.error(error.code, error.message);
		}
	}
}
```

Bundle `@nt2/vault-sdk` into your entry script (see your bundler configuration). Pin `sdkVersion` in `manifest.json` to the same semver as your npm dependency.

For unit tests without a browser host, use `@nt2/vault-sdk/testing` (`createMockVaultSdkHost`).

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
		"integrity": "sha384-placeholder-recomputed-at-build"
	},
	"routes": [{ "path": "/", "label": "Hello" }],
	"minHostVersion": "0.0.1"
}
```

Install the **nt2-app-hello** listing from the [micro-app catalog](https://nt2-community.github.io/micro-apps-catalog/) to study a signed pilot bundle.
