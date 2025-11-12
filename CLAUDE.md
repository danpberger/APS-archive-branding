# Kumhio - APS Meeting Archive Project

## Overview

**Kumhio** is a project planning repository for building a comprehensive, static-generated archival system for American Physical Society (APS) meeting content. The project focuses on creating a permanent, searchable archive of past APS meetings, sessions, and abstracts with stable URLs, proper canonicalization, and search engine optimization.

**Current Status:** Pre-development / Planning & Specification Phase
**Primary Purpose:** Archive site design, data modeling, and technical requirements documentation
**Key Stakeholder:** APS (American Physical Society)

---

## Project Type & Architecture

### Language & Framework
- **Primary Language:** Not yet determined (planning stage)
- **Recommended Approach:** Static site generation framework (Astro or Eleventy mentioned in tickets)
- **Data Format:** JSON (structured meeting/session/abstract data)
- **Output:** Static HTML + JSON files
- **Hosting Target:** S3 + CloudFront (tentatively mentioned)

### Purpose
Build a **static archival system** for APS meetings that:
1. Creates permanent, human-readable URLs for all meetings, sessions, and abstracts
2. Generates canonical links for SEO and citation
3. Supports Google Scholar bibliographic metadata
4. Implements redirects from legacy archive systems (e.g., Epitome)
5. Maintains an XML sitemap for search engine crawlability
6. Requires **zero JavaScript** and minimal CSS for maximum accessibility and archival longevity

### Key Architectural Principles
- **Semantic HTML only** - no framework dependencies, maximum compatibility
- **Static generation** - all HTML generated at build time from JSON sources
- **Permanent URLs** - collision-proof, deterministic path structure
- **Accessibility-first** - valid HTML5, semantic landmarks, ARIA support
- **Long-term archival** - minimal dependencies for future-proofing
- **Machine-readable** - microdata, Google Scholar tags, canonical links

---

## Project Structure & Key Directories

```
kumhio/
├── Archive_Site_Design_Tickets.md      # Core site design requirements (5 tickets)
├── APS-Google-Scholar-Tickets.md       # SEO & metadata requirements (4 tickets)
├── Kumiho_Archive_Tickets-*.csv        # Ticket tracking exports (Asana)
├── Meetings_Abstract_Archive_site_-sample.csv  # Sample meeting data
└── [Other CSV files: archived ticket versions]
```

**Current Content:**
- No source code yet (planning phase)
- Requirement specifications stored as Markdown tickets
- Task tracking in Asana (exported as CSV)
- Sample meeting data in CSV format

---

## Ticket Structure & Development Workflow

### Archive Site Design Tickets (5 core tickets)

**Ticket 1:** Build Meeting Page Template
- Semantic HTML representation of a meeting
- Input: JSON file per meeting
- Output: `/{series}/{year}/index.html` + `/{series}/{year}/meeting.json`
- Requirements: title, dates, location, session links

**Ticket 2:** Build Session Page Template
- Semantic HTML for session within a meeting
- Output: `/{series}/{year}/{session_code}/index.html`
- Includes: chair, topics, sponsors, location, presentation links

**Ticket 3:** Build Abstract Page Template
- Semantic HTML for individual presentation abstract
- Output: `/{series}/{year}/{session_code}/{abstract_id}.html`
- Includes: submitter, authors list, flags (invited/withdrawn)
- Note: Consider DOI assignment (referenced as recommendation)

**Ticket 4:** Global Layout Shell & Metadata
- Shared base HTML template for all pages
- Includes: meta charset, canonical links, semantic landmarks
- Metadata setup: title, description, structured data
- Question: Confirm normalize/reset CSS approach

**Ticket 5:** Static Generation Pipeline & Sample Fixtures
- Implement build process: `npm run build` (tentative)
- Input: meeting JSON files
- Output: static directory tree
- Deliverables: Sample fixtures + README documentation

### APS Meetings & Google Scholar Tickets (4 enhancement tickets)

**Ticket 1:** Stable URL Architecture & Canonicalization
- Define permanent URL scheme: `https://[host]/[series]/[year]/[session-code]/[abstract-id].html`
- Document collision-proof patterns (lowercase slugs, series+year namespacing)
- Place canonical tags on live pages for migrated content
- **Prerequisite for all downstream work**

**Ticket 2:** Unified Sitemap & Public Archive Listing
- Generate XML sitemap + sitemap index (if needed)
- Build global listing page aggregating all meetings across series/years
- Ensure all archive URLs crawlable

**Ticket 3:** Google Scholar Bibliographic Metadata
- Embed `<meta name="citation_*">` tags on abstract/session pages
- Map fields: title, authors, publication date, abstract, PDF URL, publisher
- Handle author grouping, ORCID, email (subject to privacy policy)
- Validation: test with ≥200 abstracts across ≥3 meetings

**Ticket 4:** Legacy Redirects (Epitome to meetings.aps.org)
- Implement 308 Permanent Redirects from legacy URLs
- Create & maintain URL mapping files
- Staged rollout per meeting after metadata validation
- Preserve query strings, avoid redirect chains

---

## Build & Development Commands

**Currently Undetermined** (per Ticket 5 clarification)

Likely patterns (to be confirmed):
```bash
npm run build         # Generate static HTML from JSON fixtures
npm run dev          # Local development server
npm test             # Validate HTML and JSON output
npm run generate-sitemap  # Create XML sitemap (proposed)
```

**No existing Makefile, package.json, or build scripts yet** - these will be created during Ticket 5 (Static Generation Pipeline).

---

## Configuration & Key Files

### Existing Documentation
- **Archive_Site_Design_Tickets.md** - Core design requirements with acceptance criteria
- **APS-Google-Scholar-Tickets.md** - SEO/metadata requirements with open questions
- **CSV Files** - Asana task exports and sample meeting data

### Configuration Files to Be Created
- `package.json` - Node.js project definition
- `astro.config.js` or `.eleventy.js` - Static generator configuration (framework TBD)
- `README.md` - Project setup and contribution guide
- `.gitignore` - Version control exclusions
- Possible: `.env.example` - Environment variable template

### Data Files (Sample)
- **Meetings_Abstract_Archive_site_(Kumiho)-sample.csv** - Sample meeting/abstract data
  - Columns: Task ID, Created At, Completed At, Last Modified, Name, Section/Column, etc.
  - Used for validating static generation and testing URL patterns

---

## Open Questions & Decisions Needed

### URL & Hosting
- [ ] Confirm archival host: `meetings.aps.org` vs. dedicated `archive.aps.org`
- [ ] Confirm initial deployment target: S3 + CloudFront vs. alternative
- [ ] Sitemap strategy: single monolithic vs. per-series/year sharded

### Schema & Data
- [ ] Finalize meeting JSON object model (field names, optional fields)
- [ ] Confirm session schema: Chair, Topics, Sponsors, Location field names
- [ ] Abstract schema: submitter vs. first_author; author ordering rules
- [ ] DOI strategy for abstracts (recommended by Dan B)

### Styling & CSS
- [ ] Can we embed a lightweight normalize/reset stylesheet?
- [ ] Or strictly zero CSS per requirements?
- [ ] Include schema.org/Event microdata now or defer?

### Privacy & Compliance
- [ ] Author email inclusion: permitted under APS policy?
- [ ] ORCID inclusion: acceptable practice?

### Implementation
- [ ] Static generator choice: Astro vs. Eleventy vs. other?
- [ ] Legacy URL mapping: complete data available, or derivation needed?
- [ ] Redirect latency SLA: confirm <150ms target
- [ ] Test suite scope: automated HTML validation, link checking, metadata audits?

---

## Recommended Next Steps

1. **Clarify Open Questions** (Tickets 1 & 3 in both sets have pending decisions)
   - Schedule sync with Chris and Dan B on URL hosting, CSS policy, schema scope
   - Confirm data model with APS contacts

2. **Define Object Model** (Required before any code)
   - Create JSON schema files for: Meeting, Session, Abstract
   - Document field names, validation rules, optional vs. required
   - Create 1–2 realistic sample fixtures

3. **Select Static Generator** (Blocks Ticket 5)
   - Evaluate Astro vs. Eleventy vs. alternatives
   - Prototype simple template with sample data

4. **Create Initial Repository Structure**
   - Set up Node.js project: `npm init`
   - Add chosen static generator
   - Create `src/templates/` for semantic HTML templates
   - Set up test framework (HTML5 validator, link checker, metadata auditor)

5. **Implement MVP** (Ticket 5 deliverables)
   - Semantic HTML templates for Meeting, Session, Abstract
   - Build pipeline to generate site from sample data
   - Documentation in README

6. **Validation & Enhancement** (Parallel work on Tickets 2–4)
   - URL canonicalization & sitemap generation
   - Google Scholar metadata embedding
   - Legacy redirect mappings

---

## Key Dependencies & Constraints

### Technical Constraints
- **Zero JavaScript** in output (some may exist at build time)
- **Semantic HTML5 only** - must validate
- **UTF-8 encoding** throughout
- **No runtime dependencies** in generated pages
- **Deterministic output** - same input always produces same output

### Resource Dependencies
- **Sample meeting data** (CSV available in repo; JSON schema TBD)
- **Legacy URL mapping** (may need to be derived from exported data)
- **Google Scholar spec** knowledge (referenced: `citation_*` meta tag standards)

### Stakeholder Coordination
- **Chris** (project owner) - URL architecture, CSS policy decisions
- **Dan B** - DOI strategy recommendation
- **Miyoung Mary Kim** (Project Lead) - mkim@aps.org
- **APS IT/IS teams** - hosting, deployment decisions

---

## Accessibility & Preservation Philosophy

This project prioritizes **long-term archival accessibility**:
- No framework lock-in or build-time JavaScript
- Pure semantic HTML for maximum compatibility with future tools
- Permanent, collision-proof URLs for citation and link stability
- Canonical tags for search engine deduplication
- Structured metadata for Google Scholar and other indexers
- Static files suitable for digital preservation systems

Generated pages should remain readable and usable in 50+ years without modification.

---

## References & External Context

- **Asana Board:** Task management via CSV exports
- **APS Meetings:** Multiple annual series (mechanics, optics, nuclear physics, etc.)
- **Epitome System:** Legacy archive to redirect from
- **Google Scholar:** Citation meta tag standards (referenced in Ticket 3)
- **Schema.org:** Structured data vocabulary (potential future use)

---

## Getting Started

**For new developers:**

1. Read `Archive_Site_Design_Tickets.md` first to understand the page templates
2. Review `APS-Google-Scholar-Tickets.md` for SEO/metadata strategy
3. Examine sample data in `Meetings_Abstract_Archive_site_(Kumiho)-sample.csv`
4. Check for decisions log or decision docs (not yet in this repo)
5. Clarify any open questions with project lead before implementation

**For maintainers:**

- Keep ticket documents in sync with Asana board
- Update open questions as decisions are made
- Create CONTRIBUTING.md once repository is set up
- Document JSON schema files in schema/ directory
- Maintain this CLAUDE.md file as reference architecture evolves

