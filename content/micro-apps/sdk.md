---
title: Vault SDK reference
description: RPC types, permissions, and feed SDK summary.
---

## 3. Vault SDK reference

### 3.1 RPC types (v1)

| Request `type` | Permission required | Purpose |
|----------------|---------------------|---------|
| `PING` | (none) | Connectivity check |
| `GET_STATUS` | `vault:status` | `vaultId`, `displayName`, `isWriter`, unlocked state |
| `ITEMS_LIST` | `items:list:{category}` | Paged list — id, title, category metadata only |
| `ITEMS_READ` | `items:read:{category}` | Decrypted fields (host applies read allowlist) |
| `ITEMS_CREATE` | `items:create:{category}` | Create item — kernel encrypts payload |
| `ITEMS_UPDATE` | `items:update:{category}` | Partial merge update (Writer tab only) |
| `PLATFORM_SHARE_TEXT` | `platform:share-text` | Host proxies OS share sheet |

`ITEMS_UPDATE` v1 semantics: **only keys present in `payload` are merged**; omitted keys stay unchanged. You cannot change `category` or `id` via update.

### 3.2 Permissions

Declare every slug you use in `manifest.permissions`. The install consent dialog shows them to the user; unused slugs are grounds for catalog rejection.

| Slug pattern | Meaning |
|--------------|---------|
| `vault:status` | Read vault display name and Writer status |
| `items:list:{category}` | List non-sensitive metadata for category |
| `items:read:{category}` | Read decrypted fields (masked by host) |
| `items:create:{category}` | Create items |
| `items:update:{category}` | Update items (Writer only) |
| `platform:share-text` | Share plain text via host |

**Rules:** exact category slugs only (e.g. `note`, `credential`); no `*` wildcards; request the **narrowest** set (see [I — Minimal permissions](#i--minimal-permissions)).

For each slug in a catalog listing, include **one sentence** explaining why it is needed (e.g. "`items:create:note` — save expense memos as secure notes").

### 3.3 What you cannot do via SDK

- Export or receive `CryptoKey` handles or master password material
- Raw SQL, OPFS paths, attachment blob bytes, or Tauri `plugin-fs` / `plugin-sql`
- Arbitrary HTTP from the host on your behalf (except future explicit SDK methods)
- Bypass permission checks by calling kernel modules — there is no escape hatch

### 3.4 Feed protocol SDK

> **Spec:** [128c — Feed micro-app SDK] · **Protocol:** [`@nt2/vault-sdk-protocol`] feed RPC types

Feed apps read and publish **opaque application bytes** — the host handles encryption, signing, and relay upload. You define your own JSON (or other) schema inside `applicationPayload`; the kernel never validates it.

#### Permissions

```json
{
  "permissions": ["vault:status", "feed:read", "feed:publish"]
}
```

| Slug | Meaning |
|------|---------|
| `feed:read` | List feeds, page entries, mark read/pin, subscribe to live notifications |
| `feed:publish` | Publish entries on **publisher-owned** feeds (Writer tab only) |
| `feed:manage` | Create or archive feeds (Writer tab only) |
| `contactProfile:read` | Read decrypted contact profile views for connected contacts (Writer not required) |

#### Reader flow

1. `FEEDS_LIST` — discover feeds this vault owns or subscribes to.
2. `FEED_ENTRIES_LIST` with `feedId` — paginated `FeedEntryView` rows; `applicationPayload` is base64url decrypted bytes.
3. `SUBSCRIBE_FEED_ENTRIES` — receive `FEED_ENTRY_NOTIFY` pushes (metadata only); call `FEED_ENTRY_READ` for full payload.
4. Revoked entries appear with `revokedAt` set and `applicationPayload: ""` (empty string).

#### Publisher flow

1. Grant `feed:publish` (and `feed:manage` if creating feeds via SDK).
2. `FEED_ENTRY_PUBLISH` with base64url-encoded application bytes.
3. Optional `hints.contentType` (e.g. `application/json`) is passed to the wire artifact only — not validated by the host.

#### Application JSON examples (non-normative)

Both examples use the same RPC types; only your in-iframe parsing differs.

**Microblog reader** — text post body:

```javascript
// After FEED_ENTRY_READ → decode base64url applicationPayload
const bytes = base64UrlToBytes(entry.applicationPayload);
const post = JSON.parse(new TextDecoder().decode(bytes));
// Expected shape you define: { body: string, lang?: string }
renderPost(post.body);
```

Example publish payload you might send:

```json
{ "body": "Hello subscribers!", "lang": "en" }
```

**Shop promotions viewer** — promotion card:

```javascript
const promo = JSON.parse(new TextDecoder().decode(base64UrlToBytes(entry.applicationPayload)));
// Expected shape you define: { title, discountPct, validUntil }
renderPromo(promo.title, promo.discountPct, promo.validUntil);
```

Example publish payload:

```json
{ "title": "Summer sale", "discountPct": 20, "validUntil": "2026-08-31" }
```

#### Live notifications

Prefer `SUBSCRIBE_FEED_ENTRIES` for feed-only apps. Alternatively, with both `feed:read` and item permissions, `SUBSCRIBE_EVENTS` with `aggregateTypes: ['feed-entry']` delivers `EVENT_NOTIFY` with `changeType: 'feedEntry.projected'`.

Push payloads never include decrypted bytes — always fetch via `FEED_ENTRY_READ` after `FEED_ENTRY_NOTIFY`.

#### Contact profile read ([spec 129])

Grant `contactProfile:read` when your app needs identity context for a **specific contact** the user has already accepted (consent-governed profile share).

```json
{ "type": "CONTACT_PROFILE_GET", "id": "req-1", "contactId": "<secure-contact-uuid>" }
```

Response payload (`OK`):

```json
{
  "fields": { "displayName": "Sam", "role": "Engineer" },
  "issuanceClaims": [{ "issuanceId": "…", "programKind": "membership", "claimKey": "fullName", "claimValue": "Sam Example" }]
}
```

Returns `null` when the vault is locked or no active profile view exists — do not treat `null` as an error.

Raw `encryptedPayload` / `iv` values are never exposed to the sandbox.

---
