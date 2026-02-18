#!/usr/bin/env node
import fs from 'node:fs';
import { PublicClientApplication } from '@azure/msal-node';
import { ensureSecretsDir, profilePaths, writeJson, getArg, mustGetArg } from './_lib.mjs';

/**
 * Device code auth for delegated Graph calendar scopes.
 *
 * Examples:
 *  node skills/m365-calendar/scripts/auth-devicecode.mjs --profile tom-business --tenant organizations --email radman@e-ola.com
 *  node skills/m365-calendar/scripts/auth-devicecode.mjs --profile tom-home --tenant consumers --email thomas.radman@hotmail.com
 */

const profile = mustGetArg('profile');
const tenant = getArg('tenant', 'organizations'); // organizations|consumers|common|<tenantId>
const email = getArg('email', undefined);
const clientId = getArg('clientId', '22072cd2-7ac6-45a5-a5ac-a4e474cadbe2'); // default: OpenClaw Calendar app

// Minimum scopes for our use-cases
const scopes = [
  'Calendars.Read',
  'Calendars.ReadWrite',
  'offline_access',
  'openid',
  'profile',
  'email',
];

ensureSecretsDir();
const { cfgPath, cachePath } = profilePaths(profile);

let cache = fs.existsSync(cachePath) ? fs.readFileSync(cachePath, 'utf8') : '';

const pca = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenant}`,
  },
  cache: {
    cachePlugin: {
      beforeCacheAccess: async (ctx) => {
        if (cache) ctx.tokenCache.deserialize(cache);
      },
      afterCacheAccess: async (ctx) => {
        if (ctx.cacheHasChanged) {
          cache = ctx.tokenCache.serialize();
          fs.writeFileSync(cachePath, cache, 'utf8');
        }
      },
    },
  },
});

const result = await pca.acquireTokenByDeviceCode({
  scopes,
  deviceCodeCallback: (resp) => {
    // Important: keep output human-copyable across MSAL versions.
    if (resp.message) {
      console.log(resp.message);
      return;
    }
    const uri = resp.verificationUri || resp.verificationUriComplete || resp.verification_uri;
    const code = resp.userCode || resp.user_code;
    console.log(`To sign in, use a web browser to open ${uri} and enter the code ${code}`);
    if (resp.verificationUriComplete) console.log(`Direct link: ${resp.verificationUriComplete}`);
  },
});

writeJson(cfgPath, {
  clientId,
  tenant,
  email,
  scopes: ['Calendars.Read', 'Calendars.ReadWrite', 'offline_access'],
  authFlow: 'device_code_delegated',
  createdAt: new Date().toISOString(),
  notes: 'Token cache stored separately. Do not commit secrets.',
});

console.log(`OK: authenticated profile=${profile} tenant=${tenant} user=${result?.account?.username || 'unknown'}`);
