# GOFLOW — Professional CV Builder

A single-page CV generator with real-time preview, localStorage persistence, and single-page PDF export with auto-scaling. Built for Non-IT Wipro associates to create polished, ATS-friendly CVs quickly.

## Features

- **Real-time preview** — changes appear instantly in an A4-preview pane
- **8 CV sections** — Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements
- **localStorage auto-save** — data persists across tab closes and browser restarts
- **Single-page PDF export** — downloads an A4 PDF that matches the on-screen preview
- **Auto-scaling** — font size and margins reduce iteratively to fit content on one page (8pt floor with user warning)
- **Offline-capable** — once html2pdf.js is cached by the browser, PDF generation works without internet
- **Linting** — HTMLHint, Stylelint, and ESLint configured for code quality
- **Automated tests** — Puppeteer-based browser tests with static analysis fallback

## Prerequisites

- **Node.js 18+** and **npm 9+** (for development tooling: linting and tests)
- A modern web browser (Chrome 90+, Firefox 90+, Edge 90+, Safari 15+) for running the app
- Internet connection for first load (to fetch the html2pdf.js CDN script; subsequent loads work offline via browser cache)
- For browser tests: Chrome or Chromium installed (tests gracefully skip if unavailable)

## Install

```bash
npm install
```

## Quick Start

### Option 1: Open directly

```bash
open index.html
# or double-click index.html in your file explorer
```

### Option 2: Serve with npm

```bash
npm start
```

The app will be available at `http://localhost:8080`.

### Option 3: Serve with any static server

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## Linting

```bash
# Run all linters
npm run lint

# Run individually
npm run lint:html    # HTMLHint
npm run lint:css     # Stylelint
npm run lint:js      # ESLint (checks test.js)
```

## Testing

```bash
npm test
```

Runs the automated Puppeteer test suite. If Chrome/Chromium cannot launch (e.g., missing system libraries in CI/container environments), the test falls back to static HTML analysis covering 20+ structural checks (DOCTYPE, meta tags, Open Graph, JSON-LD, form sections, PDF generation, A4 dimensions, print media query, and more). Both modes produce a clear pass/fail report.

## How to Use

1. Open `index.html` in your browser
2. Fill in your CV details — the preview updates in real time
3. Your data is saved automatically to localStorage as you type
4. Click **Download PDF** to export a single-page A4 PDF
5. If your content is too long, the app auto-scales font/margins down to 8pt; a warning appears if content still overflows

## PDF Auto-Scaling Logic

| Parameter | Default | Floor |
|-----------|---------|-------|
| Font size | 14px | 8px (8pt) |
| Padding | 60px | 10px |
| Step decrement | 0.5px font / 5px padding per iteration | — |

When **Download PDF** is clicked:
1. The preview is cloned into an off-screen container
2. `offsetHeight` is measured against A4 height (1122px)
3. If content exceeds one page, font size and padding are reduced iteratively
4. If the 8pt floor is reached, a console warning and toast notification alert the user
5. The final scaled clone is rendered to PDF via html2pdf.js

## Environment Variables

None required. This is a fully client-side application.

## Project Structure

```
.
├── index.html         # The entire application (HTML + CSS + JS)
├── package.json       # npm scripts and dev dependencies
├── test.js            # Puppeteer test suite with static analysis fallback
├── .eslintrc.json     # ESLint configuration
├── .htmlhintrc        # HTMLHint configuration
├── .stylelintrc.json  # Stylelint configuration
└── README.md          # This file
```

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, flexbox, responsive design
- **Vanilla JavaScript (ES5-compatible)** — no transpilation needed
- **[html2pdf.js](https://github.com/eKoopmans/html2pdf.js)** (v0.10.1, CDN) — html2canvas + jsPDF wrapper for PDF generation

## Offline Usage

After the first successful page load, `html2pdf.bundle.min.js` is cached by the browser. Subsequent PDF downloads work without internet access. To verify: load the page once while online, then disconnect and click "Download PDF" — it should work.

## License

Internal use. Wipro associates.

## Support

For issues or feature requests, contact the GOFLOW development team.
