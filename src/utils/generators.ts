const bannedPattern = /\b(leverage|robust|seamless|best-in-class|holistic|scalable solutions|hope this finds you well|just following up)\b/gi;

export function cleanCopy(text: string) {
  return text.replace(bannedPattern, '').replace(/\s{2,}/g, ' ').trim();
}

export interface PrepInput {
  accountName: string;
  contactName: string;
  title: string;
  vertical: string;
  meetingType: string;
  notes: string;
  competitor: string;
}

export function buildMeetingPrep(input: PrepInput) {
  const competitorLine = input.competitor
    ? `They may compare this with ${input.competitor}, so keep the talk grounded in their day-to-day work.`
    : 'No known competitor yet, so use discovery to learn what they like and dislike about the current setup.';

  return {
    accountSnapshot: cleanCopy(`${input.accountName || 'This account'} is a ${input.vertical || 'target'} account. The notes point to this near-term issue: ${input.notes || 'They need a clearer way to run learning programs and report progress.'} ${competitorLine}`),
    contactAngle: cleanCopy(`${input.contactName || 'This contact'} is the ${input.title || 'primary contact'}. Treat the conversation as a practical ${input.meetingType || 'working session'} and make it easy for them to explain internal pressure.`),
    valueAngles: [
      { recommendation: 'Show learner progress early enough to act before deadlines are missed.', whyItMatters: 'Pat can connect Brightspace to risk reduction without overpromising outcomes.' },
      { recommendation: 'Give program owners cleaner reporting for boards, members, managers, or auditors.', whyItMatters: 'Reporting pain often brings economic buyers and operators into the same conversation.' },
      { recommendation: 'Reduce manual work around enrollments, reminders, completion proof, and renewal cycles.', whyItMatters: 'Less manual work is a concrete reason to consider change even when budgets are tight.' },
    ],
    discoveryQuestions: [
      'What has to be easier for your team in the next 90 days?',
      'Where do learners or members get stuck today?',
      'Which report do you wish you trusted without extra cleanup?',
      'Who else will care about this decision, and what will they need to see?',
      'What would make a change feel worth the effort?',
    ],
    likelyObjections: [
      { objection: 'Budget timing may be unclear.', response: 'Ask what event or deadline would make this worth prioritizing.' },
      { objection: 'Content migration may feel like extra work.', response: 'Offer to scope the highest-value content first instead of discussing a full move too early.' },
      { objection: 'They may worry that adoption will fall on a small team.', response: 'Ask which admin tasks are already stretched and map the demo around those tasks.' },
    ],
    opener: cleanCopy(`${input.contactName || 'Thanks for making time'} — I saw your note about ${input.notes || 'improving the learning experience'}. I thought we could keep this focused on what needs to work soon, what is painful today, and whether Brightspace is worth a deeper look.`),
    softNextStepAsk: 'If this feels useful, would it make sense to schedule a 30-minute working session with the person who owns reporting or learner operations?',
    softNextStepWhy: 'That keeps the next step practical and brings in the person who can confirm day-to-day fit.',
    followUpEmailDraft: cleanCopy(`${input.contactName || 'Hi'} — thanks for the conversation. My main takeaway is that ${input.accountName || 'your team'} needs a clearer path for learners and cleaner proof of progress. A useful next step could be a short working session around your current process, the reports you need, and what would have to change. No pressure if timing is not right; I can also send a simple checklist for you to review first.`),
  };
}

export interface FollowUpInput {
  meetingNotes: string;
  contactRole: string;
  caredAbout: string;
  agreedNextStep: string;
  blockers: string;
}

export function buildFollowUp(input: FollowUpInput) {
  const date = new Date();
  date.setDate(date.getDate() + 3);

  return {
    email: cleanCopy(`Thanks for the time today. I heard that your ${input.contactRole || 'team'} is most focused on ${input.caredAbout || 'making learning easier to manage and report on'}. Based on the conversation, the next useful step is ${input.agreedNextStep || 'a short working session with the right stakeholders'}. I also noted this concern: ${input.blockers || 'timing and internal effort need to stay realistic'}. I can keep the next step focused and practical.`),
    emailWhy: 'This recap reflects the buyer’s words, names the next step, and avoids pressure.',
    crmNote: cleanCopy(`Meeting notes: ${input.meetingNotes || 'Discussed learning program needs, reporting, and next steps.'} Contact role: ${input.contactRole || 'Unknown'}. Cared about: ${input.caredAbout || 'clearer learning operations'}. Blockers: ${input.blockers || 'not confirmed'}.`),
    nextTask: cleanCopy(`Prepare for ${input.agreedNextStep || 'the next working session'} with examples tied to ${input.caredAbout || 'their stated priorities'}.`),
    nextTaskWhy: 'The next task gives Pat a specific prep path instead of a generic reminder.',
    suggestedFollowUpDate: date.toISOString().slice(0, 10),
  };
}

export interface EmailReviewResult {
  corporatePhrases: string[];
  salesyPhrases: string[];
  missedPersonalization: string[];
  betterOpener: string;
  betterCta: string;
  rewrite: string;
}

function findMatches(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.filter((term) => lower.includes(term.toLowerCase()));
}

export function reviewEmailInPatVoice(email: string): EmailReviewResult {
  const corporateTerms = ['leverage', 'robust', 'seamless', 'best-in-class', 'holistic', 'scalable solutions'];
  const salesyTerms = ['just following up', 'hope this finds you well', 'circle back', 'touch base', 'checking in', 'exciting opportunity'];
  const corporatePhrases = findMatches(email, corporateTerms);
  const salesyPhrases = findMatches(email, salesyTerms);
  const missedPersonalization = [
    email.match(/\b(board|audit|certification|CE|member|learner|reporting|launch|compliance)\b/i) ? '' : 'Add one detail about their program, deadline, or role.',
    email.match(/\bnext step|working session|review|send|share\b/i) ? '' : 'Name the specific next step you want to make easy.',
    email.length > 420 ? 'Shorten the note so the ask is visible without scrolling.' : '',
  ].filter(Boolean) as string[];

  const betterOpener = 'Thanks for the context. The part that stood out to me is the pressure to make learning easier to run and easier to prove.';
  const betterCta = 'Would it be useful to spend 25 minutes mapping the current process and the one report your team needs to trust?';
  const rewrite = cleanCopy(`${betterOpener}\n\nI would keep the next conversation focused on what has to work soon, where the team is spending extra time, and whether Brightspace is worth a closer look for that specific workflow.\n\n${betterCta}\n\nNo pressure if timing is not right. I can also send a short checklist first.`);

  return {
    corporatePhrases: corporatePhrases.length ? corporatePhrases : ['None found'],
    salesyPhrases: salesyPhrases.length ? salesyPhrases : ['None found'],
    missedPersonalization: missedPersonalization.length ? missedPersonalization : ['Good start: the note includes a concrete buyer context.'],
    betterOpener,
    betterCta,
    rewrite,
  };
}

export interface ProspectRow {
  account: string;
  contact: string;
  title: string;
  vertical: string;
  employees: number;
  signal: string;
  notes: string;
}

export interface ScoredProspect extends ProspectRow {
  score: number;
  icpFit: 'Strong' | 'Medium' | 'Weak';
  firstOutreach: string;
  missingResearch: string[];
  actionBoard: string[];
}

export function parseProspectCsv(csv: string): ProspectRow[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const get = (name: string) => values[headers.indexOf(name)] || '';
    return {
      account: get('account') || get('company'),
      contact: get('contact') || get('name'),
      title: get('title'),
      vertical: get('vertical'),
      employees: Number(get('employees') || 0),
      signal: get('signal'),
      notes: get('notes'),
    };
  });
}

export function scoreProspects(rows: ProspectRow[]): ScoredProspect[] {
  return rows.map((row) => {
    const verticalBoost = /association|credential|health|bank|manufacturing|trade|workforce|professional/i.test(row.vertical) ? 30 : 10;
    const signalBoost = /launch|audit|compliance|certification|member|reporting|training/i.test(`${row.signal} ${row.notes}`) ? 30 : 12;
    const sizeBoost = row.employees > 75 ? 20 : 10;
    const contactBoost = /learning|program|training|education|operations|member|compliance/i.test(`${row.title}`) ? 20 : 8;
    const score = Math.min(100, verticalBoost + signalBoost + sizeBoost + contactBoost);
    const missingResearch = [
      row.signal ? '' : 'Trigger or business event',
      row.title ? '' : 'Contact title',
      row.notes ? '' : 'Current learning pain',
      row.employees ? '' : 'Organization size',
    ].filter(Boolean) as string[];
    return {
      ...row,
      score,
      icpFit: (score >= 80 ? 'Strong' : score >= 60 ? 'Medium' : 'Weak') as ScoredProspect['icpFit'],
      firstOutreach: cleanCopy(`${row.contact || 'Hi'} — I noticed ${row.signal || 'your team may be reviewing learning programs'}. If ${row.account || 'your team'} is trying to make training easier to run and report on, would it be useful to compare notes on what has to work first?`),
      missingResearch,
      actionBoard: ['Confirm the business event', 'Find the learning or program owner', 'Draft a first note tied to the signal', 'Log the account for next-touch review'],
    };
  }).sort((a, b) => b.score - a.score);
}
