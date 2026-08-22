# muhammad345ishar.github.io

My personal portfolio — Muhammad Ishar, BS Electrical Engineering at PIEAS.

Live at **https://muhammad345ishar.github.io/**

## Stack

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies —
the files you see are the files that get served.

- `index.html` — the whole page
- `css/style.css` — styles
- `js/main.js` — interactions
- `assets/fonts/` — self-hosted Bodoni Moda + Archivo (variable, latin subset, woff2)

## Running it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321. Any static file server works; it has to be
served over HTTP rather than opened as a `file://` path so the fonts load.

## Fonts

Bodoni Moda and Archivo, both licensed under the SIL Open Font License 1.1 and
self-hosted here as latin-subset woff2 variable fonts instead of being pulled
from a CDN — one less third-party request, and the page renders the same offline.
