# technical_design: Build a single-page CV editor for IT associates with placeholder template, inline editing, localStorage persistence, and

Status: draft

## riskNotes

- PDF single-page fitting may require adjusting font sizes or margins if content overflows. contenteditable may introduce unexpected HTML; sanitize or use plaintext where necessary. Browser localStorage can be cleared by the user, so provide a way to reset/clear data.

## backendPlan

- No backend required; all logic is client-side.

## agentHandoff

- The agent receives a repository with a blank slate. Create index.html with the CV template and contenteditable sections. Style it appropriately. Implement script.js to handle data loading/saving and PDF generation. Write a test suite using Jest+jsdom. Ensure no Wipro branding is added. All dependencies are loaded from CDN, except test tools managed via package.json.

## databasePlan

- No database; uses browser localStorage for persistence.

## frontendPlan

- Single-page application consisting of index.html, style.css, and script.js. HTML provides the CV template structure with contenteditable placeholders. CSS ensures a clean, print-friendly layout suitable for IT professionals. JavaScript initializes the page by loading data from localStorage, attaches event listeners for auto-save, and implements a download button that captures the CV container with html2canvas, creates an A4 jsPDF instance, scales the canvas to fit, and saves the PDF. All resources (html2canvas, jsPDF) are loaded via CDN to keep the project self-contained.

## testStrategy

- Unit tests with Jest+jsdom. Test data persistence (save/load/clear). Verify that editing triggers save. For PDF generation, mock html2canvas and jsPDF to confirm correct invocation. Include a minimal integration test that loads the page in jsdom and checks for required template elements. Run `npm test`.

## dependencyPlan

- No external runtime dependencies; html2canvas and jsPDF are loaded via CDN. Development dependency: Jest and jsdom for testing, installed via npm.

## lowLevelDesign

- Single HTML file (index.html) containing the CV template structure divided into sections: header (name, title, contact), professional summary, work experience, education, technical skills, certifications. Sections use contenteditable divs for inline editing. Inline CSS or an external style.css provides A4-like print-ready styling with modern typography and no branding. JavaScript (script.js) handles: loading saved state from localStorage, populating fields, auto-saving on content changes, and PDF generation via html2canvas + jsPDF libraries loaded from CDN. The data model is a plain object serialized to/from JSON. PDF capture targets a specific container, scales to A4, and triggers download as a single page.

## blockedOnIntegrations


## implementationRoadmap

- Step 1: Create project scaffold with CV template and basic styling (task 1).
- Step 2: Implement localStorage persistence and PDF download (task 2).
- Step 3: Write automated tests for storage, editing, and PDF features (task 3).

## implementationApproach

- 1. Scaffold the project with index.html, style.css, script.js, and a package.json for test dependencies. 2. Build the CV template with standard sections and contenteditable fields. 3. Implement JavaScript logic to load/save CV data from/to localStorage and auto-save on changes. 4. Add a 'Download PDF' button that uses html2canvas and jsPDF to capture the CV and output a single-page A4 PDF. 5. Write unit tests using Jest+jsdom for data handling and PDF trigger logic. 6. Run `npm test` to verify all tests pass.
