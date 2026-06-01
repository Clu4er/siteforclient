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
import { getBreadcrumbs, getNeighborScenarioLinks } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Криптокотёл или электрокотёл: сравнение отопления",
  description:
    "Чем криптокотёл отличается от электрокотла: тепло, расход электроэнергии, расчёт кВт·ч и сценарии для дома или бизнеса.",
  path: "/electric-heating-comparison",
  keywords: [
    "криптокотёл или электрическое отопление",
    "сравнение криптокотла с электрокотлом",
    "майнинг отопление электричество",
  ],
});

const electricityFeatures = [
  {
    title: "Если вы уже топитесь электричеством",
    text: "В этом случае сравнение особенно простое: ресурс тот же, но результат от его использования может быть другим.",
  },
  {
    title: "Логика «тот же ресурс, но два результата»",
    text: "Электрокотёл даёт только тепло, а криптокотёл даёт тепло и вычислительную работу в сети BTC.",
  },
  {
    title: "Цифры нужно считать под ваш объект",
    text: "На результат влияют тариф, мощность, режим работы, курс BTC и то, сколько полезного тепла действительно нужно.",
  },
];

const electricityRows = [
  {
    criterion: "Энергоресурс",
    left: "Электричество используется только для получения тепла.",
    right: "Электричество даёт тепло и вычислительную работу в сети BTC.",
  },
  {
    criterion: "Логика затрат",
    left: "Каждый кВт·ч — это чистая статья расходов на отопление.",
    right: "Электричество даёт тепло и может участвовать в создании цифрового актива.",
  },
  {
    criterion: "Понятность расчёта",
    left: "Простой, но линейный сценарий.",
    right: "Нужен расчёт TH/s, курса BTC, мощности и тарифа, зато модель показывает больше вариантов.",
  },
  {
    criterion: "Когда особенно рационально",
    left: "Когда нужен только консервативный и простой электрокотёл.",
    right: "Когда объект уже платит за электрическое отопление и хочет оценить альтернативный сценарий.",
  },
];

export default async function CompareElectricityPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/electric-heating-comparison");
  const relatedLinks = getNeighborScenarioLinks("/electric-heating-comparison");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Сравнение криптокотла с электрическим отоплением",
          description:
            "Сравнение для домов и бизнеса, которые уже топятся от электричества и хотят понять логику криптокотла.",
          path: "/electric-heating-comparison",
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
                <h1>Криптокотёл против электрического отопления: где меняется сама логика кВт·ч</h1>
                <p>
                  Если дом или объект уже отапливается электричеством, криптокотёл
                  помогает по-новому посмотреть на те же кВт·ч. Они могут давать не
                  только тепло, но и вычислительную работу в сети BTC.
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
              eyebrow="Что важно понять"
              title="Сравнение начинается с вашего тарифа и тепловой нагрузки"
              description="Мы не сравниваем абстрактные котлы. Мы смотрим, сколько электричества нужно объекту, сколько тепла можно использовать и какой сценарий получится в рублях."
            />
            <FeatureGrid items={electricityFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как выглядит разница на языке экономики и инженерии"
              description="Таблица помогает быстро увидеть разницу между простым электрокотлом и системой, где электричество работает в двух направлениях."
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
              eyebrow="Связанные разделы"
              title="Соседние сценарии"
              description="Перейдите к сценариям для дома, бизнеса, ГПУ или инженерному подключению."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите посчитать электрический сценарий под ваш объект?"
              text="Оставьте заявку. Мы разложим модель по тарифу, мощности, тепловой нагрузке и покажем, насколько для вас уместен сценарий криптокотла."
              primaryHref="/contacts#lead-form"
              primaryLabel="Получить расчёт"
              secondaryHref="/calculator"
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
