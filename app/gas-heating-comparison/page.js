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
  title: "Криптокотёл или газовое отопление: честное сравнение",
  description:
    "Сравнение газового отопления и криптокотла для дома и бизнеса: где газ выгоднее, а где тепло на базе майнинга может быть полезным.",
  path: "/gas-heating-comparison",
  keywords: [
    "криптокотёл или газ",
    "сравнение криптокотла с газом",
    "майнинг отопление против газа",
  ],
});

const gasInsights = [
  {
    title: "Газ остаётся сильным базовым сценарием",
    text: "Если газ уже подключён и тариф понятен, это часто самый простой и привычный источник тепла.",
  },
  {
    title: "Криптокотёл не всегда должен заменять газ",
    text: "Иногда он работает рядом с газовым котлом: берёт часть нагрузки, даёт полезное тепло и добавляет вычислительную функцию.",
  },
  {
    title: "Премиальный и технологичный сегмент",
    text: "Решение интересно тем, кто хочет не только греться, но и сделать объект более технологичным и гибким.",
  },
];

const gasRows = [
  {
    criterion: "Базовая привычность",
    left: "Газ остаётся самым знакомым и понятным способом отопления для большинства домов и объектов.",
    right: "Криптокотёл требует объяснения логики, но даёт дополнительный слой ценности за пределами просто отопления.",
  },
  {
    criterion: "Что делает кВт·ч / ресурс",
    left: "Газ превращается в тепло и только в тепло.",
    right: "Электроэнергия даёт тепло и вычислительную работу в сети BTC.",
  },
  {
    criterion: "Имидж и технологичность",
    left: "Рациональный, но консервативный сценарий.",
    right: "Более технологичный сценарий с дополнительной функцией.",
  },
  {
    criterion: "Когда особенно интересно",
    left: "Когда газ уже подключён и объекту важна только себестоимость отопления.",
    right: "Когда владельцу важны гибкость, резерв, полезное тепло и цифровая функция.",
  },
];

export default async function CompareGasPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/gas-heating-comparison");
  const relatedLinks = getNeighborScenarioLinks("/gas-heating-comparison");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Сравнение криптокотла с газовым отоплением",
          description:
            "Коммерческое и инженерное сравнение газового отопления и криптокотла для дома и бизнеса.",
          path: "/gas-heating-comparison",
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
                <h1>Газ против криптокотла: где сравнение честное, а где слишком упрощённое</h1>
                <p>
                  Газовое отопление часто остаётся самым простым вариантом. Но есть
                  объекты, где криптокотёл может работать рядом с газом и давать
                  дополнительную пользу: тепло, гибкость и участие оборудования в сети BTC.
                </p>
              </div>

              <div className="page-hero__media page-hero__media--wide">
                <Image
                  src={mediaAssets.comparisonGasCryptoboiler.src}
                  alt={mediaAssets.comparisonGasCryptoboiler.alt}
                  width={mediaAssets.comparisonGasCryptoboiler.width}
                  height={mediaAssets.comparisonGasCryptoboiler.height}
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
              title="Мы не обещаем, что криптокотёл всегда выгоднее газа"
              description="Сначала смотрим на тарифы, подключение, тепловую нагрузку и задачи объекта. Только после этого можно честно сравнить варианты."
            />
            <FeatureGrid items={gasInsights} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как отличается логика решений"
              description="Здесь нет универсального «лучше» или «хуже». Есть разные задачи, ограничения и сценарии использования."
            />
            <ComparisonTable leftTitle="Газовое отопление" rightTitle="Криптокотёл" rows={gasRows} />
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
              title="Нужно сравнение под конкретный объект?"
              text="Мы можем честно разобрать сценарий: что уже подключено, есть ли газ, сколько стоит кВт·ч и где криптокотёл становится действительно сильным решением."
              primaryHref="/contacts"
              primaryLabel="Сравнить под мой объект"
              secondaryHref="/calculator"
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
