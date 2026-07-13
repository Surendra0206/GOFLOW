/**
 * GOFLOW — AI Interview Follow-Up Email Generator
 * api.js — Google Gemini API integration module
 *
 * Exposes generateEmail(details, apiKey) which constructs a prompt from
 * interview details and calls the Gemini API to generate a follow-up email.
 *
 * This module works both in browser (exposes window.ApiService) and in
 * Node.js test environments (CommonJS exports).
 */

(function () {
  'use strict';

  var GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  /**
   * Build a prompt for Gemini from interview details.
   * @param {object} details
   * @param {string} details.companyName
   * @param {string} details.interviewerName
   * @param {string} [details.role]
   * @param {string} [details.interviewDate]
   * @param {string} [details.keyPoints]
   * @param {string} [details.tone]
   * @returns {string}
   */
  function buildPrompt(details) {
    var company = details.companyName || '';
    var interviewer = details.interviewerName || '';
    var role = details.role || '';
    var date = details.interviewDate || '';
    var keyPoints = details.keyPoints || '';
    var tone = details.tone || 'professional';

    var toneInstructions = {
      professional: 'Use a polished, courteous, and formal business tone.',
      casual: 'Use a warm, friendly, and conversational tone while remaining respectful.',
      enthusiastic: 'Express genuine excitement and energy about the opportunity.',
      grateful: 'Emphasize gratitude and appreciation for the interviewer\'s time and the opportunity.'
    };

    var toneText = toneInstructions[tone] || toneInstructions.professional;

    var prompt = [
      'You are an expert career coach and professional email writer.',
      'Write a concise, personalized follow-up email after a job interview.',
      '',
      '--- INTERVIEW DETAILS ---',
      'Company: ' + company,
      'Interviewer: ' + interviewer,
      (role ? 'Role: ' + role : ''),
      (date ? 'Interview Date: ' + date : ''),
      (keyPoints ? 'Key Points Discussed: ' + keyPoints : ''),
      '',
      '--- TONE ---',
      toneText,
      '',
      '--- INSTRUCTIONS ---',
      '1. Start with a proper email subject line.',
      '2. Address the interviewer by name.',
      '3. Thank them for their time.',
      '4. Reference specific points from the interview (if provided).',
      '5. Reiterate interest in the role and company.',
      '6. Keep the email concise (3-4 short paragraphs).',
      '7. Include a professional signature line.',
      '8. Output only the email text — no explanations, no markdown fences.',
      ''
    ].filter(function (line) { return line !== null; }).join('\n');

    return prompt;
  }

  /**
   * Call Google Gemini API to generate a follow-up email.
   * @param {object} details - Interview details
   * @param {string} apiKey - Google Gemini API key
   * @returns {Promise<string>} Generated email text
   */
  async function generateEmail(details, apiKey) {
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
      throw new Error('API key is required. Please provide a valid Google Gemini API key.');
    }

    var prompt = buildPrompt(details);
    var url = GEMINI_API_BASE + '?key=' + encodeURIComponent(apiKey.trim());

    var response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        })
      });
    } catch (networkError) {
      throw new Error('Network error: Unable to reach Google Gemini API. Please check your internet connection.');
    }

    if (!response.ok) {
      var errorText = 'API error: ' + response.status;
      try {
        var errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          errorText = errorData.error.message;
        }
      } catch (e) { /* use default error text */ }
      throw new Error(errorText);
    }

    var data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error('Failed to parse API response.');
    }

    var text = data.candidates && data.candidates[0] && data.candidates[0].content &&
               data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
               data.candidates[0].content.parts[0].text;

    if (!text || text.trim() === '') {
      throw new Error('No email content was generated. Please try again.');
    }

    return text.trim();
  }

  /* ---- Exports ---- */
  var api = {
    generateEmail: generateEmail,
    buildPrompt: buildPrompt
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    window.ApiService = api;
  }
})();
