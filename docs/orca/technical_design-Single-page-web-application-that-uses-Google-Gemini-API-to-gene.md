# technical_design: Single-page web application that uses Google Gemini API to generate professional follow-up emails from interview details

Status: draft

## riskNotes

- Google Gemini free tier may have low rate limits. localStorage quota is typically 5MB, which should be enough but warn user if full. Clipboard API requires secure context; app must be served over HTTPS or localhost; fallback to execCommand for older browsers.

## backendPlan

- Not applicable.

## agentHandoff

- Agent will receive a scaffolded project. Must implement script.js with three internal modules: ApiService, StorageService, UIService. Ensure all DOM interactions after DOMContentLoaded. Use const for non-reassignable variables. Provide a configuration prompt for API key on first load.

## databasePlan

- Not applicable; client-side persistence via localStorage with key 'drafts' storing an array of objects each containing interview details, email text, and timestamp.

## frontendPlan

- Implement responsive single-page interface using HTML5, CSS3, and ES6 JavaScript. Include form validation for required fields (company name, interviewer). On form submit, build a prompt string and call Gemini API. Display generated email in a textarea. Provide Save, Copy, Delete Draft buttons. Drafts list rendered from localStorage.

## testStrategy

- Run `npm test` which executes: eslint checks and node test.js. test.js uses jsdom to create a virtual DOM, imports script functions, and verifies: prompt building includes all fields, localStorage CRUD operations are correct, form validation catches missing fields, and API call returns expected shape (mocked). No browser tests needed.

## dependencyPlan

- No external runtime dependencies; development dependencies: jsdom (for testing), eslint (for linting). Include in package.json devDependencies.

## lowLevelDesign

- Vanilla JS SPA with three modules: api.js (Gemini fetch), storage.js (localStorage CRUD), ui.js (DOM manipulation). Views: InputForm and SavedDrafts, toggled via buttons. State held in a global object. No routing. Error handling with try-catch around API calls. Clipboard API with fallback.

## blockedOnIntegrations


## implementationRoadmap

- Set up project structure and HTML/CSS skeleton with form and draft list areas.
- Implement form validation and error display.
- Add API integration module to call Gemini.
- Build email editor with save, copy, delete actions.
- Implement localStorage read/write for drafts.
- Add styling and responsive design.
- Write unit tests for core functions using jsdom.
- Configure ESLint for code quality.

## implementationApproach

- Start with scaffolding: index.html with semantic structure, style.css for layout and responsiveness, script.js with IIFE to avoid global pollution. Use fetch for Gemini API key input and prompt. Implement robust error handling. Use template literals to construct email body. Provide clear user guidance.
