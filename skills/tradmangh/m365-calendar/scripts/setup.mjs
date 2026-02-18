#!/usr/bin/env node
/**
 * One-command setup wrapper.
 *
 * Example:
 *  node skills/m365-calendar/scripts/setup.mjs --profile tom-home --tenant consumers --email you@outlook.com --tz Europe/Vienna
 */

import { spawnSync } from 'node:child_process';
import { getArg, mustGetArg } from './_lib.mjs';

const profile = mustGetArg('profile');
const tenant = getArg('tenant', 'organizations');
const email = getArg('email', undefined);
const tz = getArg('tz', 'Europe/Vienna');

const authArgs = [
  'skills/m365-calendar/scripts/auth-devicecode.mjs',
  '--profile', profile,
  '--tenant', tenant,
];
if (email) authArgs.push('--email', email);

const r = spawnSync('node', authArgs, { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);

console.log('\nNext: quick smoke tests');
console.log(`  node skills/m365-calendar/scripts/list.mjs --profile ${profile} --when today --tz ${tz}`);
console.log(`  node skills/m365-calendar/scripts/list.mjs --profile ${profile} --when tomorrow --tz ${tz}`);
console.log(`  node skills/m365-calendar/scripts/search.mjs --profile ${profile} --when tomorrow --tz ${tz} --query "Mittagessen"`);
