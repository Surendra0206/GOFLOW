# technical_design: Tech Lead plan for a single-page web application that generates professional follow-up emails using Google Gemini. The a

Status: draft

## riskNotes

- - API key exposure: The key is embedded in the frontend code if not carefully managed. Mitigation: configuration task will provide a mechanism (e.g., a config.js file listed in .gitignore) and the reviewer may test with mock. But in production, a backend proxy would be needed; this is a known risk for client-only Gemini usage.
- CORS: Direct calls to Gemini API may be blocked by CORS if the browser enforces it. The Gemini API likely supports CORS for test keys; verify with mock responses and ensure error handling displays CORS issues.
- localStorage limits: ~5MB; for many drafts, storage could fail. Implement fallback message.
- Clipboard API: Requires a secure context (HTTPS or localhost). For local development this is fine; for a hosted page, must be HTTPS.
- No offline support: User must be online to generate emails.

## backendPlan

- Not applicable. This is a pure frontend application with no server-side component. API calls go directly from the browser to Google Gemini.

## agentHandoff

- After scaffolding, implement the API wrapper in src/api.js. It must accept an API key (from a non-committed config.js or environment variable for local testing). The configuration task will provide a mock or actual key; for development, use a placeholder and ensure it works with a mock response. The reviewer will run unit tests that mock the Gemini API, so no live key is needed during testing. In app.js, ensure all DOM manipulation uses IDs/classes as defined in the HTML. localStorage operations should be wrapped in try/catch and gracefully handle quota exceeded or disabled storage. For copy-to-clipboard, check permissions and use a textarea fallback if necessary. Do not include any external CDN links; rely on npm for development tools only.

## databasePlan

- Not applicable. No database server. Browser localStorage is used as the persistence layer.

## frontendPlan

- Frontend structure:
- src/index.html: Semantic HTML5 form with inputs (text, date, textarea). Two container divs: #form-container, #drafts-container. Editable textarea for the generated email. Buttons: 'Generate', 'Save', 'Copy to Clipboard', 'View Drafts', 'Back to Form'. Drafts list will be dynamically rendered inside #drafts-container.
- src/styles.css: Mobile-first responsive design, clean professional look. Use flexbox/grid for layout. Error message styles.
- src/app.js: 
  - Form validation: ensure company name and interviewer name are not empty.
  - Event listeners for form submit, button clicks.
  - State management: load/save drafts to localStorage.
  - Rendering functions: renderFormView(), renderDraftsList().
  - Integration with api.js: handle loading state, error messages.
  - Clipboard API: use navigator.clipboard.writeText() with fallback.
- src/api.js: 
  - Does not expose API key in code; expects it as a parameter or from a config object (config.js ignored by git).
  - Constructs a prompt using interview details, sends POST to Gemini API endpoint, parses response.
  - Error handling: network errors, API errors, returns user-friendly message.
- package.json: npm init with scripts `test` (jest), `lint` (eslint), `start` or `build` (optional, maybe just open index.html).
- .gitignore: node_modules, config.js (where API key is stored locally for dev; will be documented).

## testStrategy

- The reviewer will execute the following in shell:
1. `npm install` (to install dev dependencies).
2. `npm run lint` (should report zero errors).
3. `npm test` (runs Jest unit tests).
Unit tests will be placed in src/__tests__/ and cover:
   - `api.js` with a mock fetch that returns a sample Gemini response; verify prompt construction and error handling.
   - `app.js` logic functions (validation, localStorage CRUD) after mocking DOM and localStorage.
   For integration-like tests, use jsdom environment and mock the entire view.
No manual browser testing is required.

## dependencyPlan

- No runtime dependencies for the app itself (vanilla JS). Dev dependencies: jest (for testing), eslint (for linting). A configuration task will handle the Gemini API key dependency.

## lowLevelDesign

- The application is a lightweight, client-only SPA with no build step beyond what npm scripts provide for testing. The UI is built with vanilla HTML, CSS, and JavaScript. The architecture is:
- index.html: contains the input form (company name, interviewer name, role, date, key points) and a dynamic section for the generated email and saved drafts list.
- styles.css: basic responsive styling.
- app.js: main controller that manipulates the DOM, handles form submission, manages localStorage, and orchestrates views.
- api.js: isolated module for calling the Gemini API (using fetch) with the required prompt; accepts an API key (loaded from a non-committed config or environment variable during development).
- Data flow: User fills form → app.js calls api.js → response displayed in editable textarea → user can save (serializes state to localStorage) → saved items listed via rendering in a separate view div → edit/re-save or delete → copy-to-clipboard via Clipboard API.
- localStorage structure: key 'drafts' holds a JSON array of objects { id, company, interviewer, role, date, keyPoints, emailText, timestamp }.
- No routing library; views are toggled by CSS classes (form view vs list view).

## blockedOnIntegrations

- Google Gemini

## implementationRoadmap

- Phase 1 (Task 1): Core UI and API integration. Deliver an app where the user can fill in details, generate an email, and view/edit it. No persistence yet. Phase 2 (Task 2): Add full draft management. The user can save, view, delete drafts and copy the email text. After both phases, the app is feature-complete according to acceptance criteria.

## implementationApproach

- 1. Scaffold project: create directory structure, initialize npm, install dev dependencies (jest, eslint).
2. Build the static HTML form and basic CSS.
3. Implement the Gemini API wrapper module with proper error handling.
4. Wire up form submission to call the API and display the draft in an editable textarea.
5. Implement localStorage persistence: save, load, delete, and list drafts.
6. Add copy-to-clipboard functionality.
7. Write unit tests for core logic (validation, API mock, localStorage operations).
8. Ensure lint passes.
