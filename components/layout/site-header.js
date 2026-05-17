"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { headerRoutes } from "@/lib/site-routes";

const mobileNavRoutes = [
  { href: "/", label: "Главная" },
  { href: "/home-heating", label: "Для дома" },
  { href: "/business-heating", label: "Для бизнеса" },
  { href: "/electric-heating-comparison", label: "Сравнение" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/bearings", label: "Подшипники" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader({ company }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("is-mobile-menu-open", menuOpen);

    return () => {
      document.body.classList.remove("is-mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link href="/" className="brand-block" onClick={() => setMenuOpen(false)}>
          <span className="brand-block__mark">BTC</span>
          <span>
            <strong>{company.name}</strong>
            <small>тепло + майнинг + инженерия</small>
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
          <a className="phone-chip" href={`tel:+${company.phone.replace(/\D/g, "")}`}>
            {company.phone}
          </a>
          <Link className="btn btn--primary" href="/contacts#lead-form">
            Получить расчёт
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Открыть меню"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`} id="mobile-menu">
        <div className="shell mobile-panel__inner">
          <nav className="mobile-panel__nav" aria-label="Мобильная навигация">
            {mobileNavRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={isActive(route.href) ? "is-active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
