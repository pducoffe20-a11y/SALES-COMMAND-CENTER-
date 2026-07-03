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
          <span>SaaS BI revenue cockpit</span>
        </nav>
        <div className="hero-shell">
          <div>
            <div className="hero-content">
              <p className="eyebrow">D2L Brightspace cockpit for Pat</p>
              <h1>Spot the <span className="metric-glow">next best move</span> before the day gets noisy.</h1>
              <p>A sharper business-intelligence workspace for deal momentum, meeting prep, overdue promises, risk, and account signals — built so the first action is obvious fast.</p>
            </div>
            <div className="hero-links" aria-label="Command center shortcuts">
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
          </div>

          <aside className="hero-intelligence" aria-label="Revenue intelligence snapshot">
            <div className="bi-orbit-card">
              <div className="bi-card-label">
                <span>Pipeline signal</span>
                <strong>Live view</strong>
              </div>
              <div className="bi-score">
                <strong>87</strong>
                <span>Momentum index</span>
                <p>Meetings, overdue promises, account timing, and hot signals roll up into one daily read.</p>
              </div>
              <div className="bi-bars" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
            </div>

            <div className="bi-feed-card">
              <div className="bi-card-label">
                <span>Today feed</span>
                <strong>3 signals</strong>
              </div>
              <ol>
                <li><span className="bi-dot"></span><b>Prep call</b><span className="bi-chip">2:00 PM</span></li>
                <li><span className="bi-dot"></span><b>Clear overdue follow-up</b><span className="bi-chip">Risk</span></li>
                <li><span className="bi-dot"></span><b>Use trigger while it is warm</b><span className="bi-chip">Now</span></li>
              </ol>
            </div>
          </aside>
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
