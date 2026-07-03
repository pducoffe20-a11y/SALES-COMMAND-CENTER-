import { useState } from 'react';
import type { FormEvent } from 'react';
import { buildMeetingPrep, type PrepInput } from '../utils/generators';
import { SectionHeader } from './SectionHeader';

const initial: PrepInput = { accountName: '', contactName: '', title: '', vertical: 'Association', meetingType: 'Discovery', notes: '', competitor: '' };

export function MeetingPrepGenerator() {
  const [form, setForm] = useState(initial);
  const [prep, setPrep] = useState(() => buildMeetingPrep({ ...initial, accountName: 'Sample Association', contactName: 'Pat Contact', notes: 'member training reporting is too manual' }));
  function submit(event: FormEvent) { event.preventDefault(); setPrep(buildMeetingPrep(form)); }
  return (
    <section className="section two-column" id="prep">
      <div>
        <SectionHeader eyebrow="Meeting Prep Generator" title="Walk in with a point of view" description="Enter the buyer context and get a call plan Pat can use right away." />
        <form className="panel form" onSubmit={submit}>
          {(['accountName','contactName','title','vertical','meetingType','competitor'] as const).map((field) => <label key={field}>{field.replace(/([A-Z])/g, ' $1')}<input value={form[field]} onChange={(e: any) => setForm({ ...form, [field]: e.target.value })} /></label>)}
          <label>Notes<textarea value={form.notes} onChange={(e: any) => setForm({ ...form, notes: e.target.value })} /></label>
          <button>Generate prep</button>
        </form>
      </div>
      <div className="panel output">
        <h3>Prep brief</h3>
        <p><strong>Account snapshot:</strong> {prep.accountSnapshot}</p>
        <p><strong>Contact angle:</strong> {prep.contactAngle}</p>
        <h4>3 value angles</h4><ul>{prep.valueAngles.map((v) => <li key={v.recommendation}>{v.recommendation} <strong>Why this matters:</strong> {v.whyItMatters}</li>)}</ul>
        <h4>5 discovery questions</h4><ol>{prep.discoveryQuestions.map((q) => <li key={q}>{q}</li>)}</ol>
        <h4>Likely objections</h4><ul>{prep.likelyObjections.map((o) => <li key={o.objection}>{o.objection} <strong>Recommended response:</strong> {o.response}</li>)}</ul>
        <p><strong>Opener:</strong> {prep.opener}</p>
        <p><strong>Soft next-step ask:</strong> {prep.softNextStepAsk}</p>
        <p><strong>Why this matters:</strong> {prep.softNextStepWhy}</p>
        <p><strong>Follow-up email draft:</strong> {prep.followUpEmailDraft}</p>
      </div>
    </section>
  );
}
