interface CommandCardProps {
  label: string;
  account: string;
  contact: string;
  context: string;
  whyItMatters: string;
  recommendedNextAction: string;
  softCta: string;
  meta?: string;
  urgency?: 'critical' | 'high' | 'normal';
}

export function CommandCard({
  label,
  account,
  contact,
  context,
  whyItMatters,
  recommendedNextAction,
  softCta,
  meta,
  urgency = 'normal',
}: CommandCardProps) {
  return (
    <article className={`command-card ${urgency}`}>
      <div className="card-topline">
        <span className="pill">{label}</span>
        {meta && <span className="meta">{meta}</span>}
      </div>
      <h3>{account}</h3>
      <p className="contact">{contact}</p>
      <p>{context}</p>
      <div className="why"><strong>Why this matters:</strong> {whyItMatters}</div>
      <p><strong>Do next:</strong> {recommendedNextAction}</p>
      <a className="card-action" href={`mailto:?subject=${encodeURIComponent(account)} next step&body=${encodeURIComponent(softCta)}`}>
        {softCta}
      </a>
    </article>
  );
}
