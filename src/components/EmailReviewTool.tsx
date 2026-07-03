import { useState } from 'react';
import { reviewEmailInPatVoice } from '../utils/generators';
import { SectionHeader } from './SectionHeader';

const sampleEmail = 'Hi Maya. I wanted to touch base about our learning platform and see if you would like to discuss options. Checking in to schedule time.';

export function EmailReviewTool() {
  const [email, setEmail] = useState(sampleEmail);
  const [review, setReview] = useState(() => reviewEmailInPatVoice(sampleEmail));

  return (
    <section className="section" id="pat-voice-review">
      <SectionHeader eyebrow="Sprint 4 · Pat Voice Review" title="Email review tool" description="Paste an email and get a plainspoken rewrite with the pressure removed and the buyer context made clearer." />
      <div className="comparison-grid">
        <div className="panel form">
          <h3>Original email</h3>
          <textarea className="large-textarea" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <button type="button" onClick={() => setReview(reviewEmailInPatVoice(email))}>Review email</button>
          <div className="review-list"><h4>Corporate phrases</h4><ul>{review.corporatePhrases.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul></div>
          <div className="review-list"><h4>Salesy phrases</h4><ul>{review.salesyPhrases.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul></div>
          <div className="review-list"><h4>Missed personalization</h4><ul>{review.missedPersonalization.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <div className="panel output pat-rewrite">
          <h3>Pat's voice</h3>
          <p><strong>Better opener:</strong> {review.betterOpener}</p>
          <p><strong>Better CTA:</strong> {review.betterCta}</p>
          <h4>Side-by-side rewrite</h4>
          <div className="side-by-side">
            <div><span className="pill">Before</span><p>{email}</p></div>
            <div><span className="pill">After</span><p>{review.rewrite}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
