/**
 * GOFLOW — AI Interview Follow-Up Email Generator
 * app.js — Form handling, validation, and UI orchestration
 *
 * Handles form submission, validates required fields (company name,
 * interviewer name), calls ApiService.generateEmail, and displays the
 * result in an editable textarea. Manages loading and error states.
 *
 * Works in browser and in Node.js test environments (CommonJS).
 */

(function () {
  'use strict';

  /* ---- DOM References ---- */
  var els = {};

  function cacheDom() {
    els.formPane = document.getElementById('formPane');
    els.resultPane = document.getElementById('resultPane');
    els.companyName = document.getElementById('companyName');
    els.interviewerName = document.getElementById('interviewerName');
    els.role = document.getElementById('role');
    els.interviewDate = document.getElementById('interviewDate');
    els.keyPoints = document.getElementById('keyPoints');
    els.tone = document.getElementById('tone');
    els.apiKey = document.getElementById('apiKey');
    els.btnGenerate = document.getElementById('btnGenerate');
    els.btnClear = document.getElementById('btnClear');
    els.generateSpinner = document.getElementById('generateSpinner');
    els.btnText = els.btnGenerate ? els.btnGenerate.querySelector('.btn-text') : null;
    els.errorBanner = document.getElementById('errorBanner');
    els.emailOutput = document.getElementById('emailOutput');
    els.resultPlaceholder = document.getElementById('resultPlaceholder');
    els.resultContent = document.getElementById('resultContent');
    els.companyNameError = document.getElementById('companyNameError');
    els.interviewerNameError = document.getElementById('interviewerNameError');
  }

  /* ---- Validation ---- */

  /**
   * Validate the form fields. Returns an object with isValid and errors.
   * @param {object} details - The form data
   * @returns {{ isValid: boolean, errors: Array<string> }}
   */
  function validate(details) {
    var errors = [];

    if (!details.companyName || details.companyName.trim() === '') {
      errors.push('Company name is required.');
    }

    if (!details.interviewerName || details.interviewerName.trim() === '') {
      errors.push('Interviewer name is required.');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /* ---- Field-level error display ---- */

  function clearFieldErrors() {
    if (els.companyName) { els.companyName.classList.remove('error'); }
    if (els.interviewerName) { els.interviewerName.classList.remove('error'); }
    if (els.companyNameError) { els.companyNameError.classList.add('hidden'); }
    if (els.interviewerNameError) { els.interviewerNameError.classList.add('hidden'); }
  }

  function showFieldError(field, errorEl, message) {
    if (field) { field.classList.add('error'); }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  /* ---- Error Banner ---- */

  function showError(message) {
    if (els.errorBanner) {
      els.errorBanner.textContent = message;
      els.errorBanner.classList.remove('hidden');
    }
  }

  function clearError() {
    if (els.errorBanner) {
      els.errorBanner.textContent = '';
      els.errorBanner.classList.add('hidden');
    }
  }

  /* ---- Loading State ---- */

  function setLoading(isLoading) {
    if (els.btnGenerate) {
      els.btnGenerate.disabled = isLoading;
    }
    if (els.generateSpinner) {
      els.generateSpinner.classList.toggle('hidden', !isLoading);
    }
    if (els.btnText) {
      els.btnText.textContent = isLoading ? 'Generating...' : 'Generate Email';
    }
  }

  /* ---- Collect Form Data ---- */

  function getFormData() {
    return {
      companyName: els.companyName ? els.companyName.value : '',
      interviewerName: els.interviewerName ? els.interviewerName.value : '',
      role: els.role ? els.role.value : '',
      interviewDate: els.interviewDate ? els.interviewDate.value : '',
      keyPoints: els.keyPoints ? els.keyPoints.value : '',
      tone: els.tone ? els.tone.value : 'professional'
    };
  }

  /* ---- Display Result ---- */

  function showResult(emailText) {
    if (els.resultPlaceholder) {
      els.resultPlaceholder.classList.add('hidden');
    }
    if (els.resultContent) {
      els.resultContent.classList.remove('hidden');
    }
    if (els.emailOutput) {
      els.emailOutput.value = emailText;
    }
  }

  function showPlaceholder() {
    if (els.resultPlaceholder) {
      els.resultPlaceholder.classList.remove('hidden');
    }
    if (els.resultContent) {
      els.resultContent.classList.add('hidden');
    }
    if (els.emailOutput) {
      els.emailOutput.value = '';
    }
  }

  /* ---- Form Submission ---- */

  /**
   * Handle the Generate button click.
   * Exported for testing.
   */
  async function handleGenerate() {
    clearError();
    clearFieldErrors();

    var details = getFormData();
    var validation = validate(details);

    if (!validation.isValid) {
      // Show field-level errors for required fields
      if (!details.companyName || details.companyName.trim() === '') {
        showFieldError(els.companyName, els.companyNameError, 'Company name is required.');
      }
      if (!details.interviewerName || details.interviewerName.trim() === '') {
        showFieldError(els.interviewerName, els.interviewerNameError, 'Interviewer name is required.');
      }
      showError(validation.errors.join(' '));
      return;
    }

    var apiKey = els.apiKey ? els.apiKey.value.trim() : '';
    if (!apiKey) {
      showError('Please enter your Google Gemini API key.');
      return;
    }

    setLoading(true);

    try {
      var emailText = await ApiService.generateEmail(details, apiKey);
      showResult(emailText);
    } catch (err) {
      showError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ---- Clear Form ---- */

  function handleClear() {
    if (els.companyName) { els.companyName.value = ''; }
    if (els.interviewerName) { els.interviewerName.value = ''; }
    if (els.role) { els.role.value = ''; }
    if (els.interviewDate) { els.interviewDate.value = ''; }
    if (els.keyPoints) { els.keyPoints.value = ''; }
    if (els.tone) { els.tone.value = 'professional'; }
    clearError();
    clearFieldErrors();
    showPlaceholder();
  }

  /* ---- Initialization ---- */

  function init() {
    cacheDom();

    if (els.btnGenerate) {
      els.btnGenerate.addEventListener('click', handleGenerate);
    }

    if (els.btnClear) {
      els.btnClear.addEventListener('click', handleClear);
    }

    // Allow Enter key to submit (only when not in a textarea)
    if (els.formPane) {
      els.formPane.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleGenerate();
        }
      });
    }
  }

  /* ---- Exports ---- */
  var app = {
    init: init,
    validate: validate,
    handleGenerate: handleGenerate,
    handleClear: handleClear
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = app;
  }

  /* ---- Bootstrap ---- */
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
