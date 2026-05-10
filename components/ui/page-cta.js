import Link from "next/link";

export function PageCta({
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <section className="cta-panel">
      <div>
        <span className="eyebrow">Следующий шаг</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-panel__actions">
        <Link className="btn btn--primary" href={primaryHref}>
          {primaryLabel}
        </Link>
        <Link className="btn btn--ghost" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
