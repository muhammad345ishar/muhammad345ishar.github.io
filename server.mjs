import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL(process.argv.includes('--dist') ? './dist/' : './', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const publicPath = pathname === '/' ? '/index.html' : pathname;
    // Serve only website files, never development scripts or local configuration.
    if (!/^\/(index\.html|styles\.css|app\.js|assets\/[^.][\w./-]+)$/.test(publicPath) || publicPath.split('/').some(part => part.startsWith('.'))) {
      response.writeHead(404).end('Not found');
      return;
    }
    const file = resolve(root, `.${publicPath}`);
    if (!file.startsWith(resolve(root) + sep) || !(await stat(file)).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': body.length, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio ready at http://127.0.0.1:${port}`));
