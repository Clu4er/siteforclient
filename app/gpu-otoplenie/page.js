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
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GPU и утилизация тепла: отопление на базе вычислений",
  description:
    "Отдельная страница про GPU, AI и утилизацию серверного тепла: как использовать вычислительный контур для ГВС, отопления и технических задач.",
  path: "/gpu-otoplenie",
  keywords: [
    "GPU отопление",
    "утилизация тепла GPU",
    "AI ферма отопление",
    "серверное тепло",
  ],
});

const gpuFeatures = [
  {
    title: "Отдельный продуктовый сценарий",
    text: "GPU-контуры требуют другой подачи, чем ASIC и бытовые решения. Здесь важны стойки, серверное тепло, жидкостное охлаждение и техпроцессы.",
  },
  {
    title: "Интересно для AI, рендера и лабораторий",
    text: "Сценарий особенно уместен там, где вычисления уже являются частью бизнеса или технологического процесса.",
  },
  {
    title: "Тепло становится вторичным, но полезным продуктом",
    text: "В вычислительном сценарии основной ценностью остаются вычисления, а тепло превращается в инженерный актив для объекта.",
  },
];

const gpuUseCases = [
  {
    badge: "AI",
    title: "AI и ML-контуры",
    text: "Рабочие GPU-кластеры можно связать с системами ГВС, вентиляции, тёплых полов или технологическими водяными контурами.",
  },
  {
    badge: "Render",
    title: "Рендер и медиапроизводство",
    text: "Для студий и производств вычислительная нагрузка может работать одновременно как источник полезного тепла.",
  },
  {
    badge: "Lab",
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
    text: "Проектируем сценарий, в котором GPU-контур не мешает основному процессу, а отдаёт полезное тепло в нужный контур.",
  },
  {
    title: "Готовим масштабирование",
    text: "Если вычислительный парк растёт, система отвода и утилизации тепла должна масштабироваться вместе с ним.",
  },
];

const relatedLinks = [
  {
    href: "/dlya-biznesa",
    title: "Страница для бизнеса",
    text: "GPU-сценарии почти всегда обсуждаются как часть более широкого коммерческого или технологического объекта.",
  },
  {
    href: "/kalkulyator",
    title: "Калькулятор",
    text: "Даже если сценарий начинается с GPU, быстрый расчёт помогает оценить мощность, электроэнергию и полезное тепло.",
  },
  {
    href: "/kontakty",
    title: "Контакты",
    text: "Если у вас уже есть вычислительная нагрузка, удобнее перейти к предметному разговору по объекту.",
  },
];

export default async function GpuHeatingPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/gpu-otoplenie");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "GPU и утилизация вычислительного тепла",
          description:
            "Инженерные сценарии использования тепла от GPU, AI и серверных контуров для отопления, ГВС и технологических задач.",
          path: "/gpu-otoplenie",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">GPU и вычислительное тепло</span>
                <h1>Как превратить тепло от GPU и вычислений в полезный инженерный ресурс</h1>
                <p>
                  Мы вынесли GPU в отдельную SEO-страницу, потому что это уже не «тот же
                  самый сайт, только про другое железо». Здесь работает своя логика:
                  AI, рендер, серверные контуры, жидкостное охлаждение и возврат тепла в
                  объект.
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
              eyebrow="Почему это отдельная страница"
              title="GPU — это не декоративное дополнение, а самостоятельный коммерческий и SEO-маршрут"
              description="Эта страница усиливает и экспертность, и поисковую архитектуру сайта: она показывает, что проект понимает не только бытовое отопление, но и современные вычислительные контуры."
            />
            <FeatureGrid items={gpuFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Где особенно интересно"
              title="Сценарии утилизации вычислительного тепла"
              description="Здесь тепло уже не первичная ценность, а полезный побочный актив вычислительного контура, который можно встроить в объект."
            />
            <FeatureGrid items={gpuUseCases} columns={3} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как внедряем"
              title="Путь от вычислительного парка к инженерной схеме"
              description="GPU-сценарий требует аккуратного проектирования, чтобы не мешать основной вычислительной задаче и при этом вернуть объекту реальную пользу от тепла."
            />
            <StepsGrid items={gpuSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные страницы"
              title="Что ещё посмотреть"
              description="После GPU-страницы пользователь обычно идёт либо в B2B-сценарий, либо в калькулятор и контакты."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Есть GPU-контур, серверная или AI-нагрузка?"
              text="Оставьте параметры объекта и задачи. Мы поможем оценить схему утилизации тепла, интеграцию в инженерную систему и следующий шаг по проекту."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Обсудить GPU-сценарий"
              secondaryHref="/dlya-biznesa"
              secondaryLabel="Перейти в B2B-страницу"
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
