"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".hero-copy",
  ".hero-stage",
  ".section > .shell",
  ".page-hero > .shell",
  ".info-card",
  ".step-card",
  ".link-card",
  ".faq-preview__item",
  ".faq-list__item",
  ".cta-panel",
  ".lead-form",
  ".lead-contact-info",
  ".contact-panel",
  ".calculator-card",
  ".bearings-hero__copy",
  ".bearings-visual",
  ".bearings-sidebar",
  ".bearings-industries span",
  ".bearings-contact-grid article",
  ".bearings-page .lead-form-panel",
].join(",");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = Array.from(document.querySelectorAll(revealSelector));

    targets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        rootMargin: "-8% 0px -10% 0px",
        threshold: 0.1,
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
