interface WorkspaceSectionProps {
  title: string;
  eyebrow?: string;
  children: JSX.Element | JSX.Element[] | string;
}

export function WorkspaceSection({ title, eyebrow, children }: WorkspaceSectionProps) {
  return (
    <section className="workspace-section">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h3>{title}</h3>
      {children}
    </section>
  );
}
