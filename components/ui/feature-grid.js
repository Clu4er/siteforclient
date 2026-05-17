import Link from "next/link";

export function FeatureGrid({ items, columns = 3 }) {
  return (
    <div className={`feature-grid feature-grid--${columns}`}>
      {items.map((item) => {
        const content = (
          <>
            {item.badge ? <span className="info-card__badge">{item.badge}</span> : null}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </>
        );

        return item.href ? (
          <Link className="info-card info-card--link" href={item.href} key={item.title}>
            {content}
          </Link>
        ) : (
          <article className="info-card" key={item.title}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
