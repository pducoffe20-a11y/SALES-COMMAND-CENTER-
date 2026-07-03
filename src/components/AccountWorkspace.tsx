import { salesDataService } from '../services/salesDataService';
import { WorkspaceSection } from './WorkspaceSection';

interface AccountWorkspaceProps {
  accountId: string;
  onBack: () => void;
}

export function AccountWorkspace({ accountId, onBack }: AccountWorkspaceProps) {
  const account = salesDataService.getAccountById(accountId) ?? salesDataService.getAccounts()[0];
  const contacts = salesDataService.getContactsForAccount(account.id);
  const buyingCommittee = salesDataService.getBuyingCommitteeForAccount(account.id);
  const openTasks = salesDataService.getTasksForAccount(account.id);
  const meetingHistory = salesDataService.getMeetingHistoryForAccount(account.id);
  const discoveryNotes = salesDataService.getDiscoveryNotesForAccount(account.id);
  const competitors = salesDataService.getCompetitorsForAccount(account.id);
  const notes = salesDataService.getNotesForAccount(account.id);
  const timeline = salesDataService.getInteractionsForAccount(account.id);
  const primaryWhy = notes[0]?.whyItMatters ?? 'This account has a timely business pain that maps to Brightspace learning operations and reporting.';

  return (
    <main className="workspace-page" id="account-workspace">
      <button className="back-button" type="button" onClick={onBack}>← Back to dashboard</button>

      <header className="workspace-hero">
        <div>
          <p className="eyebrow">Account Workspace</p>
          <h1>{account.name}</h1>
          <p>{account.vertical} · {account.relationshipStatus} · Next touch due {account.nextTouchDue}</p>
        </div>
        <a className="card-action" href={`mailto:?subject=${encodeURIComponent(account.name)} next action&body=${encodeURIComponent(account.nextBestMove)}`}>
          Draft next action
        </a>
      </header>

      <div className="workspace-grid">
        <WorkspaceSection title="Account Snapshot" eyebrow="Where the deal stands">
          <div className="snapshot-grid">
            <span><strong>{account.fitScore}</strong><small>Fit score</small></span>
            <span><strong>{account.timingScore}</strong><small>Timing score</small></span>
            <span><strong>{account.relationshipStatus}</strong><small>Relationship</small></span>
          </div>
          <p><strong>Known pain:</strong> {account.knownPain}</p>
          <p><strong>Research gaps:</strong> {account.researchGaps.join(', ')}</p>
        </WorkspaceSection>

        <WorkspaceSection title="Recommended Next Action" eyebrow="Do this next">
          <div className="decision-card">
            <p><strong>Recommended next action:</strong> {account.nextBestMove}</p>
            <p><strong>Why this matters:</strong> {primaryWhy}</p>
          </div>
        </WorkspaceSection>

        <WorkspaceSection title="Contacts" eyebrow="People Pat knows">
          <div className="mini-card-grid">
            {contacts.map((contact) => (
              <article className="mini-card" key={contact.id}>
                <strong>{contact.name}</strong>
                <small>{contact.title} · {contact.role}</small>
                <p>{contact.angle}</p>
                <small>Last: {contact.lastInteraction}</small>
              </article>
            ))}
          </div>
        </WorkspaceSection>

        <WorkspaceSection title="Buying Committee" eyebrow="Influence map">
          <div className="mini-card-grid">
            {buyingCommittee.map((member) => (
              <article className="mini-card" key={member.id}>
                <strong>{member.name}</strong>
                <small>{member.influence} · {member.stance}</small>
                <p>{member.title}</p>
                <p><strong>Cares about:</strong> {member.whatTheyCareAbout}</p>
              </article>
            ))}
          </div>
        </WorkspaceSection>

        <WorkspaceSection title="Open Tasks" eyebrow="Promises to clear">
          {openTasks.length > 0 ? openTasks.map((task) => (
            <div className="workspace-row" key={task.id}>
              <span className={task.status === 'Overdue' ? 'status overdue' : 'status'}>{task.status}</span>
              <div>
                <strong>{task.title}</strong>
                <p>{task.recommendedNextAction}</p>
                <small>Due {task.dueDate}. Why this matters: {task.whyItMatters}</small>
              </div>
            </div>
          )) : <p>No open tasks. Add one after the next buyer conversation.</p>}
        </WorkspaceSection>

        <WorkspaceSection title="Meeting History" eyebrow="Conversation record">
          {meetingHistory.map((meeting) => (
            <div className="workspace-row" key={meeting.id}>
              <span className="date-chip">{meeting.date}</span>
              <div>
                <strong>{meeting.type}</strong>
                <p>{meeting.outcome}</p>
                <small>Attendees: {meeting.attendees.join(', ')} · Follow-up: {meeting.followUp}</small>
              </div>
            </div>
          ))}
        </WorkspaceSection>

        <WorkspaceSection title="Discovery Notes" eyebrow="What Pat has learned">
          {discoveryNotes.map((note) => (
            <div className="workspace-row" key={note.id}>
              <span className="date-chip">{note.date}</span>
              <div>
                <strong>{note.theme}</strong>
                <p>{note.insight}</p>
                <small>Why this matters: {note.whyItMatters}</small>
              </div>
            </div>
          ))}
        </WorkspaceSection>

        <WorkspaceSection title="Competitors" eyebrow="How to position">
          {competitors.map((competitor) => (
            <div className="workspace-row" key={competitor.id}>
              <span className="status">{competitor.status}</span>
              <div>
                <strong>{competitor.name}</strong>
                <p><strong>Strength:</strong> {competitor.strength}</p>
                <p><strong>Risk:</strong> {competitor.risk}</p>
                <small>Talk track: {competitor.talkTrack}</small>
              </div>
            </div>
          ))}
        </WorkspaceSection>

        <WorkspaceSection title="Timeline of Interactions" eyebrow="Account story">
          <div className="timeline">
            {timeline.map((interaction) => (
              <div className="timeline-item" key={interaction.id}>
                <span>{interaction.date}</span>
                <div>
                  <strong>{interaction.channel}</strong>
                  <p>{interaction.summary}</p>
                  <small>Next: {interaction.nextStep}</small>
                </div>
              </div>
            ))}
          </div>
        </WorkspaceSection>
      </div>
    </main>
  );
}
