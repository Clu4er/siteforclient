export function ComparisonTable({ leftTitle, rightTitle, rows }) {
  return (
    <div className="comparison-table">
      <div className="comparison-table__head">
        <span>Критерий</span>
        <span>{leftTitle}</span>
        <span>{rightTitle}</span>
      </div>
      {rows.map((row) => (
        <div className="comparison-table__row" key={row.criterion}>
          <strong>{row.criterion}</strong>
          <p>{row.left}</p>
          <p>{row.right}</p>
        </div>
      ))}
    </div>
  );
}
