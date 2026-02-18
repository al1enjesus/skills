---
name: m365-calendar
description: Microsoft 365 calendar automation via Microsoft Graph for both M365 Business (work/school) and M365 Home/Consumer (hotmail.com/outlook.com). Use when listing upcoming events, searching calendar entries (e.g. “Mittagessen”), checking attendee response status (accepted/declined/tentative), creating or updating meetings, moving events to a new time, or troubleshooting Graph/MSAL auth/token cache for calendar access. Supports delegated auth via device code flow and stores per-profile token cache locally. **Token cost:** ~600-1.5k tokens per use (skill body ~2-3k tokens, Graph calls + light parsing).
---

# M365 Calendar (Microsoft Graph)

Keep this skill lean: do the heavy lifting with the bundled scripts.

## Security / boundaries

- Never commit or share token caches or client secrets.
- Default secret location (per machine): `~/.openclaw/secrets/m365-calendar/`

## Quick start

1) Authenticate (choose profile/tenant type):

```bash
# Business / work accounts
node skills/m365-calendar/scripts/auth-devicecode.mjs --profile business --tenant organizations --email you@company.com

# Consumer / home accounts (hotmail.com / outlook.com)
node skills/m365-calendar/scripts/auth-devicecode.mjs --profile home --tenant consumers --email you@outlook.com
```

2) List remaining events today (Europe/Vienna):

```bash
node skills/m365-calendar/scripts/list.mjs --profile tom-business --when today --tz Europe/Vienna
```

3) Search and show attendee responses:

```bash
node skills/m365-calendar/scripts/search.mjs --profile tom-business --query "Mittagessen" --when tomorrow --tz Europe/Vienna
node skills/m365-calendar/scripts/get-event.mjs --profile tom-business --id <EVENT_ID> --tz Europe/Vienna
```

4) Move an event to a new time:

```bash
node skills/m365-calendar/scripts/move-event.mjs --profile tom-business --id <EVENT_ID> \
  --start "2026-02-19T12:30" --end "2026-02-19T13:00" --tz Europe/Vienna
```

## Operational workflow (recommended)

When the user asks to change a meeting:

1) Identify the event deterministically (search by day-range + subject; confirm ID).
2) Read the event and report attendee response statuses.
3) Patch start/end.
4) Re-read the event and confirm the final start/end + any response resets.

## Notes on Business vs Home (Consumer)

- Use `--tenant organizations` for work/school accounts (most “business” tenants).
- Use `--tenant consumers` for hotmail/outlook.com personal accounts.
- Use `--tenant common` if you explicitly want one profile that can log into either type.

**Important:** Consumer (MSA) login requires an app registration that allows **personal Microsoft accounts**.
If you see `invalid_grant` during device-code login on `consumers`, re-run auth with a `--clientId` from an app configured for:
“Accounts in any organizational directory and personal Microsoft accounts”.

If silent token acquisition fails, re-run `auth-devicecode.mjs` for that profile.
