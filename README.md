# GOFLOW — AI Interview Follow-Up Email Generator

A single-page web application that uses the **Google Gemini API** to generate professional follow-up emails from interview details. Fill in company name, interviewer, role, and key discussion points, and let AI craft a polished, personalized follow-up email.

## Features

- **AI-Powered Generation** — Uses Google Gemini (gemini-pro) to draft professional emails
- **Editable Output** — Review and tweak the generated email in a built-in textarea
- **Multiple Tones** — Choose from Professional, Casual & Friendly, Enthusiastic, or Grateful
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Zero Server Dependencies** — Runs entirely in the browser; only calls the Gemini API

## Prerequisites

- **Node.js** 18+ (for development tooling only)
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

## Install

```bash
npm install
```

## API Key Configuration

There are two ways to provide your Gemini API key:

### Option A: Enter in the App

Type or paste your key into the **Gemini API Key** field on the form. The key is only used for the current request and is never stored.

### Option B: config.js File (Development Convenience)

1. Copy the example config:
   ```bash
   cp src/config.example.js src/config.js
   ```

2. Edit `src/config.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual key.

3. Add the script tag to `src/index.html` before `api.js`:
   ```html
   <script src="config.js"></script>
   ```

> **Note:** `config.js` is gitignored — never commit real API keys.

## Start / Run

```bash
# Serve the app locally (opens at http://localhost:8080)
npm start
```

Then open **http://localhost:8080/src/index.html** in your browser.

Alternatively, you can open `src/index.html` directly in your browser, or use any static file server:

```bash
npx serve .
# or
npx http-server . -p 8080 -c-1 --cors
```

## Linting

```bash
npm run lint
```

Runs:
- **HTMLHint** on `src/index.html`
- **Stylelint** on `src/styles.css`
- **ESLint** on `src/*.js` and `__tests__/*.js`

## Testing

```bash
npm test
```

Runs the Jest test suite with jsdom. Covers:
- **api.js**: Prompt construction, API call URL/body verification, success/error response handling (mocked fetch)
- **app.js**: Form validation for required fields (company name, interviewer name)

## Project Structure

```
.
├── src/
│   ├── index.html          # Main application page
│   ├── styles.css          # Responsive styles
│   ├── api.js              # Gemini API integration module
│   ├── app.js              # Form handling, validation, UI orchestration
│   └── config.example.js   # API key configuration template
├── __tests__/
│   ├── api.test.js         # Unit tests for api.js
│   └── app.test.js         # Unit tests for app.js validation
├── .eslintrc.json          # ESLint configuration
├── .htmlhintrc             # HTMLHint configuration
├── .stylelintrc.json       # Stylelint configuration
├── .gitignore              # Git ignore rules
├── package.json            # npm scripts and dependencies
└── README.md               # This file
```

## Environment Variables

None required. This is a fully client-side application. The only external dependency is the Google Gemini API, accessed directly from the browser.

## License

UNLICENSED — Private use.
