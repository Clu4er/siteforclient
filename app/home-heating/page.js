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
  title: "Криптокотёл для дома, коттеджа и бассейна",
  description:
    "Решения для частного дома: криптокотёл для отопления, тёплого пола, бойлера, бассейна и гибридной схемы с существующим котлом.",
  path: "/home-heating",
  keywords: [
    "криптокотёл для дома",
    "майнинг отопление дома",
    "криптокотёл для коттеджа",
    "отопление бассейна майнингом",
  ],
});

const homeFeatures = [
  {
    title: "Тёплый пол, радиаторы и ГВС",
    text: "Решение хорошо встраивается в привычные контуры дома: можно греть пол, радиаторы, бойлер, бассейн и технические помещения.",
  },
  {
    title: "Гибридный сценарий с существующим котлом",
    text: "Не обязательно ломать текущую систему. Криптокотёл может работать рядом с газом, электрическим или резервным источником.",
  },
  {
    title: "Дом становится инженерно сильнее",
    text: "Система помогает использовать электричество не только для тепла, но и для вычислений в сети BTC. Итог считаем честно по вашим вводным.",
  },
];

const homeCases = [
  {
    badge: "Коттедж",
    title: "Постоянное проживание",
    text: "Подходит для дома, где важно держать стабильное тепло зимой и заранее понимать расходы.",
  },
  {
    badge: "Бассейн",
    title: "Подогрев воды и ГВС",
    text: "Полезное тепло можно направить на бойлер, бассейн или другие водяные контуры.",
  },
  {
    badge: "Баня",
    title: "Гостевой дом и вспомогательные зоны",
    text: "Баню, гараж, мастерскую или гостевой дом можно включить в общий тепловой сценарий.",
  },
  {
    badge: "Теплица",
    title: "Дом + теплица на участке",
    text: "Если на участке есть теплица, для неё можно подобрать отдельный сезонный режим.",
  },
];

const homeSteps = [
  {
    title: "Смотрим, что уже есть в доме",
    text: "Важно понять существующий котёл, контуры отопления, бойлер, бассейн и то, какой сценарий резервирования нужен владельцу.",
  },
  {
    title: "Считаем тепловую нагрузку и электричество",
    text: "Сравниваем текущие расходы, полезное тепло от оборудования и то, как система будет вести себя зимой и в межсезонье.",
  },
  {
    title: "Подбираем компоновку под бытовой комфорт",
    text: "Для дома особенно важны шум, автоматизация, аккуратная интеграция в техпомещение и понятное управление.",
  },
];

export default async function ForHomePage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/home-heating");
  const relatedLinks = getNeighborScenarioLinks("/home-heating");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Криптокотёл для дома и коттеджа",
          description:
            "Проектирование частных систем отопления на базе майнинга: дом, коттедж, бассейн, бойлер, тёплый пол и гибридные контуры.",
          path: "/home-heating",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">Для дома</span>
                <h1>
                  Криптокотёл для <span className="text-highlight">дома</span>,
                  коттеджа и бытовых контуров тепла
                </h1>
                <p>
                  Помогаем понять, можно ли использовать криптокотёл в вашем доме без
                  лишней сложности. Смотрим на комфорт, шум, текущий котёл, расходы на
                  электричество и реальные задачи по теплу.
                </p>
                <div className="page-hero__stats">
                  <article>
                    <strong>Тёплый пол</strong>
                    <span>Радиаторы, бойлер, бассейн, баня и вспомогательные контуры.</span>
                  </article>
                  <article>
                    <strong>Гибридная схема</strong>
                    <span>Криптокотёл можно встроить рядом с текущим котлом и автоматикой.</span>
                  </article>
                </div>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.homeDisplay.src}
                  alt={mediaAssets.homeDisplay.alt}
                  width={mediaAssets.homeDisplay.width}
                  height={mediaAssets.homeDisplay.height}
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
              eyebrow="Что получает домовладелец"
              title={
                <>
                  Тепло для привычных{" "}
                  <span className="text-highlight">домашних задач</span>
                </>
              }
              description="Криптокотёл не должен усложнять жизнь. Мы подбираем схему так, чтобы она работала с тёплым полом, радиаторами, бойлером, бассейном и резервным источником тепла."
            />
            <FeatureGrid items={homeFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Домовые сценарии"
              title="Где решение обычно бывает уместным"
              description="Сильнее всего криптокотёл раскрывается там, где тепло действительно нужно: дом, бассейн, бойлер, баня, теплица или отдельные технические зоны."
            />
            <FeatureGrid items={homeCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Путь внедрения"
              title="Как мы подходим к домашнему объекту"
              description="Сначала разбираемся в вашем доме, потом считаем сценарий и только после этого предлагаем схему подключения."
            />
            <StepsGrid items={homeSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные разделы"
              title="Соседние сценарии"
              description="Откройте соседние сценарии: бизнес, ГПУ, инженерное подключение и сравнение с привычным отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под дом, бассейн или теплицу на участке?"
              text="Оставьте заявку. Мы разложим домашний сценарий по существующему отоплению, тарифу, полезному теплу и возможной роли криптокотла в системе."
              primaryHref="/contacts#lead-form"
              primaryLabel="Получить расчёт под дом"
              secondaryHref="/calculator"
              secondaryLabel="Сначала открыть калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="for-home"
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
