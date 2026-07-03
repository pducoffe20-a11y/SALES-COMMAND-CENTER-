import { useState } from 'react';
import { salesDataService } from '../services/salesDataService';
import { SectionHeader } from './SectionHeader';

interface AccountActionBoardProps {
  onOpenAccount: (accountId: string) => void;
}

export function AccountActionBoard({ onOpenAccount }: AccountActionBoardProps) {
  const accounts = salesDataService.getAccounts();
  const [selectedId, setSelectedId] = useState(accounts[0].id);
  const selected = salesDataService.getAccountById(selectedId) ?? accounts[0];
  const relatedContacts = salesDataService.getContactsForAccount(selected.id);
  const relatedTasks = salesDataService.getTasksForAccount(selected.id);
  const notes = salesDataService.getNotesForAccount(selected.id);

  return (
    <section className="section" id="accounts">
      <SectionHeader
        eyebrow="Account Action Board"
        title="Focus the right accounts"
        description="Scan for fit, timing, relationship strength, and the next move. Click an account to turn research into action."
      />

      <div className="account-layout">
        <div className="account-list" aria-label="Accounts">
          {accounts.map((account) => (
            <button
              className={account.id === selectedId ? 'account-row active' : 'account-row'}
              key={account.id}
              onClick={() => setSelectedId(account.id)}
              type="button"
            >
              <span>
                <strong>{account.name}</strong>
                <small>{account.vertical} · {account.relationshipStatus}</small>
              </span>
              <span className="account-score"><b>{account.fitScore}</b><small>fit</small></span>
              <span className="account-score"><b>{account.timingScore}</b><small>timing</small></span>
            </button>
          ))}
        </div>

        <aside className="panel account-detail">
          <div className="detail-header">
            <div>
              <p className="eyebrow">Selected account</p>
              <h3>{selected.name}</h3>
            </div>
            <button className="card-action" type="button" onClick={() => onOpenAccount(selected.id)}>Open workspace</button>
          </div>

          <div className="score-grid">
            <span>Fit {selected.fitScore}</span>
            <span>Timing {selected.timingScore}</span>
            <span>{selected.relationshipStatus}</span>
          </div>

          <div className="decision-card">
            <p><strong>Known pain:</strong> {selected.knownPain}</p>
            <p><strong>Do next:</strong> {selected.nextBestMove}</p>
            <p><strong>Why this matters:</strong> This account has a fit/timing signal and a pain that maps to Brightspace learning operations, reporting, and learner support.</p>
          </div>

          <p><strong>Last touch:</strong> {selected.lastTouch} · <strong>Next touch due:</strong> {selected.nextTouchDue}</p>

          <div className="detail-grid">
            <div>
              <h4>Research gaps</h4>
              <ul>{selected.researchGaps.map((gap) => <li key={gap}>{gap}</li>)}</ul>
            </div>
            <div>
              <h4>Contacts</h4>
              {relatedContacts.map((contact) => (
                <p key={contact.id}><strong>{contact.name}</strong>, {contact.title}. {contact.angle}</p>
              ))}
            </div>
          </div>

          <h4>Tasks</h4>
          {relatedTasks.length > 0 ? relatedTasks.map((task) => (
            <p key={task.id}>{task.title}. <strong>Why this matters:</strong> {task.whyItMatters}</p>
          )) : <p>No open tasks in mock data. Recommended action: confirm whether the next touch date still holds. <strong>Why this matters:</strong> Clean timing keeps the account from drifting.</p>}

          <h4>Notes and recommended actions</h4>
          {notes.length > 0 ? notes.map((note) => (
            <p key={note.id}>{note.note} <strong>Next:</strong> {note.nextAction} <strong>Why this matters:</strong> {note.whyItMatters}</p>
          )) : <p>Recommended action: add a note after the next conversation. <strong>Why this matters:</strong> Future follow-up should be tied to the buyer's words, not a generic sequence.</p>}
        </aside>
      </div>
    </section>
  );
}
