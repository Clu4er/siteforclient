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
  title: "Криптокотёл для дома, коттеджа, бассейна и тёплого пола",
  description:
    "Отдельная страница для частных домовладельцев: отопление дома на базе майнинга, бассейн, тёплый пол, баня, гибридные контуры и расчёт под объект.",
  path: "/dlya-doma",
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
    text: "Вместо «ещё одного котла» владелец получает технологичный объект с более гибкой логикой эксплуатации и расчёта затрат.",
  },
];

const homeCases = [
  {
    badge: "Коттедж",
    title: "Постоянное проживание",
    text: "Дом, где важно круглый год держать комфортный контур и понимать стоимость отопления в длинном горизонте.",
  },
  {
    badge: "Бассейн",
    title: "Подогрев воды и ГВС",
    text: "Подходит для объектов, где тепловая нагрузка есть круглый год: бассейн, ГВС, технические водяные контуры.",
  },
  {
    badge: "Баня",
    title: "Гостевой дом и вспомогательные зоны",
    text: "Отдельные помещения и вспомогательные объекты можно подключать как часть общего сценария отопления.",
  },
  {
    badge: "Теплица",
    title: "Дом + теплица на участке",
    text: "Для частных объектов с сезонной теплицей можно проектировать отдельный режим работы под агросценарий.",
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

const relatedLinks = [
  {
    href: "/sravnenie-s-gazom",
    title: "Сравнение с газом",
    text: "Если в доме уже есть газ, здесь видно, где криптокотёл становится дополняющим или альтернативным сценарием.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Отдельная страница для домов, которые уже отапливаются от сети и хотят изменить экономику кВт·ч.",
  },
  {
    href: "/kalkulyator",
    title: "Калькулятор под дом",
    text: "Можно быстро посчитать домашний сценарий по мощности, TH/s, курсу BTC и стоимости электричества.",
  },
];

export default async function ForHomePage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/dlya-doma");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Криптокотёл для дома и коттеджа",
          description:
            "Проектирование частных систем отопления на базе майнинга: дом, коттедж, бассейн, бойлер, тёплый пол и гибридные контуры.",
          path: "/dlya-doma",
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
                <h1>Криптокотёл для дома, коттеджа и бытовых контуров тепла</h1>
                <p>
                  Эта страница для владельцев частных объектов. Здесь важны не абстрактные
                  обещания, а комфорт, тишина, интеграция в существующее отопление и
                  понятный расчёт по электричеству, теплу и цифровому активу.
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
              title="Продуктовая логика для дома сильнее, когда сайт говорит языком комфорта и инженерии"
              description="Мы убрали излишний акцент на индустриальность и усилили сценарии, которые действительно важны для частного клиента: тишина, резервирование, тёплый пол, бойлер, бассейн и понятная логика затрат."
            />
            <FeatureGrid items={homeFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Домовые сценарии"
              title="Где домашний сценарий особенно понятен"
              description="Чем больше объекту нужно полезное тепло, тем легче объяснить ценность криптокотла и показать не только «майнинг», но и инженерный смысл решения."
            />
            <FeatureGrid items={homeCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Путь внедрения"
              title="Как мы подходим к домашнему объекту"
              description="На частном сегменте особенно важно не перегрузить владельца терминологией, а привести его к понятной и спокойной схеме внедрения."
            />
            <StepsGrid items={homeSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Перелинковка"
              title="Следующие страницы, которые помогают принять решение"
              description="Отдельные страницы по сравнению с газом и электричеством усиливают SEO и помогают частному клиенту быстрее понять, где именно у решения есть смысл."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под дом, бассейн или теплицу на участке?"
              text="Оставьте заявку. Мы разложим домашний сценарий по существующему отоплению, тарифу, полезному теплу и возможной роли криптокотла в системе."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Получить расчёт под дом"
              secondaryHref="/kalkulyator"
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
