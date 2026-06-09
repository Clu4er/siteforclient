"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { footerRouteGroups } from "@/lib/site-routes";

function CurrentYear() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return <>{year}</>;
}

export function SiteFooter({ company }) {
  const telegram = company.telegram?.replace("@", "");

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="brand-block__mark">ВТС</span>
          <div>
            <strong>{company.name}</strong>
            <p>{company.tagline}</p>
          </div>
        </div>

        <div className="footer-group">
          <h3>Контакты</h3>
          <a href={`tel:+${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          {telegram ? <a href={`https://t.me/${telegram}`}>Telegram</a> : null}
          {company.max ? <a href={company.max}>MAX</a> : null}
          <p>{company.address}</p>
          <small>{company.hours}</small>
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
      </div>

      <div className="shell footer-bottom">
        <p>
          © <CurrentYear /> {company.name}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
