import Link from "next/link";

import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { createOrganizationSchema, createWebsiteSchema } from "@/lib/seo";

export function MarketingShell({ content, children }) {
  return (
    <>
      <AnalyticsScripts />
      <JsonLd data={createWebsiteSchema(content.company)} />
      <JsonLd data={createOrganizationSchema(content.company)} />
      <ScrollReveal />
      <SiteHeader company={content.company} />
      {children}
      <SiteFooter company={content.company} />
      <div className="sticky-mobile-cta">
        <a href={`tel:+${content.company.phone.replace(/\D/g, "")}`}>Позвонить</a>
        <Link href="/contacts#lead-form">Получить расчёт</Link>
      </div>
    </>
  );
}
