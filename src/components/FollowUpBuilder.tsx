import { useState } from 'react';
import type { FormEvent } from 'react';
import { buildFollowUp, type FollowUpInput } from '../utils/generators';
import { SectionHeader } from './SectionHeader';

const initial: FollowUpInput = { meetingNotes: '', contactRole: '', caredAbout: '', agreedNextStep: '', blockers: '' };

export function FollowUpBuilder() {
  const [form, setForm] = useState(initial);
  const [followUp, setFollowUp] = useState(() => buildFollowUp({ ...initial, caredAbout: 'audit-ready reporting', agreedNextStep: 'reviewing a reporting example' }));
  function submit(event: FormEvent) { event.preventDefault(); setFollowUp(buildFollowUp(form)); }
  return (
    <section className="section two-column" id="follow-up">
      <div>
        <SectionHeader eyebrow="Follow-Up Builder" title="Send a useful next note" description="Turn raw meeting notes into a warm email, a CRM note, and a concrete next task." />
        <form className="panel form" onSubmit={submit}>
          <label>Meeting notes<textarea value={form.meetingNotes} onChange={(e: any) => setForm({ ...form, meetingNotes: e.target.value })} /></label>
          <label>Contact role<input value={form.contactRole} onChange={(e: any) => setForm({ ...form, contactRole: e.target.value })} /></label>
          <label>What they cared about<input value={form.caredAbout} onChange={(e: any) => setForm({ ...form, caredAbout: e.target.value })} /></label>
          <label>Agreed next step<input value={form.agreedNextStep} onChange={(e: any) => setForm({ ...form, agreedNextStep: e.target.value })} /></label>
          <label>Blockers or objections<textarea value={form.blockers} onChange={(e: any) => setForm({ ...form, blockers: e.target.value })} /></label>
          <button>Build follow-up</button>
        </form>
      </div>
      <div className="panel output">
        <h3>Follow-up package</h3>
        <p><strong>Short follow-up email:</strong> {followUp.email}</p>
        <p><strong>Why this matters:</strong> {followUp.emailWhy}</p>
        <p><strong>Internal CRM note:</strong> {followUp.crmNote}</p>
        <p><strong>Next task:</strong> {followUp.nextTask}</p>
        <p><strong>Why this matters:</strong> {followUp.nextTaskWhy}</p>
        <p><strong>Suggested follow-up date:</strong> {followUp.suggestedFollowUpDate}</p>
      </div>
    </section>
  );
}
