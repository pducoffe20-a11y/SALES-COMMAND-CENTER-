export type Vertical =
  | 'Association'
  | 'Credentialing'
  | 'Member Training'
  | 'Workforce'
  | 'Healthcare'
  | 'Banking'
  | 'Manufacturing'
  | 'Trade'
  | 'Professional Development';

export type RelationshipStatus = 'New' | 'Warming' | 'Engaged' | 'Champion' | 'At Risk';

export interface Contact {
  id: string;
  accountId: string;
  name: string;
  title: string;
  role: string;
  angle: string;
  lastInteraction: string;
}

export interface Account {
  id: string;
  name: string;
  vertical: Vertical;
  fitScore: number;
  timingScore: number;
  relationshipStatus: RelationshipStatus;
  knownPain: string;
  nextBestMove: string;
  lastTouch: string;
  nextTouchDue: string;
  researchGaps: string[];
}

export interface Meeting {
  id: string;
  accountId: string;
  contactId: string;
  time: string;
  meetingType: string;
  context: string;
  whyItMatters: string;
  recommendedNextAction: string;
  softCta: string;
}

export interface Task {
  id: string;
  accountId: string;
  contactId: string;
  title: string;
  dueDate: string;
  status: 'Overdue' | 'Due Today' | 'Upcoming';
  context: string;
  whyItMatters: string;
  recommendedNextAction: string;
  softCta: string;
}

export interface Brief {
  id: string;
  accountId: string;
  summary: string;
  valueAngles: string[];
  discoveryQuestions: string[];
  likelyObjections: string[];
}

export interface EmailDraft {
  id: string;
  accountId: string;
  contactId: string;
  subject: string;
  context: string;
  whyItMatters: string;
  recommendedNextAction: string;
  softCta: string;
  body: string;
}

export interface Trigger {
  id: string;
  accountId: string;
  contactId: string;
  signal: string;
  context: string;
  whyItMatters: string;
  recommendedNextAction: string;
  softCta: string;
}

export interface OpportunityNote {
  id: string;
  accountId: string;
  date: string;
  note: string;
  nextAction: string;
  whyItMatters: string;
}


export interface BuyingCommitteeMember {
  id: string;
  accountId: string;
  name: string;
  title: string;
  influence: 'Decision maker' | 'Champion' | 'Evaluator' | 'Blocker' | 'Approver';
  stance: 'Supportive' | 'Neutral' | 'Concerned' | 'Unknown';
  whatTheyCareAbout: string;
}

export interface MeetingHistoryItem {
  id: string;
  accountId: string;
  date: string;
  type: string;
  attendees: string[];
  outcome: string;
  followUp: string;
}

export interface DiscoveryNote {
  id: string;
  accountId: string;
  date: string;
  theme: string;
  insight: string;
  whyItMatters: string;
}

export interface Competitor {
  id: string;
  accountId: string;
  name: string;
  status: 'Incumbent' | 'Under review' | 'Mentioned' | 'Unknown';
  strength: string;
  risk: string;
  talkTrack: string;
}

export interface Interaction {
  id: string;
  accountId: string;
  date: string;
  channel: 'Email' | 'Call' | 'Meeting' | 'Research' | 'Trigger';
  summary: string;
  nextStep: string;
}
