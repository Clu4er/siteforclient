import Image from "next/image";

import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PageCta } from "@/components/ui/page-cta";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { mediaAssets } from "@/lib/site-assets";
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Криптокотёл или газ — простое сравнение отопления",
  description:
    "Газ просто греет. Криптокотёл может греть и параллельно майнить BTC. Сравните, когда его стоит рассматривать как дополнение к отоплению.",
  path: "/sravnenie-s-gazom",
  keywords: [
    "криптокотёл или газ",
    "сравнение криптокотла с газом",
    "майнинг отопление против газа",
  ],
});

const gasInsights = [
  {
    title: "Газ остаётся понятным базовым вариантом",
    text: "Если газ уже подключён и стоит недорого, он остаётся понятным способом отопления.",
  },
  {
    title: "Криптокотёл не всегда заменяет газ",
    text: "Чаще его рассматривают как дополнительный источник тепла и возможного дохода.",
  },
  {
    title: "Интересен там, где тепло нужно постоянно",
    text: "Дом, бассейн, теплица, гостиница или сервис получают больше смысла от такого расчёта.",
  },
];

const gasRows = [
  {
    criterion: "Базовая привычность",
    left: "Газ остаётся самым знакомым и понятным способом отопления для большинства домов и объектов.",
    right: "Криптокотёл нужно сначала посчитать, зато он даёт тепло и может приносить доход.",
  },
  {
    criterion: "Что делает ресурс",
    left: "Газ превращается в тепло и только в тепло.",
    right: "Электричество даёт тепло и помогает майнить BTC.",
  },
  {
    criterion: "Роль в системе",
    left: "Обычно основной и привычный источник тепла.",
    right: "Часто дополнительный источник тепла и дохода.",
  },
  {
    criterion: "Когда особенно интересно",
    left: "Когда газ уже подключён и объекту важна только себестоимость отопления.",
    right: "Когда тепло нужно часто, а владелец хочет использовать электричество не только на обогрев.",
  },
];

const relatedLinks = [
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Если объект уже греется от сети, разница с криптокотлом становится особенно понятной.",
  },
  {
    href: "/dlya-doma",
    title: "Страница для дома",
    text: "Для домов с бассейном, бойлером, тёплым полом или теплицей.",
  },
  {
    href: "/dlya-biznesa",
    title: "Страница для бизнеса",
    text: "Для гостиниц, теплиц, СТО, сервисных зон и производств.",
  },
];

export default async function CompareGasPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/sravnenie-s-gazom");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Сравнение криптокотла с газовым отоплением",
          description:
            "Простое сравнение газового отопления и криптокотла для дома и бизнеса.",
          path: "/sravnenie-s-gazom",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">Сравнение с газом</span>
                <h1>Газ просто греет. Криптокотёл греет и майнит</h1>
                <p>
                  Если у вас уже есть газ, его не обязательно менять. Криптокотёл можно
                  рассматривать как дополнение: он даёт тепло и параллельно добывает BTC.
                </p>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.banner.src}
                  alt={mediaAssets.banner.alt}
                  width={mediaAssets.banner.width}
                  height={mediaAssets.banner.height}
                  priority
                  sizes="(max-width: 960px) 100vw, 38vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что важно понимать"
              title="Газ не враг криптокотла"
              description="Во многих случаях газ остаётся базой, а криптокотёл помогает добавить тепло и возможный доход там, где это выгодно."
            />
            <FeatureGrid items={gasInsights} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как отличается логика отопления"
              description="Сравниваем простыми словами: что платите, что получаете и когда есть смысл считать криптокотёл."
            />
            <ComparisonTable leftTitle="Газовое отопление" rightTitle="Криптокотёл" rows={gasRows} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные страницы"
              title="Где смотреть дальше"
              description="После сравнения с газом обычно полезно посмотреть дом, бизнес или электрическое отопление."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите сравнить с вашим газовым отоплением?"
              text="Напишите, что уже подключено, сколько стоит электричество и куда нужно тепло. Мы покажем, есть ли смысл добавлять криптокотёл."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Обсудить мой объект"
              secondaryHref="/kalkulyator"
              secondaryLabel="Перейти в калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="compare-gas"
              title={content.leadForm.title}
              subtitle={content.leadForm.subtitle}
              buttonLabel={content.leadForm.buttonLabel}
            />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
