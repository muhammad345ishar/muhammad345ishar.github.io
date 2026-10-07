# Muhammad Ishar — personal portfolio

A custom portfolio with cream paper tones, electric blue, lime accents, editorial typography, a portrait collage, and six original SVG project illustrations.

## Run it

Requires Node.js 20 or newer. There are no npm dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Stop the server with Ctrl+C. Set `PORT` if that port is already in use.

```sh
npm run check   # JavaScript syntax validation
npm run build   # Create the standalone website in dist/
npm run preview # Serve the built dist/ directory locally
```

Upload the contents of `dist/` to a static host such as GitHub Pages, Cloudflare Pages, or Netlify. The site uses relative asset paths, so it can live in a subdirectory. No server runtime or API keys are needed on the host. The included Node server is for local preview.

## How the code works

- `index.html` contains the complete page: introduction, project summaries, about, coursework, education, leadership, and contact. The main content exists in HTML, so it stays available if JavaScript is disabled. The downloadable CV and email/phone links are ordinary links.
- `styles.css` controls the design. The `:root` variables define the colors, fonts, page width, and gutters. The file is organized by section; media queries adapt the page to tablets and phones. The reduced-motion query switches off movement while keeping feedback and content.
- `app.js` adds the mobile navigation, category filters, project detail dialogs, email copy action, and the small spark animation in the contact section. The `projects` object at the top contains each detail panel's text and tags. Project text is inserted with `textContent`. The native HTML `dialog` manages keyboard focus containment and Escape.
- `assets/` holds two optimized WebP versions of the supplied portrait, the unchanged CV, original project illustrations, the favicon, and locally served fonts. The website makes no third-party requests at runtime. Font licenses are included in `assets/fonts/`.
- `server.mjs` uses Node's built-in HTTP server to serve only the website's public files on loopback. `scripts/build.mjs` copies the public website into `dist/`.

## Content and future edits

All education, projects, roles, skills, certifications, and contact details are based on `Muhammad_Ishar_CV_Editorial.pdf`, supplied for this project. Descriptions are lightly edited for the web. The project artwork is illustrative, not a screenshot or a claim about measured results.

The CV did not contain usable GitHub, LinkedIn, repository, or live-demo URLs. These links are intentionally omitted. Add verified destinations when you have them; avoid guessing usernames. No testimonials, employment history, performance metrics, client counts, or availability claims have been invented.

To update a project, edit its visible summary in `index.html` and its corresponding record in `app.js`. To change the design, start with the custom properties at the top of `styles.css`. To replace the portrait or CV, update the files in `assets/` and retain their filenames, or update their links in `index.html`.

Email opens the visitor's email application. The copy button provides a second way to contact you. There is no contact form or submission backend.

## Local QA artifacts

`tmp/qa/` contains desktop, tablet, mobile, and dialog screenshots plus the browser verification report. `tmp/preview.mjs` is the local Playwright verification script; its browser and library paths point to this machine's installed tooling. These development artifacts are excluded from the build.

The browser check covers seven viewport widths, filters, all six dialogs, focus containment and restoration, coursework accordions, clipboard copy, CV download, reduced-motion behavior, particle cleanup, mobile navigation, landscape layout, content without JavaScript, browser errors, and automated axe accessibility checks. Automated checks supplement visual inspection; they do not establish complete accessibility conformance.
