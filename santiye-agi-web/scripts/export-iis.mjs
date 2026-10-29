import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

if (!process.argv.includes('--prepare-only')) {
  const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
    stdio: 'inherit', env: { ...process.env, STATIC_EXPORT: '1', NEXT_TELEMETRY_DISABLED: '1', TENDERS_FEED_URL: '' },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// The original HTML remains available for existing GitHub Pages / mobile legal links.
const legacy = ['index.html', 'apple-touch-icon.png', 'icon-512.png', 'og-image.png', 'llms-full.txt'];
mkdirSync('out/santiye-agi', { recursive: true });
for (const name of legacy) if (existsSync('../' + name)) writeFileSync('out/santiye-agi/' + name, readFileSync('../' + name));

const aliases = {
  privacy: '/gizlilik/', 'privacy.html': '/gizlilik/', 'hakkimizda.html': '/hakkimizda/',
  'iletişim': '/iletisim/', 'hakkımızda': '/hakkimizda/', 'sosyal-akış': '/sosyal-akis/',
};
for (const [alias, target] of Object.entries(aliases)) {
  const file = alias.endsWith('.html') ? 'out/' + alias : 'out/' + alias + '/index.html';
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `<!doctype html><html lang="tr"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>Şantiye Ağı</title><a href="${target}">Devam et</a></html>`);
}
writeFileSync('out/web.config', readFileSync('iis/web.config'));
console.log('IIS static export ready: out/ (no Node server required).');
