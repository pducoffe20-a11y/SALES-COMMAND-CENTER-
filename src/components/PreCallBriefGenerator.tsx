import { useState } from 'react';
import type { FormEvent } from 'react';
import { accounts, contacts } from '../data/mockSalesData';
import { buildMeetingPrep, type PrepInput } from '../utils/generators';
import { SectionHeader } from './SectionHeader';

const defaultAccount = accounts[0];
const defaultContact = contacts.find((contact) => contact.accountId === defaultAccount.id) || contacts[0];
const initial: PrepInput = {
  accountName: defaultAccount.name,
  contactName: defaultContact.name,
  title: defaultContact.title,
  vertical: defaultAccount.vertical,
  meetingType: 'Discovery follow-up',
  notes: defaultAccount.knownPain,
  competitor: 'Legacy LMS',
};

export function PreCallBriefGenerator() {
  const [form, setForm] = useState(initial);
  const [brief, setBrief] = useState(() => buildMeetingPrep(initial));

  function submit(event: FormEvent) {
    event.preventDefault();
    setBrief(buildMeetingPrep(form));
  }

  return (
    <section className="section brief-builder" id="pre-call-brief">
      <SectionHeader eyebrow="Sprint 3 · AI Brief Generator" title="Pre-call brief generator" description="Create a polished, printable call plan with the account story, buyer angle, questions, objections, and follow-up draft in one place." />
      <div className="two-column">
        <form className="panel form" onSubmit={submit}>
          <label>Account name<input value={form.accountName} onChange={(e: any) => setForm({ ...form, accountName: e.target.value })} /></label>
          <label>Contact name<input value={form.contactName} onChange={(e: any) => setForm({ ...form, contactName: e.target.value })} /></label>
          <label>Title<input value={form.title} onChange={(e: any) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Vertical<input value={form.vertical} onChange={(e: any) => setForm({ ...form, vertical: e.target.value })} /></label>
          <label>Meeting type<input value={form.meetingType} onChange={(e: any) => setForm({ ...form, meetingType: e.target.value })} /></label>
          <label>Competitor<input value={form.competitor} onChange={(e: any) => setForm({ ...form, competitor: e.target.value })} /></label>
          <label>Notes<textarea value={form.notes} onChange={(e: any) => setForm({ ...form, notes: e.target.value })} /></label>
          <button>Generate printable brief</button>
        </form>

        <article className="printable-brief" aria-label="Printable pre-call brief">
          <div className="brief-cover">
            <p className="eyebrow">Pre-call brief</p>
            <h3>{form.accountName}</h3>
            <p>{form.contactName} · {form.title} · {form.meetingType}</p>
            <button type="button" onClick={() => window.print()}>Print brief</button>
          </div>
          <div className="brief-section"><h4>Account Snapshot</h4><p>{brief.accountSnapshot}</p></div>
          <div className="brief-section"><h4>Contact Angle</h4><p>{brief.contactAngle}</p></div>
          <div className="brief-section"><h4>Three Value Angles</h4><ul>{brief.valueAngles.map((angle) => <li key={angle.recommendation}><strong>{angle.recommendation}</strong><span>Why this matters: {angle.whyItMatters}</span></li>)}</ul></div>
          <div className="brief-section"><h4>Five Discovery Questions</h4><ol>{brief.discoveryQuestions.map((question) => <li key={question}>{question}</li>)}</ol></div>
          <div className="brief-section"><h4>Likely Objections</h4><ul>{brief.likelyObjections.map((item) => <li key={item.objection}><strong>{item.objection}</strong><span>Response: {item.response}</span></li>)}</ul></div>
          <div className="brief-section"><h4>Suggested Opener</h4><p>{brief.opener}</p></div>
          <div className="brief-section"><h4>Soft Next Step</h4><p>{brief.softNextStepAsk}</p><p><strong>Why this matters:</strong> {brief.softNextStepWhy}</p></div>
          <div className="brief-section"><h4>Follow-up Email Draft</h4><p>{brief.followUpEmailDraft}</p></div>
        </article>
      </div>
    </section>
  );
}
