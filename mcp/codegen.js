#!/usr/bin/env node
// Minimal Playwright codegen harness that stores your steps to a clean file.
// Usage examples:
//   node codegen.js --url=https://example.com
//   APP_URL=https://example.com node codegen.js
//   node codegen.js --module=Demo --scenario=Learner_Login --name=LoginFlow

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

const argv = parseArgs(process.argv.slice(2));
const APP_URL = argv.url || process.env.APP_URL || '';
const MODULE = argv.module || process.env.MODULE || 'Module';
const SCENARIO = argv.scenario || process.env.SCENARIO || 'Scenario';
const NAME = argv.name || process.env.TEST_NAME || 'Recording';
const DRY = argv.dry === 'true' || process.argv.includes('--dry-run');
// Storage controls
const SAVE_STORAGE = !(
  argv['no-storage'] === 'true' ||
  process.argv.includes('--no-storage') ||
  String(argv.storage || process.env.SAVE_STORAGE || 'true').toLowerCase() === 'false'
);
// Domain filtering for storage.json
let allowedDomains = [];
try {
  const defaultHost = APP_URL ? new URL(APP_URL).hostname : '';
  const fromArgs = (argv['allow-domains'] || process.env.ALLOWED_DOMAINS || defaultHost)
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
  allowedDomains = fromArgs;
} catch (_) {}

const outDir = path.resolve(__dirname, 'recordings');
fs.mkdirSync(outDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const baseFile = `${MODULE}__${SCENARIO}__${NAME}__${ts}`;
const targetFile = path.join(outDir, `${baseFile}.spec.ts`);
const metaFile = path.join(outDir, `${baseFile}.meta.json`);
const storageFile = path.join(outDir, `${baseFile}.storage.json`);

const meta = {
  module: MODULE,
  scenario: SCENARIO,
  name: NAME,
  appUrl: APP_URL,
  createdAt: new Date().toISOString(),
  note: 'This file captures basic metadata for the recording session.',
  saveStorage: SAVE_STORAGE,
  allowedDomains
};
fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

if (DRY) {
  console.log('[DRY RUN] Would launch Playwright codegen with output:', targetFile);
  if (APP_URL) console.log('[DRY RUN] URL:', APP_URL);
  process.exit(0);
}

// Build playwright codegen args
// We request the code to be emitted to our target file using --output.
// If APP_URL is provided, open it immediately.
const args = ['codegen'];
if (APP_URL) args.push(APP_URL);
args.push('--output', targetFile);
// Add sensible defaults to help create clear steps
args.push('--target=playwright-test');
if (SAVE_STORAGE) {
  args.push(`--save-storage=${storageFile}`);
}

console.log('Launching Playwright codegen...');
console.log('Output file:', targetFile);
if (APP_URL) console.log('Start URL:', APP_URL);
console.log('Save storage:', SAVE_STORAGE ? storageFile : 'disabled');
if (allowedDomains.length) console.log('Allowed storage domains:', allowedDomains.join(', '));

// Prefer calling the Playwright CLI JS with Node to avoid .cmd spawning issues on Windows
const pwCliJs = path.resolve(__dirname, 'node_modules', 'playwright', 'cli.js');

// Ensure we pass a valid target
const targetIndex = args.findIndex(a => a.startsWith('--target='));
if (targetIndex >= 0) args[targetIndex] = '--target=playwright-test';
else args.push('--target=playwright-test');

console.log('Using Playwright CLI:', pwCliJs);
const child = spawn(process.execPath, [pwCliJs, ...args], {
  stdio: 'inherit',
  shell: false
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\nRecording saved to: ' + targetFile);
    console.log('Metadata saved to: ' + metaFile);
    if (SAVE_STORAGE && fs.existsSync(storageFile)) {
      try {
        const raw = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
        const domains = allowedDomains;
        const keepCookie = (cookie) => {
          const cd = (cookie.domain || '').toLowerCase();
          const cdNorm = cd.startsWith('.') ? cd.slice(1) : cd;
          return domains.some(d => cdNorm === d || cdNorm.endsWith('.' + d));
        };
        const keepOrigin = (origin) => {
          try {
            const h = new URL(origin.origin).hostname.toLowerCase();
            return domains.some(d => h === d || h.endsWith('.' + d));
          } catch (_) { return false; }
        };
        const beforeC = raw.cookies ? raw.cookies.length : 0;
        const beforeO = raw.origins ? raw.origins.length : 0;
        if (domains.length) {
          if (Array.isArray(raw.cookies)) raw.cookies = raw.cookies.filter(keepCookie);
          if (Array.isArray(raw.origins)) raw.origins = raw.origins.filter(keepOrigin);
          fs.writeFileSync(storageFile, JSON.stringify(raw, null, 2));
          const afterC = raw.cookies ? raw.cookies.length : 0;
          const afterO = raw.origins ? raw.origins.length : 0;
          console.log(`Filtered storage.json: cookies ${beforeC} -> ${afterC}, origins ${beforeO} -> ${afterO}`);
        }
      } catch (e) {
        console.warn('Could not post-process storage.json:', e.message);
      }
    }
    console.log('\nNext steps:');
    console.log('- Review and clean up assertions, locators, and waits.');
    console.log('- Move or import the spec into your tests folder as needed.');
  } else {
    console.error('Playwright codegen exited with code', code);
  }
});
