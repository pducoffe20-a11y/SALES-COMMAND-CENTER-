import { useState } from 'react';
import { parseProspectCsv, scoreProspects } from '../utils/generators';
import { SectionHeader } from './SectionHeader';

const sampleCsv = `account,contact,title,vertical,employees,signal,notes
State Association of Workforce Boards,Elena Morris,Director of Member Learning,Association,140,New member certification launch,Needs first outreach around reporting and learner progress
Great Lakes Hospital Education Network,Sam Ortiz,VP Clinical Education,Healthcare,220,CE tracking review,Distributed educators need proof of completion
Precision Trades Alliance,Nina Patel,Programs Manager,Trade,52,Annual conference training track,Missing current LMS and budget timing`;

export function ProspectWorkspace() {
  const [csv, setCsv] = useState(sampleCsv);
  const [prospects, setProspects] = useState(() => scoreProspects(parseProspectCsv(sampleCsv)));

  function analyze(text: string) {
    setCsv(text);
    setProspects(scoreProspects(parseProspectCsv(text)));
  }

  function handleFile(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => analyze(String(reader.result || ''));
    reader.readAsText(file);
  }

  return (
    <section className="section" id="prospect-workspace">
      <SectionHeader eyebrow="Sprint 5 · Prospect Workspace" title="CSV prospect workspace" description="Upload or paste prospects, then score accounts, identify ICP fit, group contacts, show missing research, and generate first action boards." />
      <div className="two-column">
        <div className="panel form">
          <label>Upload CSV<input type="file" accept=".csv,text/csv" onChange={handleFile} /></label>
          <label>CSV preview<textarea className="large-textarea" value={csv} onChange={(e: any) => analyze(e.target.value)} /></label>
          <small>Expected headers: account, contact, title, vertical, employees, signal, notes.</small>
        </div>
        <div className="prospect-stack">
          {prospects.map((prospect) => (
            <article className="panel prospect-card" key={`${prospect.account}-${prospect.contact}`}>
              <div className="detail-header"><div><p className="eyebrow">{prospect.icpFit} ICP fit · Score {prospect.score}</p><h3>{prospect.account}</h3><p>{prospect.contact} · {prospect.title || 'Contact role needed'} · {prospect.vertical || 'Vertical needed'}</p></div></div>
              <p><strong>Recommended first outreach:</strong> {prospect.firstOutreach}</p>
              <div className="detail-grid">
                <div><h4>Grouped contacts</h4><p>{prospect.contact || 'Research contact'} in {prospect.vertical || 'unknown'} workflow.</p></div>
                <div><h4>Missing research</h4><ul>{(prospect.missingResearch.length ? prospect.missingResearch : ['No major gaps from CSV']).map((gap) => <li key={gap}>{gap}</li>)}</ul></div>
              </div>
              <h4>Generated action board</h4><ol>{prospect.actionBoard.map((action) => <li key={action}>{action}</li>)}</ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
