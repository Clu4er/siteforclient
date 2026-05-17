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
  title: "Криптокотёл для бизнеса, теплиц и гостиниц",
  description:
    "Отопление на базе майнинга для бизнеса: гостиницы, теплицы, фермы, сервисы и производства, где полезное тепло нужно каждый день.",
  path: "/business-heating",
  keywords: [
    "криптокотёл для бизнеса",
    "майнинг отопление гостиницы",
    "майнинг отопление теплицы",
    "утилизация тепла для производства",
  ],
});

const businessFeatures = [
  {
    title: "Сегменты с постоянным теплопотреблением",
    text: "Чем стабильнее объекту нужно тепло, тем проще посчитать нагрузку, расходы и роль криптокотла в общей системе.",
  },
  {
    title: "Понятный расчёт для решения",
    text: "Для бизнеса важны сроки, обслуживание, электромощность, автоматика, резервирование и понятные цифры до покупки.",
  },
  {
    title: "Масштабируемость по объектам и зонам",
    text: "Можно проектировать несколько зон нагрева, резервирование, каскадирование и разные сценарии сезонной или круглогодичной загрузки.",
  },
];

const businessCases = [
  {
    badge: "Сервис",
    title: "Гостиницы и базы отдыха",
    text: "Отопление, горячая вода и сервисные зоны дают постоянную тепловую нагрузку, которую можно просчитать.",
  },
  {
    badge: "Агро",
    title: "Теплицы и фермы",
    text: "Тепло можно распределять по зонам и режимам, с учётом сезона, площади и графика работы.",
  },
  {
    badge: "Сервис",
    title: "СТО, мойки, сервисные площадки",
    text: "Если тепло нужно регулярно, система может работать как часть инженерной инфраструктуры объекта.",
  },
  {
    badge: "Цеха",
    title: "Производство и цеха",
    text: "Для производств важно заранее понять мощность, зоны нагрева, резерв и обслуживание.",
  },
];

const businessSteps = [
  {
    title: "Анализ операционной нагрузки",
    text: "Смотрим часы работы, зоны теплопотребления, сезонность, резервирование и ограничения по электроэнергии.",
  },
  {
    title: "Коммерческий и инженерный сценарий",
    text: "Считаем полезное тепло, энергопотребление, роль в текущей инфраструктуре и потенциальный экономический эффект по сценариям.",
  },
  {
    title: "Подготовка к внедрению и масштабированию",
    text: "Проектируем систему так, чтобы её можно было развивать по зонам, новым объектам и дополнительным контурам тепла.",
  },
];

const relatedLinks = [
  {
    href: "/gpu-heat-recovery",
    title: "GPU и техконтуры",
    text: "Если у бизнеса уже есть вычислительная нагрузка, тепло от неё можно вернуть в инженерные контуры.",
  },
  {
    href: "/electric-heating-comparison",
    title: "Сравнение с электричеством",
    text: "Актуально для объектов, где уже есть высокая электрическая нагрузка и интерес к изменению структуры затрат.",
  },
  {
    href: "/contacts",
    title: "Контакты и заявка",
    text: "Перейдите к заявке, если хотите обсудить объект и получить первичный расчёт.",
  },
];

export default async function ForBusinessPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/business-heating");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Криптокотёл для бизнеса и коммерческих объектов",
          description:
            "Инженерные решения для гостиниц, теплиц, производственных площадок, сервисных объектов и бизнеса с постоянным спросом на полезное тепло.",
          path: "/business-heating",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">Для бизнеса</span>
                <h1>Криптокотёл для коммерческих объектов и сценариев с полезным теплом</h1>
                <p>
                  Для бизнеса важно не просто поставить оборудование, а понять, как оно
                  впишется в объект. Мы смотрим на тепловую нагрузку, электричество,
                  график работы, резерв и обслуживание.
                </p>
                <div className="page-hero__stats">
                  <article>
                    <strong>Расчёт по объекту</strong>
                    <span>Учитываем мощность, зоны тепла, режим работы и резерв.</span>
                  </article>
                  <article>
                    <strong>Сильные сегменты</strong>
                    <span>Гостиницы, теплицы, сервис, производство и вычислительные контуры.</span>
                  </article>
                </div>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.greenMining.src}
                  alt={mediaAssets.greenMining.alt}
                  width={mediaAssets.greenMining.width}
                  height={mediaAssets.greenMining.height}
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
              eyebrow="B2B-фокус"
              title="Решение должно быть понятно директору, инженеру и снабжению"
              description="Мы объясняем проект простым языком: какая задача решается, сколько тепла нужно, какие ограничения есть и какой следующий шаг безопасен для бизнеса."
            />
            <FeatureGrid items={businessFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Сегменты"
              title="Где бизнес-кейс особенно понятен"
              description="Если объект регулярно тратит деньги на тепло и электричество, сценарий можно обсудить предметно и без громких обещаний."
            />
            <FeatureGrid items={businessCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как внедряем"
              title="От задачи к понятному расчёту"
              description="Собираем вводные, считаем нагрузку, подбираем схему и объясняем, где решение будет полезным, а где лучше выбрать другой вариант."
            />
            <StepsGrid items={businessSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что посмотреть дальше"
              title="Полезные страницы для следующего шага"
              description="Можно посмотреть сценарий с GPU, сравнить решение с электрическим отоплением или сразу отправить вводные по объекту."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под гостиницу, теплицу, сервис или производство?"
              text="Оставьте вводные по объекту. Мы подготовим инженерный сценарий, посчитаем полезное тепло и соберём ориентир по нагрузке и экономике."
              primaryHref="/contacts#lead-form"
              primaryLabel="Запросить B2B-расчёт"
              secondaryHref="/calculator"
              secondaryLabel="Открыть калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="for-business"
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
