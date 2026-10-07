import { cp, mkdir, copyFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) {
  await copyFile(new URL(file, root), new URL(`dist/${file}`, root));
}
await cp(new URL('assets/', root), new URL('dist/assets/', root), { recursive: true, filter: source => !source.endsWith('fonts-source.css') });
console.log('Built dist/ — ready for any static website host.');
