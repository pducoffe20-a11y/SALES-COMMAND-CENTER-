import { useState } from 'react';
import { AccountActionBoard } from './components/AccountActionBoard';
import { AccountWorkspace } from './components/AccountWorkspace';
import { FollowUpBuilder } from './components/FollowUpBuilder';
import { MeetingPrepGenerator } from './components/MeetingPrepGenerator';
import { PreCallBriefGenerator } from './components/PreCallBriefGenerator';
import { EmailReviewTool } from './components/EmailReviewTool';
import { ProspectWorkspace } from './components/ProspectWorkspace';
import { TodayCommandCenter } from './components/TodayCommandCenter';

export default function App() {
  const [workspaceAccountId, setWorkspaceAccountId] = useState<string | null>(null);

  if (workspaceAccountId) {
    return <AccountWorkspace accountId={workspaceAccountId} onBack={() => setWorkspaceAccountId(null)} />;
  }

  return (
    <>
      <header className="hero">
        <nav>
          <strong>Sales Command Center</strong>
          <span>Milestone 1 · Action cockpit</span>
        </nav>
        <div className="hero-content">
          <p className="eyebrow">D2L Brightspace cockpit for Pat</p>
          <h1>Decide the next best sales move in five seconds.</h1>
          <p>A calm daily workspace that makes the first action obvious, separates prep from follow-up, and shows where account momentum or risk is building.</p>
        </div>
        <div className="hero-links">
          <a href="#today">Start here</a>
          <a href="#meeting-prep-list">Meetings</a>
          <a href="#overdue-followups">Follow-ups</a>
          <a href="#momentum-risk">Momentum / risk</a>
          <a href="#prep">Generate prep</a>
          <a href="#accounts">Accounts</a>
          <a href="#pre-call-brief">Pre-call brief</a>
          <a href="#pat-voice-review">Pat voice</a>
          <a href="#prospect-workspace">Prospects</a>
        </div>
      </header>
      <main>
        <TodayCommandCenter onOpenAccount={setWorkspaceAccountId} />
        <MeetingPrepGenerator />
        <PreCallBriefGenerator />
        <EmailReviewTool />
        <ProspectWorkspace />
        <AccountActionBoard onOpenAccount={setWorkspaceAccountId} />
        <FollowUpBuilder />
      </main>
      <footer>Future integrations: Outlook calendar/email, Salesforce CRM, Slack alerts, SharePoint research files, and Zoom transcripts plug in at the data service layer. No live integrations are connected in Milestone 1.</footer>
    </>
  );
}
