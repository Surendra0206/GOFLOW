# business_analysis: A single-page CV tailored for a non-IT associate working at Wipro. The user fills a simple form to edit their profession

Status: draft

## outOfScope

- User authentication or login.
- Server-side processing or persistent storage of CV data.
- Multi-language support or localization beyond English.
- Photograph upload, editing, or display.
- Wipro-specific branding or corporate design elements.
- Print-only functionality without PDF download.
- Multiple CV pages or navigation beyond the single-page layout.
- Integration with external services for resume parsing, job boards, or analytics.

## assumptions

- The CV is designed for administrative, operational, or support roles—no technical/IT-specific sections.
- The user provides all content; there is no backend or database to store or retrieve CV data.
- PDF generation is performed entirely in the browser using a client-side library (e.g., jsPDF, pdfmake) without requiring a server.
- Form data is not persisted across sessions; refreshing the page resets all fields.
- The single-page constraint applies to the PDF output, not necessarily the live preview.
- The application is delivered as a standalone HTML file with embedded CSS and JavaScript.

## userStories

- As a user, I can fill out a simple form with my professional information, including contact details, summary, work experience, education, and skills, tailored for a non-IT role.
- As a user, I see a live, single-page preview of my CV that updates as I edit the form.
- As a user, I can download a PDF version of my CV with a single click.
- As a user, the CV content is initially empty, allowing me to enter my own information from scratch.

## scopeAnswers

- Should form data be temporarily saved in browser local storage so the user can close and return to edit later, or should data reset on page refresh?
Answer: temporarily saved in local stoarge
- How strictly should the CV conform to a single page in the PDF download? Should the form limit input length automatically to ensure one page, or should longer content be scaled or truncated?
Answer: no input length but needs to match ATS
- Should the PDF exactly mirror the on-screen preview, or can it have a dedicated print-optimized layout?
Answer: on screen preview

## scopeQuestions

- BLOCKING USER DECISION: Should form data be temporarily saved in browser local storage so the user can close and return to edit later, or should data reset on page refresh?
- BLOCKING USER DECISION: How strictly should the CV conform to a single page in the PDF download? Should the form limit input length automatically to ensure one page, or should longer content be scaled or truncated?
- BLOCKING USER DECISION: Should the PDF exactly mirror the on-screen preview, or can it have a dedicated print-optimized layout?

## acceptanceCriteria

- The form includes input fields for name, contact details, professional summary, work experience (company, role, dates, description), education (institution, degree, year), and skills.
- The CV preview updates automatically without page reload as the user types.
- A 'Download PDF' button generates and saves a single-page PDF file that accurately reflects the CV content and layout.
- The page does not include any photograph upload or display functionality.
- All text and labels are in English; no localization is present.
- No Wipro logos, colors, or branding elements are included.
- The interface works in the latest versions of Chrome, Firefox, and Edge.
