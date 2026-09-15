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
- `assets/portraits/` — optimized portrait in WebP with a JPEG fallback, displayed beside the hero introduction

## Project content

The main project list features O'Week 2026 Token Board, Aether Chess, Chess Engine
Arena, WhatsApp Gemini Agent, and Awam Raj Welfare. Descriptions are based on the
local source code. The O'Week source link comes from its configured Git remote;
projects without a repository URL are shown without a source button. Prototype
labels distinguish integration and website work that still needs deployment work.

Earlier projects remain in a native HTML `details` disclosure, which works without
JavaScript. Project cards reuse the existing glass styles, with small additions for
category labels and source links. The hero and skill list reflect the featured work.

Content is visible by default. JavaScript adds `motion-ready` only after the reveal
observer is initialized, and skips observer-dependent behavior when the API is
unavailable. With JavaScript disabled, the mobile navigation exposes its links.
The contact section is intentionally unchanged pending the owner's details.

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
