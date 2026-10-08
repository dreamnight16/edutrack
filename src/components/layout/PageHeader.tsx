import type { BrandColor } from '@/lib/theme';
import { fieldClass } from '@/lib/theme';

export interface PageFact {
  label: string;
  value: string;
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  lead?: string;
  color: BrandColor;
  facts?: PageFact[];
  /** Interactive content that belongs inside the colour field. */
  children?: React.ReactNode;
}

/**
 * A page opens with a solid brand colour field rather than a white card:
 * the heading, the numbers and the page's own controls sit directly on colour.
 */
export function PageHeader({
  kicker,
  title,
  lead,
  color,
  facts,
  children,
}: PageHeaderProps) {
  return (
    <header className={fieldClass(color)}>
      <div className="wl-masthead">
        <p className="wl-kicker">{kicker}</p>
        <h1 className="wl-h1" style={{ marginTop: '0.75rem' }}>
          {title}
        </h1>
        {lead ? (
          <p className="wl-lead" style={{ marginTop: '1rem' }}>
            {lead}
          </p>
        ) : null}
        {facts && facts.length > 0 ? (
          <dl className="wl-facts" style={{ marginTop: '2rem' }}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children}
      </div>
    </header>
  );
}
