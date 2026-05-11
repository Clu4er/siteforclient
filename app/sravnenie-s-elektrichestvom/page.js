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
  title: "Криптокотёл или электрокотёл — тепло плюс майнинг",
  description:
    "Электрокотёл просто тратит электричество на тепло. Криптокотёл тоже греет, но параллельно майнит BTC. Сравните расходы и выгоду.",
  path: "/sravnenie-s-elektrichestvom",
  keywords: [
    "криптокотёл или электрическое отопление",
    "сравнение криптокотла с электрокотлом",
    "майнинг отопление электричество",
  ],
});

const electricityFeatures = [
  {
    title: "Самое простое сравнение",
    text: "Если вы уже греетесь электричеством, легко понять разницу: один вариант только греет, второй ещё и майнит.",
  },
  {
    title: "Одно электричество — два результата",
    text: "Криптокотёл потребляет электричество, отдаёт тепло и помогает добывать биткоин.",
  },
  {
    title: "Итог зависит от вводных",
    text: "Важны тариф, курс BTC, мощность майнера и то, сколько тепла вы реально используете.",
  },
];

const electricityRows = [
  {
    criterion: "Энергоресурс",
    left: "Электричество используется только для получения тепла.",
    right: "Электричество даёт тепло и майнинг BTC.",
  },
  {
    criterion: "Логика затрат",
    left: "Каждый кВт·ч — это чистая статья расходов на отопление.",
    right: "Часть затрат может компенсироваться доходом от майнинга.",
  },
  {
    criterion: "Понятность расчёта",
    left: "Платите за электричество и получаете тепло.",
    right: "Считаете мощность майнера, курс BTC, тариф и примерный итог.",
  },
  {
    criterion: "Когда особенно рационально",
    left: "Когда нужен только консервативный и простой электрокотёл.",
    right: "Когда объект уже использует электричество и хочет проверить вариант с доходом.",
  },
];

const relatedLinks = [
  {
    href: "/kalkulyator",
    title: "Калькулятор отопления",
    text: "Посчитайте примерный доход, расход на свет и итог в рублях.",
  },
  {
    href: "/dlya-doma",
    title: "Для дома",
    text: "Особенно актуально для домовладельцев с электрическим отоплением и без газа.",
  },
  {
    href: "/dlya-biznesa",
    title: "Для бизнеса",
    text: "Для теплиц, гостиниц, СТО и других объектов, где тепло нужно регулярно.",
  },
];

export default async function CompareElectricityPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/sravnenie-s-elektrichestvom");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Сравнение криптокотла с электрическим отоплением",
          description:
            "Сравнительная страница для домов и бизнеса, которые уже топятся от электричества и хотят понять логику криптокотла.",
          path: "/sravnenie-s-elektrichestvom",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">Сравнение с электричеством</span>
                <h1>Электрокотёл греет. Криптокотёл греет и майнит</h1>
                <p>
                  Обычное электрическое отопление просто превращает деньги в тепло.
                  Криптокотёл тоже потребляет электричество, но при этом добывает BTC.
                  Итог зависит от тарифа, курса и мощности оборудования.
                </p>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.unitInside.src}
                  alt={mediaAssets.unitInside.alt}
                  width={mediaAssets.unitInside.width}
                  height={mediaAssets.unitInside.height}
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
              eyebrow="Почему эта страница важна"
              title="Здесь выгода объясняется проще всего"
              description="Вы уже платите за электричество. Вопрос в том, может ли эта энергия давать не только тепло, но и доход от майнинга."
            />
            <FeatureGrid items={electricityFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как выглядит разница простыми словами"
              description="Сравните, что происходит с каждым киловатт-часом в обычном электрокотле и в криптокотле."
            />
            <ComparisonTable
              leftTitle="Электрокотёл"
              rightTitle="Криптокотёл"
              rows={electricityRows}
            />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Следующие шаги"
              title="Что посмотреть дальше"
              description="Можно сразу перейти в калькулятор или посмотреть отдельные страницы для дома и бизнеса."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите сравнить с вашим электрокотлом?"
              text="Оставьте тариф, примерную мощность и описание объекта. Мы покажем, есть ли смысл считать криптокотёл дальше."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Показать расчёт"
              secondaryHref="/kalkulyator"
              secondaryLabel="Открыть калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="compare-electricity"
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
