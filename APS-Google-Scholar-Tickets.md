# APS Meetings: Google Scholar & Archive Tickets (Draft)


---

## Ticket 1 — Stable URL Architecture & Canonicalization

**Goal:** Define and implement a permanent, collision‑proof URL scheme for all APS meetings (past/current/future) and publish canonical links for archived content.

**User story**  
*As a researcher, I want stable, human‑readable URLs for meeting pages, sessions, and abstracts so I can cite and revisit them reliably years later.*

**Requirements / open questions**

- Adopt the archive URL pattern from the Meeting Archive Design, e.g. `https://[archival-host]/[series]/[year]/[session-code]/[abstract-id].html`; directory requests map to index pages; publish `meeting.json` adjacent to HTML for each meeting 【10】.
- Document path conventions for multi‑meeting scheduler to avoid collisions (e.g., namespace by series + year; enforce lowercase slugs; forbid renames once published).
- Canonicalization for *past* meetings: add `<link rel="canonical" href="{archive-URL}">` to live pages during transition.
- This ticket stops at canonical tag placement and stable URL creation only; do not include redirect implementation here (handled in Ticket 4).
- **Open Q:** Which host is the archival origin of truth? (e.g., `meetings.aps.org` vs. dedicated `archive.aps.org`).
- **Open Q:** Confirm that only *past/archive* URLs are in scope for canonicalization (assumption: yes).

**Acceptance criteria**

- URL scheme doc approved (paths for meeting, session, abstract, downloadable JSON).
- Sample build renders for ≥1 legacy meeting and ≥1 current meeting without collisions.
- Canonical tags present on corresponding live pages for migrated meetings; no redirect logic included here.
- All generated URLs are deterministic from input JSON and remain unchanged on rebuilds.

**Technical notes**

- Keep URLs ASCII‑safe; reserve set for slugs; store original titles separately for display.
- Do not leak internal IDs in public paths unless they are already public and permanent.

**Dependencies:**
- Prerequisite for Ticket 2 (sitemap), Ticket 3 (metadata), and Ticket 4 (redirects). Must complete first to define canonical paths used downstream.

---

## Ticket 2 — Unified Sitemap & Public Archive Listing

**Goal:** Make all crawlable archive URLs discoverable: a machine XML sitemap and a human "bulletin" listing page.

**User story**  
*As a search engine and as a human visitor, I want a comprehensive index of APS meeting content so I can find sessions/abstracts across years.*

**Requirements / open questions**

- Generate an XML sitemap containing *only* past/archive URLs (assumption) with lastmod timestamps and priority hints.
- Auto‑update sitemap on each publish.
- Build a **global** archive listing page (`/listing/` or agreed path) that aggregates links to every meeting across series/years. It must **not** rebuild per‑meeting pages (those are handled by the Archive Site Design ticket set); it may link down to session and abstract pages for crawlability.
- **Open Q:** Confirm final path for listing page and whether it should include legacy series that are now merged.
- **Open Q:** One sitemap index vs. multiple per year/series for size control.

**Acceptance criteria**

- Valid `sitemap.xml` (and `sitemap_index.xml` if used) published at site root; passes Search Console validation.
- Global listing page renders a cross‑year index with working links to meetings, sessions, abstracts, without generating or duplicating per‑meeting index pages.
- Spot‑check: 100% of rendered pages appear in sitemap; no `noindex` or robots conflicts.

**Technical notes**

- Keep per‑file counts under common engine limits (~50k URLs/50MB uncompressed per file).
- Include meeting JSON URLs in sitemap if we want them discoverable by external tools.

**Dependencies:**
- Depends on Ticket 1 (URL Architecture) to define canonical and stable paths before sitemap generation.

---

## Ticket 3 — Google Scholar Bibliographic Metadata

**Goal:** Embed complete `<meta name="citation_*">` tags on abstract/session pages so Google Scholar can index properly.

**User story**  
*As a scholar, I want complete bibliographic metadata on abstract pages so my citations resolve correctly in Google Scholar.*

**Requirements / open questions**

- Source of truth is the static meeting JSON (assumption). Map fields to the Scholar spec.
- Required/primary tags per spec include (non‑exhaustive): `citation_title`, `citation_conference_title`, `citation_publication_date` (YYYY[/MM[/DD]]), `citation_author` (repeatable with grouped author info), `citation_author_institution` (repeatable), `citation_author_email` (if policy allows), `citation_abstract`, `citation_pdf_url` (if available, **must be same host as HTML**), `citation_publisher`, `citation_language`, and optional conference fields/keywords where applicable【9】.
- Encoding & escaping: use same page encoding (UTF‑8), escape `<`, `>`, `&`, and any delimiter characters in meta values; skip missing fields (no placeholders)【9】.
- Author ordering must match the abstract; group each author’s fields with `citation_author` first; ORCID optional (`citation_author_orcid`)【9】.
- Publication vs. online dates: include at least one of `citation_publication_date` or `citation_online_date`; both allowed when distinct【9】.
- **Open Q:** Are author emails permitted under APS privacy policy for public pages? If not, omit `citation_author_email`.
- **Open Q:** Confirm the publisher string to use consistently (e.g., "American Physical Society").

**Acceptance criteria**

- For a sample set (≥200 abstracts across ≥3 meetings), pages contain valid, escaped citation meta tags meeting the above rules; automated validator shows no missing required fields.
- Author order in tags matches display order; multi‑author grouping verified.
- If PDFs exist, `citation_pdf_url` resolves on the same host as the abstract HTML; otherwise tag omitted【9】.
- Spot‑checked by fetching HTML and parsing tags; results match JSON values.

**Technical notes**

- Include keywords via `citation_keywords` (semicolon‑separated) when available; support conference abbreviations via `citation_conference_abbrev` (repeatable)【9】.
- Consider `citation_fulltext_world_readable` when content is permanently free‑to‑read【9】.

**Dependencies:**
- Depends on Ticket 1 (canonical URLs) to ensure consistent metadata linking.
- Runs after Ticket 2 (sitemap) for discoverability testing.
- Must complete and pass validation before Ticket 4 (redirects) is enabled to avoid crawler confusion.

---

## Ticket 4 — Legacy Redirects (Epitome to meetings.aps.org)

**Goal:** Preserve link equity and user bookmarks by redirecting legacy Epitome abstract URLs (and other prior hosts) to the new archive URLs.

**User story**  
*As a researcher following an old link, I want to land on the correct modern abstract page without errors so I can access the content seamlessly.*

**Requirements / open questions**

- Implement HTTP **308 Permanent Redirects** from all legacy abstract/session/meeting URLs to the canonical archive URLs.
- **Open Q:** Do we have a complete mapping of legacy URLs → new URLs? If not, plan a derivation strategy (e.g., from legacy IDs, slugs, or exported tables) and produce a mapping file under version control.
- Redirects must preserve query strings where necessary and avoid redirect chains/loops.
- Staged rollout: enable per‑meeting after Ticket 1 canonical tags are live and **after Ticket 3 metadata passes validation**.
- Scope note: This ticket does **not** modify canonical tags or URL patterns; those are defined in Ticket 1.

**Acceptance criteria**

- Mapping exists and covers ≥99% of legacy URLs for targeted migrations; missing entries logged and remediated.
- Hitting a sample of legacy URLs returns 308 to the expected archive URL; latency <150ms at edge.
- Search Console shows decreasing legacy 404s and successful canonicalization.

**Technical notes**

- Prefer edge‑level rules (e.g., CloudFront Functions/Lambda@Edge) or origin rewrites depending on hosting.
- Maintain a regression test that crawls the mapping and verifies 308 targets.

**Dependencies:**
- Depends on Ticket 1 (URL Architecture) to know canonical targets.
- Runs after Ticket 3 (metadata) so redirect targets are fully indexed and validated.

---

