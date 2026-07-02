# technical_design: Single-page client-side CV generator with form input, live preview, A4 PDF export, and printable HTML output. No backend

Status: draft

## riskNotes

- - Dynamic font scaling may not perfectly fit extreme content; test with very long and very short texts. Mitigation: implement a fallback maximum scale step count and a minimum readable font size.
- PDF generation via html2canvas may have cross-origin issues with local files; test with a simple local server if needed (e.g., `python -m http.server`).
- Browser compatibility: modern Chrome/Firefox assumed.

## backendPlan

- No backend required; all processing is client-side.

## agentHandoff

- Start by cloning the repository and creating a feature branch. Follow the task dependencies: complete scaffolding first, then implement form/preview, and finally add PDF export. The static template must already have placeholders for all sections; use that as the foundation. When building the form, attach input event listeners for real-time preview. For PDF generation, test extensively with varying text lengths to verify the scaling algorithm works. The print stylesheet should be a separate `print.css` that applies `display: none` to non-preview elements. The final product must be a single HTML file that can be opened directly in a browser without any server.

## databasePlan

- Not applicable; no database.

## frontendPlan

- Use vanilla HTML, CSS, and JavaScript. Include a CDN link to jsPDF and html2canvas libraries. Structure: index.html with a <form> containing input fields mapped to CV sections, a <button> to toggle to preview, and a <div id='cv-preview'> containing the template layout. The preview div uses absolute measurements (mm) for A4 simulation. CSS includes a print media query that hides form controls and uses `@page { size: A4; margin: 10mm; }` with the preview taking full page. JavaScript: attach event listeners to inputs for live preview update, a file input change handler for photo, and a PDF generation function that uses `html2canvas` to capture the preview div and `jsPDF` to save as PDF. Implement a `scaleFontToFit()` function that measures scrollHeight of the preview div and reduces its font-size by 0.5px increments until scrollHeight ≤ 297mm equivalent in pixels (using device pixel ratio). Also provide a "Print" button that calls `window.print()`. No build tools needed; run directly in modern browsers.

## testStrategy

- Reviewer will run `npm test` if a test framework is configured, else they will verify by running linting commands (ESLint, stylelint). Unit tests (using Jest) will cover: data binding logic (passing form values to preview update), section visibility toggle, the `scaleFontToFit` function (simulating a DOM container and checking font-size adjustment), and PDF generation (mocked library to verify the function calls). Linting includes JS (ESLint recommended rules) and CSS (stylelint). For print styles, a manual verification is out of scope for reviewer; instead, provide a CSS assertion test that the print media query is present. No browser-based visual validation.

## dependencyPlan

- Dependencies: jsPDF and html2canvas libraries loaded via CDN. No other external dependencies. The CDN links can be copied from official docs; no user decision needed.

## lowLevelDesign

- The application is a self-contained HTML file with embedded CSS and JavaScript. The page is structured into two primary views toggled via buttons: a form view and a preview view. The form collects all CV sections (Career Objective, Education, Technical Competences, Experiences, Internship Details, Project Details, Certifications) with a photo upload field using FileReader for client-side preview. The preview view displays the CV template—a centered column with max-width 210mm and min-height 297mm to simulate A4—updated in real time via JavaScript data binding. Profile photo, if uploaded, is positioned top-right. Empty sections are hidden. Upon generation, a PDF library (e.g., jsPDF with html2canvas) captures the preview div and exports a single-page A4 PDF. A print stylesheet with `@page { size: A4; }` ensures browser print matches. Dynamic font scaling adjusts the container font size iteratively (starting from a base size, reducing until content height fits within 297mm, with a lower bound of 8pt) to avoid overflow. The architecture avoids any frameworks to keep dependencies minimal; only a PDF library is externally loaded from CDN. All user data is ephemeral and lost on reload.

## blockedOnIntegrations


## implementationRoadmap

- 1. Scaffolding (Task 1): Initialize file structure, create static template with all sections and A4 styles, set up linting.
2. Form & Preview (Task 2): Build form, wire data binding, handle photo upload, implement section hide/show, and write tests.
3. PDF & Print (Task 3): Integrate PDF library, implement scaling algorithm, finalize print styles, and write tests.

## implementationApproach

- Single developer, iterative delivery in 3 phases: 1) Project setup and static template layout; 2) Form interaction and live preview; 3) PDF export and print optimization. Each phase corresponds to a task with clear acceptance criteria. All code is committed to the existing repository under a feature branch.
