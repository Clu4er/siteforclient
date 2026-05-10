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
  title: "Криптокотёл или электрическое отопление: сравнение по затратам",
  description:
    "Сравнение криптокотла и электрического отопления: где объект уже платит за кВт·ч и как модель «тепло + майнинг» меняет экономику электроэнергии.",
  path: "/sravnenie-s-elektrichestvom",
  keywords: [
    "криптокотёл или электрическое отопление",
    "сравнение криптокотла с электрокотлом",
    "майнинг отопление электричество",
  ],
});

const electricityFeatures = [
  {
    title: "Это один из самых понятных сценариев для объяснения",
    text: "Если объект уже топится от сети, то разговор не начинается с новой привычки — он начинается с пересмотра роли тех же кВт·ч.",
  },
  {
    title: "Логика «тот же ресурс, но два результата»",
    text: "Электрокотёл превращает электричество только в тепло, а криптокотёл — в тепло плюс вычислительную функцию сети BTC.",
  },
  {
    title: "Сильная SEO-страница для тёплого трафика",
    text: "Люди часто ищут именно такое сравнение. Поэтому страница работает и как коммерческий аргумент, и как отдельный поисковый вход.",
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
    right: "Часть стоимости кВт·ч превращается в тепловой контур и потенциальную выручку.",
  },
  {
    criterion: "Понятность расчёта",
    left: "Простой, но линейный сценарий.",
    right: "Нужен расчёт TH/s, курса BTC, мощности и тарифа, зато модель гибче и интереснее для обсуждения.",
  },
  {
    criterion: "Когда особенно рационально",
    left: "Когда нужен только консервативный и простой электрокотёл.",
    right: "Когда объект уже живёт на электричестве и ищет более сильную экономическую модель затрат.",
  },
];

const relatedLinks = [
  {
    href: "/kalkulyator",
    title: "Калькулятор отопления",
    text: "Здесь можно сразу просчитать сценарий по TH/s, курсу BTC, мощности и стоимости электроэнергии.",
  },
  {
    href: "/dlya-doma",
    title: "Для дома",
    text: "Особенно актуально для домовладельцев с электрическим отоплением и без газа.",
  },
  {
    href: "/dlya-biznesa",
    title: "Для бизнеса",
    text: "Коммерческие объекты с высокой электрической нагрузкой часто воспринимают этот сценарий ещё предметнее.",
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
                <h1>Криптокотёл против электрического отопления: где меняется сама логика кВт·ч</h1>
                <p>
                  Это один из самых сильных продуктовых маршрутов сайта. Когда объект уже
                  отапливается от сети, разговор идёт не о замене одного ресурса на
                  другой, а о том, как использовать те же киловатт-часы в более сильной
                  инженерной и коммерческой модели.
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
              title="Она усиливает и конверсию, и SEO-качество сайта"
              description="Поисковый спрос вокруг электрического отопления часто тёплый. Пользователь уже считает кВт·ч, поэтому ему легче показать разницу между линейным сценарием и моделью «тепло + майнинг»."
            />
            <FeatureGrid items={electricityFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как выглядит разница на языке экономики и инженерии"
              description="Мы сознательно оставили таблицу лаконичной и прикладной, чтобы на ней можно было строить реальный разговор с клиентом."
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
              title="Куда обычно идёт пользователь после этой страницы"
              description="Чаще всего он хочет либо посчитать свой сценарий, либо посмотреть страницу под дом или бизнес."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите посчитать электрический сценарий под ваш объект?"
              text="Оставьте заявку. Мы разложим модель по тарифу, мощности, тепловой нагрузке и покажем, насколько для вас уместен сценарий криптокотла."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Получить расчёт"
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
