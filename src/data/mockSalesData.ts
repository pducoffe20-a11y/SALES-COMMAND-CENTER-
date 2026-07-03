import type { Account, Brief, BuyingCommitteeMember, Competitor, Contact, DiscoveryNote, EmailDraft, Interaction, Meeting, MeetingHistoryItem, OpportunityNote, Task, Trigger } from '../types/sales';

// Future integrations should replace these arrays through a data service layer.
// Outlook, Salesforce, Slack, SharePoint, and Zoom should not be called directly from UI components.

export const accounts: Account[] = [
  {
    id: 'a1',
    name: 'American Board of Clinical Nutrition',
    vertical: 'Credentialing',
    fitScore: 92,
    timingScore: 88,
    relationshipStatus: 'Engaged',
    knownPain: 'Certification prep lives in PDFs, webinars, and a dated LMS that does not show learner risk early.',
    nextBestMove: 'Send a one-page map of certification prep journeys in Brightspace with exam readiness checkpoints.',
    lastTouch: '2026-07-01',
    nextTouchDue: '2026-07-03',
    researchGaps: ['Current LMS contract end date', 'Board approval timeline', 'Exam retake policy'],
  },
  {
    id: 'a2',
    name: 'Midwest Manufacturing Safety Council',
    vertical: 'Manufacturing',
    fitScore: 84,
    timingScore: 76,
    relationshipStatus: 'Warming',
    knownPain: 'Plant managers need proof that safety training is complete before quarterly audits.',
    nextBestMove: 'Ask for the audit reporting sample they use today and offer a side-by-side reporting review.',
    lastTouch: '2026-06-27',
    nextTouchDue: '2026-07-02',
    researchGaps: ['Number of member companies', 'Mobile access needs on shop floor', 'Audit cadence by site'],
  },
  {
    id: 'a3',
    name: 'National Credit Union Learning Network',
    vertical: 'Banking',
    fitScore: 89,
    timingScore: 69,
    relationshipStatus: 'Champion',
    knownPain: 'Member credit unions want compliance courses and role-based development in one place.',
    nextBestMove: 'Equip Dana with questions for finance about shared catalog pricing and reporting needs.',
    lastTouch: '2026-07-02',
    nextTouchDue: '2026-07-05',
    researchGaps: ['Procurement owner', 'Security questionnaire owner', 'Budget approval date'],
  },
  {
    id: 'a4',
    name: 'Association of Rural Health Educators',
    vertical: 'Healthcare',
    fitScore: 78,
    timingScore: 91,
    relationshipStatus: 'New',
    knownPain: 'They are launching continuing education for distributed clinical educators this fall.',
    nextBestMove: 'Book a short needs call focused on CE tracking, content reuse, and learner support.',
    lastTouch: '2026-06-24',
    nextTouchDue: '2026-07-03',
    researchGaps: ['CE accreditation requirements', 'Launch date', 'Content migration volume'],
  },
];

export const contacts: Contact[] = [
  { id: 'c1', accountId: 'a1', name: 'Maya Chen', title: 'Director of Certification', role: 'Economic buyer', angle: 'Needs learner progress visibility before exam season.', lastInteraction: 'Discovery call on 2026-07-01' },
  { id: 'c2', accountId: 'a1', name: 'Jon Rivera', title: 'Learning Operations Manager', role: 'Technical evaluator', angle: 'Cares about admin time and clean reporting.', lastInteraction: 'Email thread about reporting exports' },
  { id: 'c3', accountId: 'a2', name: 'Rachel Kim', title: 'VP, Member Programs', role: 'Champion', angle: 'Wants better training proof for member audits.', lastInteraction: 'Left voicemail on 2026-06-27' },
  { id: 'c4', accountId: 'a3', name: 'Dana Patel', title: 'Chief Learning Officer', role: 'Champion', angle: 'Trying to align compliance and career pathways.', lastInteraction: 'Demo recap sent on 2026-07-02' },
  { id: 'c5', accountId: 'a4', name: 'Luis Gomez', title: 'Program Director', role: 'Evaluator', angle: 'Needs a fall launch without adding staff.', lastInteraction: 'Inbound form from CE webinar' },
];

export const meetings: Meeting[] = [
  { id: 'm1', accountId: 'a1', contactId: 'c1', time: '10:00 AM', meetingType: 'Discovery follow-up', context: 'Maya wants to compare certification learner journeys before presenting options to the board.', whyItMatters: 'A clear journey map can turn a broad LMS conversation into a board-ready certification story.', recommendedNextAction: 'Open with her board deadline, then confirm the three learner checkpoints she needs to prove.', softCta: 'Would it be useful if I send a simple journey map after our call?' },
  { id: 'm2', accountId: 'a4', contactId: 'c5', time: '2:30 PM', meetingType: 'First call', context: 'Luis downloaded the CE webinar guide and mentioned a fall launch.', whyItMatters: 'Timing is strong, but the first call needs to stay focused on launch risk and CE tracking.', recommendedNextAction: 'Ask what must be true by September for the launch to feel safe.', softCta: 'If the fit looks right, we can set up a short working session around your launch checklist.' },
];

export const tasks: Task[] = [
  { id: 't1', accountId: 'a2', contactId: 'c3', title: 'Send audit reporting examples', dueDate: '2026-07-02', status: 'Overdue', context: 'Rachel asked how plant managers can prove completion by site.', whyItMatters: 'Audit proof is the clearest business pain and could pull operations into the deal.', recommendedNextAction: 'Send two reporting screenshots and ask for one sample of their current audit packet.', softCta: 'If helpful, I can mark up where Brightspace would remove manual work.' },
  { id: 't2', accountId: 'a4', contactId: 'c5', title: 'Research CE requirements', dueDate: '2026-07-03', status: 'Due Today', context: 'Their program likely requires completion records for continuing education credits.', whyItMatters: 'Showing you understand CE tracking will make the first call feel specific.', recommendedNextAction: 'Review their CE pages and bring two questions about credit rules.', softCta: 'I can keep this practical and focus only on the records you need to maintain.' },
];

export const triggers: Trigger[] = [
  { id: 'tr1', accountId: 'a3', contactId: 'c4', signal: 'New compliance learning director posted on LinkedIn', context: 'The team is investing in compliance leadership.', whyItMatters: 'A new leader may be reviewing the learning stack and reporting gaps.', recommendedNextAction: 'Ask Dana if the new director should join the next Brightspace reporting discussion.', softCta: 'Would it make sense to include them so we answer their questions early?' },
  { id: 'tr2', accountId: 'a1', contactId: 'c2', signal: 'Board meeting agenda mentions certification modernization', context: 'The board is discussing the exact initiative Maya raised.', whyItMatters: 'This creates urgency for a concise, executive-ready recommendation.', recommendedNextAction: 'Offer a short board prep summary that links Brightspace capabilities to certification outcomes.', softCta: 'I can draft a one-page summary for you to edit if that would save time.' },
];

export const emailDrafts: EmailDraft[] = [
  { id: 'e1', accountId: 'a1', contactId: 'c1', subject: 'Certification prep checkpoints', context: 'Draft recap after Maya shared board pressure.', whyItMatters: 'The message should help her see a clear path without sounding pushy.', recommendedNextAction: 'Review for specificity, then send with the journey map attached.', softCta: 'Would you like me to tailor this around your board packet?', body: 'Maya — the clearest next step seems to be mapping the learner path from enrollment to exam readiness. I noted three checkpoints: enrollment completion, practice activity progress, and risk flags before the exam window.' },
  { id: 'e2', accountId: 'a2', contactId: 'c3', subject: 'Audit reporting example', context: 'Draft response to Rachel about plant-level reporting.', whyItMatters: 'A useful example can restart a stalled thread and anchor the next meeting.', recommendedNextAction: 'Add one concrete screenshot reference and ask for her current audit packet format.', softCta: 'If useful, I can compare this with the report your plant managers use today.', body: 'Rachel — I pulled together a simple example of how safety completion can be viewed by site, role, and due date. The main idea is to make audit prep less manual for plant managers.' },
];

export const briefs: Brief[] = [
  { id: 'b1', accountId: 'a1', summary: 'Credentialing organization modernizing certification prep before a board decision.', valueAngles: ['Show learner risk before exam season', 'Give staff cleaner certification reporting', 'Create a board-ready path from prep to renewal'], discoveryQuestions: ['What learner signals do you wish you had before the exam window?', 'Which reports take the most staff time today?', 'What will the board need to believe to approve a change?', 'How are candidates supported when they fall behind?', 'Where does your current platform create extra work?'], likelyObjections: ['Board may delay funding', 'Content migration feels risky', 'Team may worry about admin lift'] },
  { id: 'b2', accountId: 'a2', summary: 'Member safety council needs cleaner completion proof for audits.', valueAngles: ['Reduce manual audit packet work', 'Help plant managers see overdue training sooner', 'Give members consistent records across sites'], discoveryQuestions: ['What happens when a site cannot prove completion quickly?', 'Who owns audit packet preparation?', 'Which training must be mobile-friendly?', 'How do members request reports today?', 'What would make the next audit cycle easier?'], likelyObjections: ['Member adoption may vary', 'Reporting requirements differ by site', 'Budget may sit with operations'] },
];

export const opportunityNotes: OpportunityNote[] = [
  { id: 'n1', accountId: 'a1', date: '2026-07-01', note: 'Maya wants examples that connect certification prep to pass-rate confidence without overpromising outcomes.', nextAction: 'Send journey map and ask for current learner milestone definitions.', whyItMatters: 'Her board story depends on credible checkpoints, not product claims.' },
  { id: 'n2', accountId: 'a3', date: '2026-07-02', note: 'Dana liked the shared catalog concept but needs pricing and governance language for finance.', nextAction: 'Prepare finance-friendly catalog options.', whyItMatters: 'Champion needs internal language to keep momentum without Pat in the room.' },
];


export const buyingCommittee: BuyingCommitteeMember[] = [
  { id: 'bc1', accountId: 'a1', name: 'Maya Chen', title: 'Director of Certification', influence: 'Decision maker', stance: 'Supportive', whatTheyCareAbout: 'Board-ready certification modernization and learner risk visibility.' },
  { id: 'bc2', accountId: 'a1', name: 'Jon Rivera', title: 'Learning Operations Manager', influence: 'Evaluator', stance: 'Neutral', whatTheyCareAbout: 'Admin effort, reporting exports, and migration workload.' },
  { id: 'bc3', accountId: 'a1', name: 'Priya Nair', title: 'CFO', influence: 'Approver', stance: 'Unknown', whatTheyCareAbout: 'Budget timing and clear member value.' },
  { id: 'bc4', accountId: 'a2', name: 'Rachel Kim', title: 'VP, Member Programs', influence: 'Champion', stance: 'Supportive', whatTheyCareAbout: 'Audit-ready proof for members without adding staff work.' },
  { id: 'bc5', accountId: 'a2', name: 'Tom Becker', title: 'Director of Plant Operations', influence: 'Evaluator', stance: 'Concerned', whatTheyCareAbout: 'Mobile completion tracking that plant managers will actually use.' },
  { id: 'bc6', accountId: 'a3', name: 'Dana Patel', title: 'Chief Learning Officer', influence: 'Champion', stance: 'Supportive', whatTheyCareAbout: 'Shared catalog governance and compliance reporting.' },
  { id: 'bc7', accountId: 'a3', name: 'Marcus Hill', title: 'Finance Director', influence: 'Approver', stance: 'Neutral', whatTheyCareAbout: 'Pricing clarity for member credit unions.' },
  { id: 'bc8', accountId: 'a4', name: 'Luis Gomez', title: 'Program Director', influence: 'Evaluator', stance: 'Supportive', whatTheyCareAbout: 'Fall launch readiness and CE tracking.' },
];

export const meetingHistory: MeetingHistoryItem[] = [
  { id: 'mh1', accountId: 'a1', date: '2026-06-18', type: 'Intro call', attendees: ['Maya Chen', 'Pat'], outcome: 'Confirmed certification prep is spread across webinars, PDFs, and the legacy LMS.', followUp: 'Send examples of learner checkpoints and board-level outcomes.' },
  { id: 'mh2', accountId: 'a1', date: '2026-07-01', type: 'Discovery', attendees: ['Maya Chen', 'Jon Rivera', 'Pat'], outcome: 'Maya needs a credible board story; Jon needs clean reporting and lower admin effort.', followUp: 'Prepare a learner journey map with three readiness checkpoints.' },
  { id: 'mh3', accountId: 'a2', date: '2026-06-12', type: 'Qualification', attendees: ['Rachel Kim', 'Pat'], outcome: 'Audit packet prep is manual and varies by plant.', followUp: 'Send plant-level completion reporting examples.' },
  { id: 'mh4', accountId: 'a3', date: '2026-07-02', type: 'Demo recap', attendees: ['Dana Patel', 'Pat'], outcome: 'Dana liked shared catalog governance but needs finance language.', followUp: 'Prepare pricing and governance options.' },
  { id: 'mh5', accountId: 'a4', date: '2026-06-24', type: 'Inbound follow-up', attendees: ['Luis Gomez', 'Pat'], outcome: 'Fall CE launch is the main forcing event.', followUp: 'Book needs call focused on CE records and launch risk.' },
];

export const discoveryNotes: DiscoveryNote[] = [
  { id: 'dn1', accountId: 'a1', date: '2026-07-01', theme: 'Certification readiness', insight: 'They need to identify candidates falling behind before the exam window, not after results come in.', whyItMatters: 'Early risk visibility is the strongest link between Brightspace and Maya’s board narrative.' },
  { id: 'dn2', accountId: 'a1', date: '2026-07-01', theme: 'Reporting burden', insight: 'Jon exports and cleans multiple reports before board updates.', whyItMatters: 'Reducing report cleanup gives the operations evaluator a concrete reason to support change.' },
  { id: 'dn3', accountId: 'a2', date: '2026-06-12', theme: 'Audit pressure', insight: 'Plant managers need completion proof by site and role before quarterly audits.', whyItMatters: 'Audit readiness can pull operations and member value into the same buying case.' },
  { id: 'dn4', accountId: 'a3', date: '2026-07-02', theme: 'Catalog governance', insight: 'Dana wants role-based pathways and compliance courses managed in one shared catalog.', whyItMatters: 'Governance language helps her sell the idea internally to finance and member stakeholders.' },
  { id: 'dn5', accountId: 'a4', date: '2026-06-24', theme: 'Launch risk', insight: 'The CE program needs to launch this fall without adding support headcount.', whyItMatters: 'A focused launch checklist is more useful than a broad platform pitch.' },
];

export const competitors: Competitor[] = [
  { id: 'co1', accountId: 'a1', name: 'Legacy LMS', status: 'Incumbent', strength: 'Known by staff and already holds historical completion records.', risk: 'The team may avoid change if migration feels too heavy.', talkTrack: 'Start with a phased certification journey instead of a full platform replacement conversation.' },
  { id: 'co2', accountId: 'a2', name: 'Spreadsheets and LMS add-ons', status: 'Incumbent', strength: 'Flexible for one-off reporting requests.', risk: 'Manual work may feel normal unless the audit cost is made visible.', talkTrack: 'Compare one audit packet today with a Brightspace reporting view.' },
  { id: 'co3', accountId: 'a3', name: 'Docebo', status: 'Mentioned', strength: 'Recognized catalog and external audience story.', risk: 'Dana may compare based on catalog features alone.', talkTrack: 'Anchor the discussion on governance, compliance proof, and member reporting.' },
  { id: 'co4', accountId: 'a4', name: 'Moodle partner', status: 'Under review', strength: 'Perceived as lower cost for a quick CE launch.', risk: 'Price could dominate if launch risk is not framed clearly.', talkTrack: 'Keep the conversation on CE records, learner support, and what must be safe by launch.' },
];

export const interactions: Interaction[] = [
  { id: 'i1', accountId: 'a1', date: '2026-06-10', channel: 'Research', summary: 'Board packet referenced certification modernization as a priority.', nextStep: 'Connect modernization language to learner readiness checkpoints.' },
  { id: 'i2', accountId: 'a1', date: '2026-06-18', channel: 'Call', summary: 'Maya described scattered prep materials and weak risk signals.', nextStep: 'Schedule discovery with operations.' },
  { id: 'i3', accountId: 'a1', date: '2026-07-01', channel: 'Meeting', summary: 'Maya and Jon confirmed board story plus reporting effort are the two biggest pressures.', nextStep: 'Send board-ready learner journey map.' },
  { id: 'i4', accountId: 'a2', date: '2026-06-12', channel: 'Call', summary: 'Rachel shared audit reporting pain by plant and member company.', nextStep: 'Ask for current audit packet sample.' },
  { id: 'i5', accountId: 'a2', date: '2026-07-02', channel: 'Email', summary: 'Reporting example follow-up became overdue.', nextStep: 'Send screenshots and request packet sample.' },
  { id: 'i6', accountId: 'a3', date: '2026-07-02', channel: 'Meeting', summary: 'Dana needs finance-friendly language for shared catalog pricing.', nextStep: 'Prepare governance and pricing options.' },
  { id: 'i7', accountId: 'a4', date: '2026-06-24', channel: 'Trigger', summary: 'Luis downloaded the CE launch webinar guide.', nextStep: 'Book needs call around fall launch checklist.' },
];
