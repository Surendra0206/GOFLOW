# technical_design: Standalone web tool to generate AI-powered product descriptions for iPhone 17 Pro Max 1TB and Samsung S26 Ultra 512GB, w

Status: draft

## riskNotes

- API key in sessionStorage may be exposed if XSS exists – avoid using innerHTML with user-supplied content.
- AI model may occasionally return disallowed content (pricing) – prompt engineering needed; test prompt on real models.
- Future API endpoint changes could break calls – pin to a stable API version if known.

## backendPlan

- None – application is entirely client-side; no server, API, or database needed.

## agentHandoff

- Build exactly following this plan. The app must have two product cards (iPhone 17 Pro Max 1TB, Samsung S26 Ultra 512GB). A settings icon/panel to input API base URL (default https://api.openai.com/v1), API key, and model (default gpt-3.5-turbo). On generate, send POST to {baseURL}/chat/completions with messages: [system prompt with product details, user 'Generate description']. Parse choices[0].message.content. Show loading state, handle errors. Download button creates .txt with both descriptions if present, separated by headers. Product data hardcoded (name, storage, key specs). No pricing/availability in prompts. All code in src/*, test files in __tests__/*. Use sessionStorage for API config. Ensure `npm test` passes and `npm run build` produces dist/index.html.

## databasePlan

- None – no data persistence required; all state transient.

## frontendPlan

- Use Parcel to bundle index.html with JS and CSS. Collapsible settings panel for API endpoint, key, and model (default: gpt-3.5-turbo). Two product cards with 'Generate Description' buttons, a shared display area, and a 'Download Descriptions' button. All state managed in-memory. Error messages shown for network or API failures. Responsive layout via CSS Flexbox/Grid. Tests use Jest + @testing-library/dom with jsdom, mocking fetch for API calls.

## testStrategy

- Reviewer agent must: 1. Install dependencies (`npm install`). 2. Run `npm test` – expects passing unit tests covering: API call success/error scenarios (mocked fetch), UI element rendering and button click events (jsdom), download output content verification. 3. Run `npm run build` – expects successful Parcel build producing dist/index.html and assets. The reviewer does not open a browser; these steps provide full confidence.

## dependencyPlan

- No external dependencies except the AI API, which the user will configure. No integration key needed from user before implementation.

## lowLevelDesign

- Single-file SPA built with vanilla JS + Parcel bundler. Architecture separates concerns: `api.js` handles configurable AI API calls (OpenAI-compatible chat completions), `products.js` provides hardcoded product data and prompt templates, `ui.js` manages rendering and event handling, `download.js` generates text file content, `index.html` and `styles.css` define structure and styling. API configuration (base URL, key, model) is input by user and held in sessionStorage. No server-side components. Tests written with Jest + jsdom to cover API mocking, UI rendering, and download logic.

## blockedOnIntegrations


## implementationRoadmap

- Project scaffolding: package.json, Parcel, Jest, essential configuration
- Implement src/products.js – product definitions and prompt templates
- Implement src/api.js – fetch wrapper for OpenAI chat completions
- Implement src/ui.js – DOM rendering, event listeners, error handling
- Implement src/download.js – generate .txt content with product headers
- Create index.html and styles.css – semantic structure and responsive design
- Write tests for API service, UI interactions, and download file content
- Build with Parcel → dist/ output validated via `npm run build`

## implementationApproach

- 1. Create package.json and install Parcel, Jest, jest-environment-jsdom, @testing-library/dom. 2. Add npm scripts: start, build, test. 3. Write product data and prompt templates in src/products.js. 4. Build api service (src/api.js) with configurable fetch to chat completions, parsing response. 5. Create UI module (src/ui.js) to render product cards, handle generate/download clicks, show settings panel. 6. Implement download functionality (src/download.js) composing text from generated descriptions. 7. Style with responsive CSS. 8. Add unit tests for api.js (mock fetch), ui.js (event simulation with jsdom), download.js (output content). 9. Verify build succeeds and tests pass.
