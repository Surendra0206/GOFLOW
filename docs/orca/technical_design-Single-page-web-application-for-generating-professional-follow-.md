# technical_design: Single-page web application for generating professional follow-up emails using Google Gemini API. Users input interview 

Status: draft

## riskNotes

- API key stored in localStorage is accessible to client-side scripts, posing a low security risk for a personal-use app. No server-side validation of inputs; reliance on browser APIs (localStorage, Clipboard) that may not be available in all environments, but assumed available. Data loss possible if browser storage is cleared.

## backendPlan


## agentHandoff

- The entire application codebase is handed off to a frontend developer agent. The agent should create all files, implement the functionality, and ensure the lint script passes. No additional infrastructure or backend work required.

## databasePlan


## frontendPlan

- The frontend is a single-page web application. It uses HTML for structure, CSS for styling, and vanilla JavaScript for logic. Form validation ensures required fields are filled. The API key is stored in localStorage and can be configured via a settings section. The generated email is displayed in a textarea that the user can edit. Saving persists interview details and email to localStorage as a JSON array. A drafts list section renders saved items with open/edit and delete buttons. Clipboard copy available for the email text. All operations are client-side, no server requests beyond Gemini API.

## testStrategy

- The reviewer will run 'npm run lint' to verify code quality. Additionally, the reviewer can verify the application logic by checking that app.js contains functions for form submission, API call, localStorage CRUD, and clipboard copy, and that the HTML structure matches expectations. Since the reviewer has shell access only, automated tests are limited; the focus is on linting and static code checks. If a headless browser test is feasible using Node.js, a simple smoke test can be added, but not required.

## dependencyPlan

- No external dependencies beyond the Google Gemini API, which is configured via a separate integration task. All other functionality uses built-in browser APIs.

## lowLevelDesign

- The application consists of three static files: index.html, style.css, and app.js. index.html contains a form for interview details (company name, interviewer name, role, date, key points), a section to display the generated email in an editable textarea, and a list of saved drafts. style.css provides responsive layout and styling. app.js handles form submission, constructs a prompt for Gemini, calls the API via fetch, displays the result, manages localStorage for drafts and API key, provides copy-to-clipboard and delete functionality. Prompt details: 'Write a professional follow-up email after an interview for the role of [role] at [company name] with interviewer [interviewer name] on [date]. Key points discussed: [key points]. The email should express gratitude, reiterate interest, and touch on key points.' The Gemini API endpoint is https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY. Error handling for network issues, invalid API key, or rate limits displays user-friendly messages. No libraries or frameworks needed; vanilla JavaScript with Fetch API.

## blockedOnIntegrations

- Google Gemini

## implementationRoadmap

- Create index.html with semantic HTML structure for the form, output area, and saved drafts list.
- Add style.css with a clean, responsive design.
- Develop app.js with modules for form handling, API interaction, localStorage management, and clipboard operations.
- Integrate Google Gemini API with error handling.
- Add ESLint configuration and lint script to package.json.
- Test locally by opening index.html in a browser.

## implementationApproach

- Build the app as a static website. No build tools required; serve files directly from the repository. Set up ESLint with a minimal configuration to enforce code quality. Use environment variable? No, the API key is input by user. The integration with Google Gemini API will be resolved via a configuration task where the user chooses to provide a real API key or a mock placeholder. Implementation will include a placeholder until the configuration is complete.
