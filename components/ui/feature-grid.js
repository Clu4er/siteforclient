export function FeatureGrid({ items, columns = 3 }) {
  return (
    <div className={`feature-grid feature-grid--${columns}`}>
      {items.map((item) => (
        <article className="info-card" key={item.title}>
          {item.badge ? <span className="info-card__badge">{item.badge}</span> : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
