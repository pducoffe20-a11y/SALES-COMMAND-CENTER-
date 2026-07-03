import { salesDataService } from '../services/salesDataService';
import type { Account, EmailDraft, Meeting, Task, Trigger } from '../types/sales';
import { CommandCard } from './CommandCard';
import { SectionHeader } from './SectionHeader';

type ActionItem = Meeting | Task | Trigger | EmailDraft;

function accountName(id: string) {
  return salesDataService.getAccountById(id)?.name ?? 'Unknown account';
}

function contactName(id: string) {
  const contact = salesDataService.getContactById(id);
  return contact ? `${contact.name}, ${contact.title}` : 'Unknown contact';
}

function priorityScore(item: ActionItem) {
  const account = salesDataService.getAccountById(item.accountId);
  const base = account ? account.fitScore + account.timingScore : 100;
  const overdueBoost = 'status' in item && item.status === 'Overdue' ? 60 : 0;
  const meetingBoost = 'time' in item ? 35 : 0;
  const triggerBoost = 'signal' in item ? 25 : 0;
  return base + overdueBoost + meetingBoost + triggerBoost;
}

function accountMomentum(account: Account) {
  const triggerCount = salesDataService.getTriggers().filter((trigger) => trigger.accountId === account.id).length;
  const recentTouch = account.lastTouch >= '2026-07-01' ? 1 : 0;
  return account.fitScore + account.timingScore + triggerCount * 20 + recentTouch * 15;
}

function accountRisk(account: Account) {
  const overdueCount = salesDataService
    .getTasksForAccount(account.id)
    .filter((task) => task.status === 'Overdue').length;
  const staleTouch = account.lastTouch < '2026-06-28' ? 1 : 0;
  return overdueCount * 45 + staleTouch * 25 + (100 - account.timingScore) + (account.relationshipStatus === 'At Risk' ? 50 : 0);
}


const todaysFocus = [
  {
    account: 'ABC Association',
    status: 'Meeting at 2:00 PM',
    why: ['Recently hired Director of Learning.', 'Currently using legacy LMS.'],
    nextMove: ['Review briefing.', 'Prepare credentialing questions.'],
    tone: 'hot',
  },
  {
    account: 'Manufacturing Council',
    status: 'Last touched 18 days ago.',
    why: ['Momentum slowing.'],
    suggestedEmail: 'Rachel — I owe you the audit reporting example. I can send a simple view by site and role today, then compare it with the packet your plant managers use now if that would help.',
    tone: 'risk',
  },
  {
    account: 'Healthcare Society',
    status: 'Proposal due Friday.',
    why: ['Fall CE launch is close, and the proposal still needs proof points tied to tracking and learner support.'],
    outstandingItems: ['Confirm CE reporting requirements.', 'Add launch timeline.', 'Include support plan for distributed educators.'],
    tone: 'due',
  },
];

interface TodayCommandCenterProps {
  onOpenAccount: (accountId: string) => void;
}

export function TodayCommandCenter({ onOpenAccount }: TodayCommandCenterProps) {
  const accounts = salesDataService.getAccounts();
  const meetings = salesDataService.getMeetings();
  const tasks = salesDataService.getTasks();
  const triggers = salesDataService.getTriggers();
  const emailDrafts = salesDataService.getEmailDrafts();
  const overdueTasks = tasks.filter((task) => task.status === 'Overdue');
  const priorityQueue = [...meetings, ...overdueTasks, ...triggers, ...emailDrafts]
    .sort((first, second) => priorityScore(second) - priorityScore(first))
    .slice(0, 4);
  const momentumAccounts = [...accounts].sort((first, second) => accountMomentum(second) - accountMomentum(first)).slice(0, 3);
  const riskAccounts = [...accounts].sort((first, second) => accountRisk(second) - accountRisk(first)).slice(0, 3);

  return (
    <section className="section" id="today">
      <SectionHeader
        eyebrow="Today Command Center"
        title="Start here"
        description="The dashboard now leads with the moves Pat should make first, then separates prep, follow-up, momentum, and risk."
      />

      <div className="morning-focus" aria-label="Today's Focus">
        <div className="morning-focus-header">
          <div>
            <p className="eyebrow">Good Morning, Pat.</p>
            <h3>Today's Focus</h3>
          </div>
          <span>Priority Accounts</span>
        </div>
        <div className="focus-card-grid">
          {todaysFocus.map((item) => (
            <article className={`focus-card ${item.tone}`} key={item.account}>
              <div className="focus-topline">
                <span aria-hidden="true">🔥</span>
                <div>
                  <strong>{item.account}</strong>
                  <p>{item.status}</p>
                </div>
              </div>
              <div className="focus-block"><b>Why:</b><ul>{item.why.map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
              {item.nextMove ? <div className="focus-block"><b>Next Move:</b><ul>{item.nextMove.map((move) => <li key={move}>{move}</li>)}</ul></div> : null}
              {item.suggestedEmail ? <div className="focus-block"><b>Suggested Email:</b><p>{item.suggestedEmail}</p></div> : null}
              {item.outstandingItems ? <div className="focus-block"><b>Outstanding items:</b><ul>{item.outstandingItems.map((outstanding) => <li key={outstanding}>{outstanding}</li>)}</ul></div> : null}
            </article>
          ))}
        </div>
      </div>

      <div className="answer-grid" aria-label="Five second dashboard answers">
        <button type="button" onClick={() => onOpenAccount(priorityQueue[0].accountId)} className="answer-card critical">
          <span>Work on first</span>
          <strong>{accountName(priorityQueue[0].accountId)}</strong>
          <small>{priorityQueue[0].recommendedNextAction}</small>
        </button>
        <a href="#meeting-prep-list" className="answer-card">
          <span>Meetings need prep</span>
          <strong>{meetings.length}</strong>
          <small>Prep the call, confirm the buyer pressure, and ask for a practical next step.</small>
        </a>
        <a href="#overdue-followups" className="answer-card high">
          <span>Overdue follow-ups</span>
          <strong>{overdueTasks.length}</strong>
          <small>Clear these before adding new work.</small>
        </a>
        <a href="#momentum-risk" className="answer-card">
          <span>Momentum / risk</span>
          <strong>{momentumAccounts.length} / {riskAccounts.length}</strong>
          <small>Push the warmest deals and rescue accounts that may drift.</small>
        </a>
      </div>

      <div className="command-layout">
        <div className="priority-panel" id="priority">
          <div className="list-heading">
            <p className="eyebrow">Priority queue</p>
            <h3>What Pat should work on first</h3>
          </div>
          {priorityQueue.map((item, index) => (
            <div className="priority-row" key={item.id}>
              <span className="rank">{index + 1}</span>
              <div>
                <strong>{accountName(item.accountId)}</strong>
                <p>{item.recommendedNextAction}</p>
                <small>Why this matters: {item.whyItMatters}</small>
              </div>
              <a href={`mailto:?subject=${encodeURIComponent(accountName(item.accountId))} next step&body=${encodeURIComponent(item.softCta)}`}>Act</a>
            </div>
          ))}
        </div>

        <div className="side-panel" id="momentum-risk">
          <div>
            <p className="eyebrow">Momentum accounts</p>
            {momentumAccounts.map((account) => (
              <button className="pulse-row" type="button" onClick={() => onOpenAccount(account.id)} key={account.id}>
                <span><strong>{account.name}</strong><small>{account.vertical} · {account.relationshipStatus}</small></span>
                <b>{accountMomentum(account)}</b>
              </button>
            ))}
          </div>
          <div>
            <p className="eyebrow">At-risk accounts</p>
            {riskAccounts.map((account) => (
              <button className="pulse-row risk" type="button" onClick={() => onOpenAccount(account.id)} key={account.id}>
                <span><strong>{account.name}</strong><small>{account.nextTouchDue} · {account.knownPain}</small></span>
                <b>{accountRisk(account)}</b>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="workstream-grid">
        <div id="meeting-prep-list">
          <div className="list-heading">
            <p className="eyebrow">Meetings that need prep</p>
            <h3>Prepare before the call</h3>
          </div>
          <div className="card-stack">
            {meetings.map((item) => (
              <CommandCard
                key={item.id}
                label="Meeting prep"
                account={accountName(item.accountId)}
                contact={contactName(item.contactId)}
                context={item.context}
                whyItMatters={item.whyItMatters}
                recommendedNextAction={item.recommendedNextAction}
                softCta={item.softCta}
                meta={`${item.time} · ${item.meetingType}`}
                urgency="high"
              />
            ))}
          </div>
        </div>

        <div id="overdue-followups">
          <div className="list-heading">
            <p className="eyebrow">Overdue follow-ups</p>
            <h3>Clear the promises</h3>
          </div>
          <div className="card-stack">
            {overdueTasks.map((item) => (
              <CommandCard
                key={item.id}
                label="Overdue follow-up"
                account={accountName(item.accountId)}
                contact={contactName(item.contactId)}
                context={item.context}
                whyItMatters={item.whyItMatters}
                recommendedNextAction={item.recommendedNextAction}
                softCta={item.softCta}
                meta={item.dueDate}
                urgency="critical"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="list-heading">
            <p className="eyebrow">Hot triggers and drafts</p>
            <h3>Use the signal</h3>
          </div>
          <div className="card-stack">
            {[...triggers, ...emailDrafts].map((item) => (
              <CommandCard
                key={item.id}
                label={'signal' in item ? 'Hot trigger' : 'Draft to review'}
                account={accountName(item.accountId)}
                contact={contactName(item.contactId)}
                context={'signal' in item ? `${item.signal}. ${item.context}` : item.context}
                whyItMatters={item.whyItMatters}
                recommendedNextAction={item.recommendedNextAction}
                softCta={item.softCta}
                meta={'subject' in item ? item.subject : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
