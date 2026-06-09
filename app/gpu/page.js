import Image from "next/image";

import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PageCta } from "@/components/ui/page-cta";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepsGrid } from "@/components/ui/steps-grid";
import { getSiteContent } from "@/lib/cms";
import { mediaAssets } from "@/lib/site-assets";
import { getBreadcrumbs, getNeighborScenarioLinks } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ГПУ: утилизация тепла для отопления и ГВС",
  description:
    "Как использовать тепло от ГПУ, ИИ-серверов и вычислительных контуров для отопления, ГВС, вентиляции и технических задач объекта.",
  path: "/gpu",
  keywords: [
    "ГПУ отопление",
    "утилизация тепла ГПУ",
    "ИИ ферма отопление",
    "серверное тепло",
  ],
});

const gpuFeatures = [
  {
    title: "Тепло от вычислений не пропадает",
    text: "ГПУ и серверы выделяют много тепла. Его можно не сбрасывать в воздух, а направить в нужный контур объекта.",
  },
  {
    title: "Интересно для ИИ, рендера и лабораторий",
    text: "Сценарий особенно уместен там, где вычисления уже работают каждый день и дают стабильную тепловую нагрузку.",
  },
  {
    title: "Тепло становится вторичным, но полезным продуктом",
    text: "Главная задача остаётся вычислительной, но тепло можно вернуть в ГВС, отопление, вентиляцию или технологический контур.",
  },
];

const gpuUseCases = [
  {
    badge: "ИИ",
    title: "ИИ и машинное обучение",
    text: "Рабочие ГПУ-кластеры можно связать с системами ГВС, вентиляции, тёплых полов или технологическими водяными контурами.",
  },
  {
    badge: "Рендер",
    title: "Рендер и медиапроизводство",
    text: "Для студий и производств вычислительная нагрузка может работать одновременно как источник полезного тепла.",
  },
  {
    badge: "Лаборатория",
    title: "Лаборатории и технические помещения",
    text: "Тепло можно возвращать в объект в виде управляемого инженерного потока, а не рассеивать без пользы.",
  },
];

const gpuSteps = [
  {
    title: "Смотрим на тепловую карту вычислительного контура",
    text: "Важно понять, где именно образуется тепло, как стабильно работает вычислительная нагрузка и какой режим отвода нужен объекту.",
  },
  {
    title: "Связываем вычисления и инженерную систему",
    text: "Проектируем сценарий, в котором ГПУ не мешает основному процессу, а отдаёт полезное тепло в нужный контур.",
  },
  {
    title: "Готовим масштабирование",
    text: "Если вычислительный парк растёт, система отвода и утилизации тепла должна масштабироваться вместе с ним.",
  },
];

export default async function GpuHeatingPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/gpu");
  const relatedLinks = getNeighborScenarioLinks("/gpu");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "ГПУ и утилизация вычислительного тепла",
          description:
            "Инженерные сценарии использования тепла от ГПУ, ИИ и серверных контуров для отопления, ГВС и технологических задач.",
          path: "/gpu",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">ГПУ и вычислительное тепло</span>
                <h1>
                  Как превратить тепло от <span className="text-highlight">ГПУ</span>{" "}
                  в полезный инженерный ресурс
                </h1>
                <p>
                  Если на объекте работают ГПУ, серверы или ИИ-нагрузка, тепло можно
                  использовать с пользой. Мы помогаем понять, куда его направить и как
                  не мешать основной вычислительной задаче.
                </p>
              </div>

              <div className="page-hero__media page-hero__media--landscape">
                <Image
                  src={mediaAssets.gpuCryptoboilerRacks.src}
                  alt={mediaAssets.gpuCryptoboilerRacks.alt}
                  width={mediaAssets.gpuCryptoboilerRacks.width}
                  height={mediaAssets.gpuCryptoboilerRacks.height}
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
              eyebrow="Зачем это нужно"
              title={
                <>
                  Серверное тепло можно{" "}
                  <span className="text-highlight">вернуть в дело</span>
                </>
              }
              description="Мы смотрим на вычислительный контур как на источник тепла, который можно аккуратно связать с инженерной системой здания."
            />
            <FeatureGrid items={gpuFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Где особенно интересно"
              title={
                <>
                  Сценарии утилизации{" "}
                  <span className="text-highlight">вычислительного тепла</span>
                </>
              }
              description="Подходит объектам, где вычисления работают стабильно, а тепло нужно для воды, воздуха, полов или технических процессов."
            />
            <FeatureGrid items={gpuUseCases} columns={3} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как внедряем"
              title="Путь от вычислительного парка к инженерной схеме"
              description="Сначала защищаем основную вычислительную задачу, потом подбираем способ отвода и полезного использования тепла."
            />
            <StepsGrid items={gpuSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные разделы"
              title="Соседние сценарии"
              description="Откройте соседние сценарии: дом, бизнес, инженерное подключение и сравнение с привычным отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Есть ГПУ, серверная или ИИ-нагрузка?"
              text="Оставьте параметры объекта и задачи. Мы поможем оценить схему утилизации тепла, интеграцию в инженерную систему и следующий шаг по проекту."
              primaryHref="/contacts"
              primaryLabel="Обсудить ГПУ-сценарий"
              secondaryHref="/business-heating"
              secondaryLabel="Решения для бизнеса"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="gpu"
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
