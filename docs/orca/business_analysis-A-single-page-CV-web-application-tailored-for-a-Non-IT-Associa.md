# business_analysis: A single-page CV web application tailored for a Non-IT Associate at Wipro. Users fill out a form with sections like Pers

Status: draft

## outOfScope

- Multi‑language support; English only.
- Photograph upload or display.
- Wipro corporate branding.
- User accounts, authentication, or server‑side storage.
- Multiple CV templates or layouts.
- Export to formats other than PDF (e.g., Word, plain text).
- Analytics, monitoring, or error tracking.
- Dynamic role selection; CV is structured for a Non‑IT Wipro associate and cannot be reconfigured for other roles.
- Integration with any Applicant Tracking System (ATS) beyond producing ATS‑friendly formatting.

## tlFeedback

- User stories and acceptance criteria are specific and testable.
- Assumptions and out-of-scope items are clearly documented.

## assumptions

- The app targets a single user on a personal device; no authentication, multi‑user, or server‑side storage needed.
- Auto‑scaling reduces font size and margins until the PDF fits one page; if content is extremely long, the result may become too small to read, but the algorithm still forces one page.
- The user’s browser supports modern APIs (Blob, download attribute, canvas) and has adequate localStorage capacity.
- A client‑side PDF library (e.g., jsPDF or html2pdf) will be bundled as a dependency; no external runtime service is required for PDF generation.
- The CV layout uses standard, recognizable section headings (e.g., "Work Experience") to pass ATS parsing.
- Data stored in localStorage is text‑only and well under typical size limits.

## userStories

- As a Non-IT Associate at Wipro, I want to fill out a simple form with my professional details so that I can generate a CV tailored for non-IT roles.
- As a user, I want my form data automatically saved in browser local storage so that I can close the tab and return later without losing progress.
- As a user, I want to see a real-time on-screen preview of my CV as I type.
- As a user, I want to download my CV as a single-page PDF that matches the on-screen preview.
- As a user, I want the PDF to enforce a one-page length by automatically scaling font sizes and margins if my content is too long.
- As a user, I want the CV to include standard sections: Personal Details, Professional Summary, Work Experience, Education, Skills, Certifications, Languages, Achievements.
- As a user, I want the CV to be in English only, with no photograph or brand-specific formatting.

## scopeQuestions

- When auto‑scaling font sizes to fit one page, should the app show a warning to the user if the resulting font size drops below a readable threshold (e.g., 8pt)?

## tlReviewStatus

- Approved by Tech Lead

## tlChangeRequests


## acceptanceCriteria

- The app is a single HTML page containing an input form and a preview panel.
- Form fields cover all specified sections with appropriate input types (text, textarea, etc.).
- All form data is saved to localStorage on every change and re-populated on page load.
- The preview updates in real time with a clean, single-paragraph, ATS-friendly layout.
- "Download PDF" button triggers a client-side PDF generation that produces a single-page document.
- The PDF visual matches the on-screen preview (same layout and content).
- When content overflows one page, font sizes and margins are gradually reduced until it fits (down to a minimum legible size).
- No photograph field or image upload is present.
- Output language is English; no localization.
- No Wipro logos, colors, or trademarks are applied.
- PDF generation works offline, without server calls.
