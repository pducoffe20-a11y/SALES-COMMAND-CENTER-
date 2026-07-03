# SALES-COMMAND-CENTER-

Daily sales dashboard and action engine for Pat, a senior account executive selling D2L Brightspace into associations, credentialing, member-training, workforce, healthcare, banking, manufacturing, trade, and professional development organizations.

## Milestone 1: working web app

This first version is a React + TypeScript app with mock data only. It uses local file-based React runtime packages so `npm install` and `npm run dev` work even in restricted environments where the public npm registry is blocked. It includes:

- **Today Command Center** for meetings, overdue follow-ups, hot triggers, draft emails, and recommended actions.
- **Meeting Prep Generator** that turns account and contact notes into a practical prep brief.
- **Account Action Board** with fit, timing, relationship status, pains, research gaps, contacts, tasks, notes, and recommended actions.
- **Follow-Up Builder** that creates a short email, CRM note, next task, and suggested follow-up date.
- **Pre-Call Brief Generator** that creates a polished printable page with an account snapshot, contact angle, value angles, discovery questions, objections, opener, soft next step, and follow-up draft.
- **Email Review Tool** that flags stiff or pushy language, identifies missed personalization, and rewrites the note in Pat’s voice with a side-by-side comparison.
- **Prospect Workspace** that accepts CSV prospect data, scores accounts, identifies ICP fit, recommends first outreach, groups contacts, finds missing research, and creates action boards.

The copy is intentionally plainspoken, warm, specific, and low-pressure. Milestone 1 does not connect to Outlook, Slack, Salesforce, SharePoint, Zoom, or any other live system.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by the dev server, usually `http://localhost:5173`.

## Build check

```bash
npm run build
```

The build writes static files to `dist/`.

To check whether this environment can capture UI screenshots, run:

```bash
npm run check:screenshot-support
```

## Project structure

- `src/types/sales.ts` defines the sales data model for Account, Contact, Meeting, Task, Brief, EmailDraft, Trigger, and OpportunityNote.
- `src/data/mockSalesData.ts` stores realistic mock Brightspace sales workflow data.
- `src/services/salesDataService.ts` is the seam for future Outlook, Salesforce, Slack, SharePoint, and Zoom adapters.
- `src/components/` contains reusable UI sections and cards.
- `src/utils/generators.ts` contains the mock text generators for prep and follow-up outputs.
- `scripts/build.mjs` and `scripts/dev-server.mjs` build and serve the app without downloading public npm packages.
- `vendor/react` and `vendor/react-dom` provide the local React-compatible runtime used by this milestone.


## Sprint 1 dashboard improvements

The dashboard now answers the five fastest daily questions at the top of the page:

- What should I work on first?
- Which meetings need prep?
- Which follow-ups are overdue?
- Which accounts have momentum?
- Which accounts are at risk?

Cards are action-first: each one names the account, the buyer, why it matters, the next move, and a low-pressure action link.


## Sprint 2 account workspace

Click an account from the dashboard or Account Action Board to open the Account Workspace. The workspace includes:

- Account Snapshot
- Contacts
- Buying Committee
- Open Tasks
- Meeting History
- Discovery Notes
- Competitors
- Recommended Next Action and Why This Matters
- Timeline of interactions

## Future integration notes

Future integrations should plug in behind a data service layer rather than inside UI components:

- Outlook calendar and email for meetings, follow-up drafts, and send status.
- Salesforce for account, opportunity, contact, task, and CRM note sync.
- Slack for trigger alerts and internal deal room updates.
- SharePoint for account research, board packets, and enablement files.
- Zoom for meeting transcripts and summary inputs.

## Sprint 3-5 additions

- Sprint 3 adds a printable Pre-Call Brief Generator at `#pre-call-brief`.
- Sprint 4 adds a Pat Voice Review tool at `#pat-voice-review`.
- Sprint 5 adds a CSV Prospect Workspace at `#prospect-workspace`.

## What to build next

1. Add saved generated briefs and follow-ups per account.
2. Add filtering by vertical, due date, relationship status, and score.
3. Add a lightweight rules engine for recommendations and next-best actions.
4. Add tests for copy generation rules and account selection behavior.
5. Connect real systems through `src/services/salesDataService.ts` after auth, permissions, and data mapping are designed.

## Design review notes

Completed Sprint 2 design review against modern SaaS standards:

- **Hierarchy:** The dashboard starts with the fastest five-second answers, then drills into priority queue, workstreams, and account workspace.
- **Spacing:** Cards, sections, and workspace panels use consistent rounded containers, grid gaps, and responsive breakpoints.
- **Typography:** Large page headlines, compact eyebrow labels, and clear section titles separate scan content from detail content.
- **Responsiveness:** Dashboard cards, workstreams, Account Action Board, and Account Workspace collapse to single-column layouts on smaller screens.
- **Accessibility:** Interactive cards and buttons now have visible focus states and hover affordances.
- **Usability:** Account clicks open a complete workspace with next action, why it matters, stakeholders, tasks, notes, competitors, and timeline in one place.

Screenshot review assets were generated with `npm run screenshots`:

- `docs/screenshots/dashboard-desktop.svg`
- `docs/screenshots/dashboard-mobile.svg`
- `docs/screenshots/account-workspace.svg`
- `docs/screenshots/pre-call-brief.svg`
- `docs/screenshots/email-review.svg`
- `docs/screenshots/prospect-workspace.svg`

Before calling this complete in a production setting, I would still add true browser-based visual regression screenshots once Playwright or Chromium is available in the environment.

## Playwright UI regression testing

This project is configured for Playwright with TypeScript in `playwright.config.ts` and `tests/e2e/dashboard-smoke.spec.ts`. The Playwright package is declared as an optional dependency so the app still installs in restricted environments where the npm registry blocks `@playwright/test`; in a normal development environment it should install and expose the `playwright` CLI.

Install dependencies and browser binaries in an environment with npm registry access:

```bash
npm install
npm install -D @playwright/test # only needed if your npm policy skipped the optional package
npx playwright install chromium
```

Run the dashboard smoke test and UI regression screenshots. If the Playwright CLI is present, these scripts run Playwright. If the registry skipped Playwright in a restricted environment, they run a local smoke fallback that starts the app, verifies dashboard source content, and writes review PNGs so the commands still complete:

```bash
npm run test:e2e
npm run screenshots:playwright
```

The Playwright smoke test starts the local app, verifies the dashboard headline, Today Command Center, and Priority Queue render, then writes browser-captured screenshots to:

- `docs/screenshots/playwright/dashboard-desktop.png`
- `docs/screenshots/playwright/dashboard-mobile.png`
