# technical_design: Build a single-page editable CV application with inline editing and A4 PDF download, using html2pdf.js for client-side g

Status: draft

## riskNotes

- Low risk: client-side only, no sensitive data. CDN outage could break PDF generation; consider adding a fallback URL or bundling if needed. No cross-browser testing for older browsers.

## backendPlan


## agentHandoff

- Implement a single-file static CV application in `index.html`. The page must display a structured CV within a container styled to match A4 proportions on screen. Use contenteditable attributes on all text elements so users can edit every detail. Include a 'Download PDF' button that triggers html2pdf.js (loaded from CDN `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`) on the container element, saving the PDF as `Surendra_besetti.pdf`. Ensure the layout is centered, no content overflows, and the PDF mirrors the on-screen design. Add linting scripts (HTMLHint, Stylelint, ESLint) in a `package.json` with appropriate config files. Write a Puppeteer test (`test.js`) that launches a headless browser, serves the page (use `http-server` or similar), asserts the download button exists, triggers PDF download (using page.evaluate and response interception), and verifies a PDF file is generated with size > 0. The reviewer will run `npm install && npm run lint && npm test` to validate. No backend, no persistence.

## databasePlan


## frontendPlan

- html: Semantic elements: header, section tags for each CV part (name, contact, summary, experience, education, skills). All text content wrapped in contenteditable divs. Container div with class 'cv-container' fixed to 210mm x 297mm aspect ratio for screen.
- css: Use @page for print styling. Scale the container to fit screen while preserving ratio. Center vertically and horizontally. Font: system-ui, sans-serif. Print margins set to 0, with inner padding for content.
- js: Listen for download button click. Use html2pdf.js to convert .cv-container to PDF with options: { margin: 0, filename: 'Surendra_besetti.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }.

## testStrategy

- Automated: Lint HTML, CSS, JS. Puppeteer test loads page, confirms download button presence, triggers PDF generation, and asserts a PDF file is created with size > 0 bytes. Reviewer runs `npm test` to validate.

## dependencyPlan

- Only external dependency is the html2pdf.js CDN, which does not require authentication.

## lowLevelDesign

- component: Single static HTML page with CSS grid for A4 layout, contenteditable sections, and a download button.
- dataFlow: User edits content directly in the DOM; on download, html2pdf.js captures the rendered element and generates a PDF blob, triggering a browser download with the specified filename.
- states: Default editable view,PDF generation in progress,Download complete
- errorHandling: Show console error if PDF generation fails; fallback to alert.

## blockedOnIntegrations


## implementationRoadmap

- Create index.html with A4-sized container and editable sections.
- Add CSS for screen and print layout, ensuring no overflow.
- Integrate html2pdf.js CDN and implement download button logic.
- Set up dev tooling (package.json, linting configs) and write a puppeteer test to verify PDF generation and page semantics.

## implementationApproach

- Create a single index.html file with embedded CSS and JS. Include html2pdf.js from CDN. No build tools required. Add a package.json with devDependencies for linting (htmlhint, stylelint, eslint) and a test using puppeteer to validate page structure and PDF generation. The project will be minimal and self-contained.
