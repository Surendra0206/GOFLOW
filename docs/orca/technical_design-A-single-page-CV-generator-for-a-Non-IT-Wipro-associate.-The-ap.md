# technical_design: A single-page CV generator for a Non-IT Wipro associate. The app provides a real‑time preview, auto‑saves form data to l

Status: draft

## riskNotes

- Auto‑scaling algorithm cannot guarantee perfect one‑page fit for extremely long content; font size floor (8pt) may become illegible but is accepted per scope. Browser‑specific differences in CSS rendering may cause slight variations. Project has no offline fallback for CDN dependency – a user must load the page at least once while online to cache the library. localStorage size limits are unlikely to be exceeded for text‑only data.

## backendPlan

- No backend required – fully client‑side application.

## agentHandoff

- Create a single file `index.html`. Inside, include: HTML sections for a two‑column layout with a form (all specified sections) and a preview pane. Add CSS for clean, ATS‑friendly styling. Add JavaScript to: (a) attach `input` event listeners to every form field, updating background-preview and saving to localStorage; (b) on page load, populate form and preview from localStorage; (c) include the html2pdf CDN script; (d) add a ‘Download PDF’ button that calls `generatePDF()`. The `generatePDF()` function should: clone the preview div, append it off‑screen, then in a loop with initial font‑size=14px and margin=20px, measure `clone.offsetHeight`; while height > 1122px and font‑size > 8px, decrease font‑size by 0.5px and margin by 5px, waiting for reflow; after loop, if font‑size == 8px log warning. Pass the final clone to `html2pdf().set({ margin: 0, filename: 'CV_YourName.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'px', format: [794, 1122] } }).from(clone).save()`. Remove clone. Ensure offline capability once CDN resource is cached.

## databasePlan

- No database – all data persisted in browser localStorage (key‑value pair per field).

## frontendPlan

- Single HTML file (index.html) with vanilla HTML/CSS/JavaScript. Dependencies: html2pdf.js loaded from CDN (e.g., <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>). Layout: responsive two‑column design using flexbox. Form fields bound to preview via input event listeners; localStorage read/write on every change. Preview content wrapped in a div with class `cv-preview`. PDF auto‑scaling: function `autoScaleForOnePage(element)` measures clone height, reduces `font-size` and `margin` in 0.5pt / 5px steps until height fits A4 or floor reached. Download button triggers scaling, then calls `html2pdf().set({…}).from(scaledElement).save()`.

## testStrategy

- Manual testing: open index.html in Chrome/Firefox/Edge. Fill sections, verify real‑time preview and localStorage persistence (close/reopen tab). Click Download PDF – inspect PDF is single‑page A4, content matches preview. Test with minimal and maximal content; check scaling down to 8pt floor. Verify warning appears in console when floor reached. Test offline after initial load.

## dependencyPlan

- Only external runtime dependency is html2pdf.js (loaded from CDN). No build or server dependencies.

## lowLevelDesign

- Single HTML file (index.html) with embedded CSS and JavaScript. Layout: two‑column flexbox (form on left, preview on right). Form sections: Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements. Preview pane displays an ATS‑friendly, English‑only layout. JavaScript uses module pattern to handle form events, localStorage persistence, and real‑time preview updates. PDF generation: html2pdf.js loaded via CDN; a cloned preview element is scaled iteratively (reducing font‑size and margins) until content fits one A4 page (height ≤ 1122px). Floor font size is 8pt; if exceeded, a console warning is logged and scale is accepted. The scaled clone is passed to html2pdf for download. No authentication, no server.

## blockedOnIntegrations


## implementationRoadmap

- 1. Build complete form and real‑time preview with localStorage persistence. 2. Integrate PDF download button and implement auto‑scaling algorithm.

## implementationApproach

- Agile, sequential task execution. Task 1 delivers the form with preview and localStorage. Task 2 adds PDF generation and auto‑scaling on top of the existing preview structure. No build tools or bundlers; the file can be opened directly in a browser. Testing is manual after each task.
