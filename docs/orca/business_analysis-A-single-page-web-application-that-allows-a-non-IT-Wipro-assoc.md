# business_analysis: A single-page web application that allows a non-IT Wipro associate to fill out a CV form, preview it in real time, and d

Status: draft

## outOfScope

- Server-side storage or backend database
- User authentication/accounts
- Multi-language or localization support
- Photograph upload or display
- Wipro branding or logo integration
- Sharing the CV via link or social media
- Importing/exporting data from LinkedIn or other platforms
- Advanced formatting (multiple columns, graphs, icons)
- Spelling/grammar check
- Analytics or tracking
- Email delivery of the CV

## assumptions

- The user has a modern web browser (latest Chrome, Firefox, or Edge) with JavaScript enabled.
- The CV sections required are typical for a non-IT role: Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements.
- The default CV layout will be a clean, single-column, ATS-friendly design with black text on white background, no images or graphics.
- The user will keep content concise enough to fit a single page; the application will not enforce character limits or auto-scale content.
- The CV is intended for a non-IT audience, so technical jargon or formatting is minimized.
- The user does not need to customize fonts, colors, or layouts beyond the default template.
- localStorage is the only persistence mechanism; no server-side storage or backup.

## userStories

- As a Wipro associate, I want to enter my personal details, professional summary, work experience, education, skills, and other CV sections into a simple form so that I can build my CV without coding knowledge.
- As a Wipro associate, I want to see a live preview of my CV updating as I type so that I can ensure the layout looks correct before downloading.
- As a Wipro associate, I want my in-progress form data to be saved automatically in the browser so that I can close the tab and return later without losing my work.
- As a Wipro associate, I want to download my CV as a PDF that exactly matches the on-screen preview so that I can share it with potential employers via email or applicant tracking systems.
- As a Wipro associate, I want the generated CV to follow ATS-friendly formatting (plain text, single-column, standard font) to maximize its chances of being properly parsed by recruitment software.
- As a Wipro associate, I want the final CV to fit on a single page (when content is reasonable) so that it meets common application expectations.

## scopeAnswers

- What specific sections should the CV include? (e.g., Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements)
Answer: Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements)
- How should the system handle content that exceeds one page? Options: (a) auto-scale font and margins to force fit, (b) warn the user but allow multi-page PDF, (c) require the user to shorten content until it fits, (d) allow overflow into additional pages without warning.
Answer: auto-scale font and margins to force fit

## scopeQuestions

- BLOCKING USER DECISION: What specific sections should the CV include? (e.g., Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements)
- BLOCKING USER DECISION: How should the system handle content that exceeds one page? Options: (a) auto-scale font and margins to force fit, (b) warn the user but allow multi-page PDF, (c) require the user to shorten content until it fits, (d) allow overflow into additional pages without warning.
- Should the user be able to choose from multiple layout templates or stick with a single default?

## acceptanceCriteria

- Form includes fields for all requested CV sections (to be confirmed).
- Form input is reflected in the live preview with no noticeable delay.
- Form data is saved to browser localStorage whenever the user types or changes a field.
- On page reload, the form is pre-populated with the saved data from localStorage.
- The 'Download PDF' button generates a PDF that visually matches the on-screen preview.
- The PDF is ATS-friendly: uses standard fonts, avoids graphics, tables, or multi-column layouts, and is fully machine-readable.
- The CV attempts to fit on one page; overflow handling is consistent with the agreed approach (to be clarified).
- The application works offline in a modern browser (Chrome, Firefox, Edge) with no server interaction.
- No photograph, Wipro-specific branding, or multi-language support is included.
- No user authentication or cloud storage; all data stays on the user's device.
