/**
 * GOFLOW Email Generator — app.js unit tests
 *
 * Tests for form validation and core app logic using jsdom.
 */

'use strict';

// Polyfill TextEncoder/TextDecoder for jsdom compatibility on older Node versions
var util = require('util');
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = util.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = util.TextDecoder;
}

// We need jsdom to provide a DOM environment
var { JSDOM } = require('jsdom');

describe('app.js — validation', function () {
  var app;

  beforeAll(function () {
    // Create a virtual DOM that matches our index.html structure
    var dom = new JSDOM('<!DOCTYPE html><html><body>' +
      '<form id="formPane">' +
      '  <input type="text" id="companyName" value="">' +
      '  <input type="text" id="interviewerName" value="">' +
      '  <input type="text" id="role" value="">' +
      '  <input type="date" id="interviewDate" value="">' +
      '  <textarea id="keyPoints"></textarea>' +
      '  <select id="tone"><option value="professional">Professional</option></select>' +
      '  <input type="password" id="apiKey" value="">' +
      '  <button class="btn-generate" id="btnGenerate">Generate Email</button>' +
      '  <span class="btn-text">Generate Email</span>' +
      '  <span class="btn-spinner hidden" id="generateSpinner"></span>' +
      '  <button id="btnClear">Clear Form</button>' +
      '  <div class="error-banner hidden" id="errorBanner"></div>' +
      '  <textarea class="email-output" id="emailOutput"></textarea>' +
      '  <div id="resultPlaceholder"></div>' +
      '  <div class="result-content hidden" id="resultContent"></div>' +
      '  <span class="field-error hidden" id="companyNameError"></span>' +
      '  <span class="field-error hidden" id="interviewerNameError"></span>' +
      '</form>' +
      '</body></html>', { url: 'http://localhost' });

    // Set up the global environment
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;

    // We do NOT call init() because it would attach event listeners we
    // don't need for these validation tests. Instead we just require
    // the module to get the validate function.
    delete require.cache[require.resolve('../src/app.js')];
    app = require('../src/app.js');
  });

  afterAll(function () {
    // Clean up globals
    delete global.window;
    delete global.document;
    delete global.navigator;
  });

  describe('validate()', function () {
    it('returns isValid: false when company name is missing', function () {
      var result = app.validate({ companyName: '', interviewerName: 'Jane' });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toContain('Company name');
    });

    it('returns isValid: false when company name is whitespace only', function () {
      var result = app.validate({ companyName: '   ', interviewerName: 'Jane' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Company name');
    });

    it('returns isValid: false when interviewer name is missing', function () {
      var result = app.validate({ companyName: 'Acme', interviewerName: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toContain('Interviewer name');
    });

    it('returns isValid: false when interviewer name is whitespace only', function () {
      var result = app.validate({ companyName: 'Acme', interviewerName: '   ' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('Interviewer name');
    });

    it('returns isValid: false with both errors when both required fields are missing', function () {
      var result = app.validate({ companyName: '', interviewerName: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(2);
    });

    it('returns isValid: true when all required fields are present', function () {
      var result = app.validate({ companyName: 'Acme Corp', interviewerName: 'Jane Smith' });
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('returns isValid: true with extra optional fields', function () {
      var result = app.validate({
        companyName: 'Acme Corp',
        interviewerName: 'Jane Smith',
        role: 'Engineer',
        interviewDate: '2024-12-01',
        keyPoints: 'Discussed architecture',
        tone: 'professional'
      });
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });
});
