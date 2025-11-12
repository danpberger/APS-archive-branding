## Ticket 1 — Build the Meeting Page Template (Semantic HTML)

**User Story**As a visitor, I want to open a meeting page that summarizes the meeting and links to its sessions so I can quickly navigate to topics and talks that interest me.

**Requirements / Clarifying Questions**

- Render strictly semantic HTML — no custom CSS or JS.
  - Question: confirm if an embedded reset/normalize stylesheet is permitted to improve default readability, or truly zero CSS.
- Input: one UTF-8 JSON file per meeting (structure per project object model).
- Output: `/{series}/{year}/index.html` and `/{series}/{year}/meeting.json`.
- Must include: start date, end date, location, description, list of sessions (each links to its session page).
- Include `<title>`, `<meta charset="utf-8">`, `<link rel="canonical">`.
- Breadcrumbs: not required, but confirm with Chris before omitting entirely.

**Acceptance Criteria**

- Meeting page renders valid HTML5.
- Data elements display correctly from provided JSON.
- Session links resolve to their session pages.
- Canonical link points to the correct meeting URL.
- Page can be viewed with no CSS or JS dependencies.

---

## Ticket 2 — Build the Session Page Template (Semantic HTML)

**User Story**As a visitor, I want to view a session page with full context and a list of its presentations so I can find specific talks or posters easily.

**Requirements / Clarifying Questions**

- Input: session data pulled from meeting JSON.
- Output path: `/{series}/{year}/{session_code}/index.html`.
- Must include:
  - Parent meeting link (text-only).
  - Title, Description, Event Chair, Topics, Sponsoring Units, Location/Room.
  - List of abstracts/presentations/posters (links to abstract pages).
- JSON field names for Chair, Topics, Sponsors, and Location should be confirmed or added as placeholders until schema is finalized.
- Follow same semantic HTML rules (no styling). All tickets in this set follow the same semantic HTML requirement for accessibility, readability, and long-term archiving.

**Acceptance Criteria**

- Page shows all required data fields.
- Abstract list links correctly to each abstract page.
- Canonical link points to session URL.
- Valid HTML output; no visual styling required.

---

## Ticket 3 — Build the Abstract Page Template (Semantic HTML)

**User Story**As a researcher or archivist, I want each abstract to have its own static, readable page so I can link or cite it easily.

*Question: Do these abstracts have DOIs? Do they need them? (Dan B recommends this.)*

**Requirements / Clarifying Questions**

- Input: abstract data from session JSON.
- Output path: `/{series}/{year}/{session_code}/{abstract_id}.html`.
- Must include:
  - Link to parent session.
  - Title.
  - Flags for “is invited” and “is withdrawn.”
  - Submitter and Authors list (ordered).
- Placeholders for `submitter` and `authors` keys (confirm final field names once schema is finalized).
- Follow same semantic HTML and metadata requirements.

**Acceptance Criteria**

- Abstract page displays all required data.
- Canonical link points to the abstract’s URL.
- All internal navigation works.
- HTML validates and loads with no scripts or styles.

---

## Ticket 4 — Global Layout Shell, Metadata, and Canonical URL Setup

**User Story**As a maintainer, I want all pages to share a consistent, accessible base structure and metadata so the site feels coherent and is easily archived.

**Requirements / Clarifying Questions**

- Provide a shared HTML shell (i.e., the shared HTML template structure — the base head and body markup all pages use) (`head` and `body` structure) used by all page types.
- Include:
  - `<meta charset="utf-8">`
  - `<title>` (dynamic per page)
  - `<link rel="canonical">`
  - Structural landmarks: `<header>`, `<main>`, `<footer>`
- No CSS or JS.
  - Question: confirm if a lightweight normalize or accessibility stylesheet may be embedded for basic readability.
- Breadcrumbs: not required per current decision — but confirm before finalizing.
- Question: should we include `schema.org/Event` or similar microdata now for semantic searchability, or defer to a later enhancement?

**Acceptance Criteria**

- All three page templates inherit this shared shell.
- Metadata populates correctly.
- Canonical links are valid and resolve correctly.
- HTML structure validates and is consistent across page types.

---

## Ticket 5 — Static Generation Pipeline & Sample Data Fixtures

**User Story**As a developer, I want to automatically generate the meeting archive pages from JSON files so I can publish a new archive without manual HTML editing.

**Requirements / Clarifying Questions**

- Implement a static generation process using Astro or Eleventy (confirm preference).
- Command: `npm run build` or similar. (replace with correct approach)
- Input: meeting JSON matching the current object model (add placeholders if needed).
- Output: static directory structure:
  - `/meeting/index.html`, `/meeting/meeting.json`
  - `/meeting/session/index.html`
  - `/meeting/session/abstract.html`
- Question: Confirm hosting target — is the initial deployment intended for S3 + CloudFront, local filesystem, or another host?
- Include 1–2 sample meeting JSON fixtures and minimal documentation (README).

**Acceptance Criteria**

- Build script runs successfully and outputs valid HTML.
- Directory structure matches design (meeting/session/abstract).
- All pages open locally and via static hosting (no JS required).
- Sample fixture JSON is included and documented.
