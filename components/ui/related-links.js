import Link from "next/link";

export function RelatedLinks({ items }) {
  return (
    <div className="related-links">
      {items.map((item) => (
        <Link href={item.href} className="link-card" key={item.href}>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </Link>
      ))}
    </div>
  );
}
