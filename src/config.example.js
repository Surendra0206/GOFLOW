/**
 * GOFLOW Email Generator — API Key Configuration
 *
 * This file demonstrates how to configure your Google Gemini API key.
 *
 * === SETUP INSTRUCTIONS ===
 *
 * 1. Get a Gemini API key from https://aistudio.google.com/app/apikey
 *
 * 2. Copy this file to config.js (which is gitignored):
 *      cp src/config.example.js src/config.js
 *
 * 3. Replace the placeholder below with your actual API key.
 *
 * 4. In your HTML, load config.js BEFORE app.js:
 *      <script src="config.js"></script>
 *      <script src="api.js"></script>
 *      <script src="app.js"></script>
 *
 * 5. Alternatively, enter the key directly in the app's API Key field.
 *    The key is never stored on any server — it is only sent to Google's
 *    Gemini API from your browser.
 *
 * === SECURITY NOTES ===
 *
 * - NEVER commit config.js to version control. It is listed in .gitignore.
 * - For a production deployment, serve the API key from a backend proxy
 *   rather than exposing it in client-side code.
 * - The free tier of Gemini has rate limits; see:
 *   https://ai.google.dev/pricing
 */

window.GOFLOW_CONFIG = {
  /**
   * Your Google Gemini API key.
   * Replace with your actual key from https://aistudio.google.com/app/apikey
   */
  apiKey: 'YOUR_GEMINI_API_KEY_HERE'
};
