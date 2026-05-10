import Link from "next/link";

import { footerRouteGroups } from "@/lib/site-routes";

export function SiteFooter({ company }) {
  const telegram = company.telegram?.replace("@", "");

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="brand-block__mark">BTC</span>
          <div>
            <strong>{company.name}</strong>
            <p>{company.tagline}</p>
          </div>
        </div>

        {footerRouteGroups.map((group) => (
          <div key={group.title} className="footer-group">
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer-group">
          <h3>Контакты</h3>
          <a href={`tel:${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          {company.whatsapp ? <a href={`https://wa.me/${company.whatsapp}`}>WhatsApp</a> : null}
          {telegram ? <a href={`https://t.me/${telegram}`}>Telegram</a> : null}
          {company.max ? <a href={company.max}>MAX</a> : null}
          <p>{company.address}</p>
          <small>{company.hours}</small>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>
          {company.name}. Инженерные решения по отоплению на базе майнинга, GPU и
          утилизации тепла.
        </p>
        <p>Калькулятор и тексты на сайте не являются финансовой офертой.</p>
      </div>
    </footer>
  );
}
