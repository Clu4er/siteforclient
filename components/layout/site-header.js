"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { allSiteRoutes, headerRoutes } from "@/lib/site-routes";

export function SiteHeader({ company }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const telegram = company.telegram?.replace("@", "");

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link href="/" className="brand-block" onClick={() => setMenuOpen(false)}>
          <span className="brand-block__mark">BTC</span>
          <span>
            <strong>{company.name}</strong>
            <small>тепло + майнинг</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {headerRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={isActive(route.href) ? "is-active" : ""}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="phone-chip" href={`tel:${company.phone.replace(/\D/g, "")}`}>
            {company.phone}
          </a>
          <Link className="btn btn--primary" href="/kontakty#lead-form">
            Рассчитать выгоду
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <div className="shell mobile-panel__inner">
          {allSiteRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={isActive(route.href) ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {route.label}
            </Link>
          ))}
          <div className="mobile-panel__footer">
            <a href={`tel:${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
            {telegram ? <a href={`https://t.me/${telegram}`}>Telegram</a> : null}
            {company.whatsapp ? <a href={`https://wa.me/${company.whatsapp}`}>WhatsApp</a> : null}
            {company.max ? <a href={company.max}>MAX</a> : null}
          </div>
        </div>
      </div>
    </header>
  );
}
