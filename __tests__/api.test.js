/**
 * GOFLOW Email Generator — api.js unit tests
 *
 * Tests for the Gemini API module using mocked fetch.
 */

'use strict';

var originalFetch = global.fetch;

describe('api.js', function () {
  var api;

  function reloadModule() {
    delete require.cache[require.resolve('../src/api.js')];
    api = require('../src/api.js');
  }

  beforeAll(function () {
    reloadModule();
  });

  afterAll(function () {
    global.fetch = originalFetch;
  });

  describe('buildPrompt', function () {
    it('includes company name in the prompt', function () {
      var prompt = api.buildPrompt({ companyName: 'Acme Corp', interviewerName: 'Jane' });
      expect(prompt).toContain('Acme Corp');
    });

    it('includes interviewer name in the prompt', function () {
      var prompt = api.buildPrompt({ companyName: 'Acme', interviewerName: 'Jane Smith' });
      expect(prompt).toContain('Jane Smith');
    });

    it('includes role when provided', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        role: 'Software Engineer'
      });
      expect(prompt).toContain('Software Engineer');
    });

    it('includes interview date when provided', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        interviewDate: '2024-12-01'
      });
      expect(prompt).toContain('2024-12-01');
    });

    it('includes key points when provided', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        keyPoints: 'Discussed project management and team leadership'
      });
      expect(prompt).toContain('Discussed project management and team leadership');
    });

    it('includes tone instruction for "professional"', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        tone: 'professional'
      });
      expect(prompt).toContain('formal business tone');
    });

    it('includes tone instruction for "casual"', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        tone: 'casual'
      });
      expect(prompt).toContain('conversational');
    });

    it('includes tone instruction for "enthusiastic"', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        tone: 'enthusiastic'
      });
      expect(prompt).toContain('excitement');
    });

    it('includes tone instruction for "grateful"', function () {
      var prompt = api.buildPrompt({
        companyName: 'Acme',
        interviewerName: 'Jane',
        tone: 'grateful'
      });
      expect(prompt).toContain('gratitude');
    });

    it('defaults to professional tone when tone is not provided', function () {
      var prompt = api.buildPrompt({ companyName: 'Acme', interviewerName: 'Jane' });
      expect(prompt).toContain('formal business tone');
    });

    it('handles empty details gracefully', function () {
      var prompt = api.buildPrompt({ companyName: '', interviewerName: '' });
      expect(prompt).toContain('Company:');
      expect(prompt).toContain('Interviewer:');
    });
  });

  describe('generateEmail', function () {
    beforeEach(function () {
      global.fetch = jest.fn();
      reloadModule();
    });

    it('throws an error if API key is empty', function () {
      expect.assertions(1);
      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, '')
        .catch(function (err) {
          expect(err.message).toContain('API key');
        });
    });

    it('throws an error if API key is not a string', function () {
      expect.assertions(1);
      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, null)
        .catch(function (err) {
          expect(err.message).toContain('API key');
        });
    });

    it('calls the Gemini API with the correct URL and API key', function () {
      expect.assertions(4);
      var mockResponse = {
        ok: true,
        json: function () {
          return Promise.resolve({
            candidates: [{ content: { parts: [{ text: 'Dear Jane,\n\nThank you...' }], role: 'model' }, finishReason: 'STOP' }]
          });
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'test-key-123').then(function () {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        var callUrl = global.fetch.mock.calls[0][0];
        expect(callUrl).toContain('generativelanguage.googleapis.com');
        expect(callUrl).toContain('test-key-123');
        expect(callUrl).toContain('gemini-pro:generateContent');
      });
    });

    it('sends a POST request with JSON body', function () {
      expect.assertions(4);
      var mockResponse = {
        ok: true,
        json: function () {
          return Promise.resolve({
            candidates: [{ content: { parts: [{ text: 'Email body' }], role: 'model' }, finishReason: 'STOP' }]
          });
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'key').then(function () {
        var callOptions = global.fetch.mock.calls[0][1];
        expect(callOptions.method).toBe('POST');
        expect(callOptions.headers['Content-Type']).toBe('application/json');
        var body = JSON.parse(callOptions.body);
        expect(body.contents).toBeDefined();
        expect(body.contents[0].parts[0].text).toContain('Acme');
      });
    });

    it('returns the generated email text on success', function () {
      expect.assertions(1);
      var expectedEmail = 'Subject: Thank You for the Interview\n\nDear Jane,\n\nThank you for taking the time to interview me...\n\nBest regards';
      var mockResponse = {
        ok: true,
        json: function () {
          return Promise.resolve({
            candidates: [{ content: { parts: [{ text: expectedEmail }], role: 'model' }, finishReason: 'STOP' }]
          });
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'key').then(function (result) {
        expect(result).toBe(expectedEmail);
      });
    });

    it('throws on non-OK API response', function () {
      expect.assertions(1);
      var mockResponse = {
        ok: false,
        status: 400,
        json: function () {
          return Promise.resolve({ error: { message: 'Invalid API key' } });
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'bad-key')
        .catch(function (err) {
          expect(err.message).toContain('Invalid API key');
        });
    });

    it('throws on network/fetch failure', function () {
      expect.assertions(1);
      global.fetch.mockRejectedValue(new Error('Network down'));
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'key')
        .catch(function (err) {
          expect(err.message).toContain('Network error');
        });
    });

    it('throws when response has no candidates', function () {
      expect.assertions(1);
      var mockResponse = {
        ok: true,
        json: function () {
          return Promise.resolve({ candidates: [] });
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'key')
        .catch(function (err) {
          expect(err.message).toContain('No email content');
        });
    });

    it('throws when response JSON is invalid', function () {
      expect.assertions(1);
      var mockResponse = {
        ok: true,
        json: function () {
          return Promise.reject(new Error('Invalid JSON'));
        }
      };
      global.fetch.mockResolvedValue(mockResponse);
      reloadModule();

      return api.generateEmail({ companyName: 'Acme', interviewerName: 'Jane' }, 'key')
        .catch(function (err) {
          expect(err.message).toContain('parse');
        });
    });
  });
});
