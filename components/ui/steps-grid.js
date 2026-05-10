export function StepsGrid({ items }) {
  return (
    <div className="steps-grid">
      {items.map((item, index) => (
        <article className="step-card" key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
