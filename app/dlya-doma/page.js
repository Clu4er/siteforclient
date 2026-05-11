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
  title: "Криптокотёл для отопления дома — тепло и майнинг",
  description:
    "Майнер выделяет тепло, а система направляет его в отопление дома, бассейна, бойлера или теплицы. Рассчитайте выгоду для вашего дома.",
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
    text: "Тепло от майнера можно направить в тёплый пол, радиаторы, бойлер, бассейн или баню.",
  },
  {
    title: "Можно подключить к текущему отоплению",
    text: "Не нужно всё переделывать с нуля. Криптокотёл часто ставят рядом с газовым или электрическим котлом.",
  },
  {
    title: "Электричество работает полезнее",
    text: "Вы платите за электричество, но получаете не только тепло, а ещё и возможный доход от майнинга.",
  },
];

const homeCases = [
  {
    badge: "Коттедж",
    title: "Постоянное проживание",
    text: "Дом, где тепло нужно часто и важно заранее понимать расходы на отопление.",
  },
  {
    badge: "Бассейн",
    title: "Подогрев воды и ГВС",
    text: "Бассейн и горячая вода требуют много тепла. Это хороший повод считать криптокотёл.",
  },
  {
    badge: "Баня",
    title: "Гостевой дом и вспомогательные зоны",
    text: "Тепло можно использовать не только в основном доме, но и в бане или гостевом доме.",
  },
  {
    badge: "Теплица",
    title: "Дом + теплица на участке",
    text: "Если на участке есть теплица, лишнее тепло можно направлять туда в нужный сезон.",
  },
];

const homeSteps = [
  {
    title: "Смотрим, что уже есть в доме",
    text: "Уточняем, чем дом греется сейчас, есть ли бойлер, бассейн, тёплый пол или теплица.",
  },
  {
    title: "Считаем потребность в тепле и электричество",
    text: "Сравниваем текущие расходы, тариф и примерный доход от майнинга.",
  },
  {
    title: "Подбираем удобное решение",
    text: "Для дома важны тишина, безопасность, простое управление и аккуратное размещение оборудования.",
  },
];

const relatedLinks = [
  {
    href: "/sravnenie-s-gazom",
    title: "Сравнение с газом",
    text: "Если газ уже есть, криптокотёл можно рассматривать как дополнительное тепло и доход.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Если дом греется электричеством, сравните обычный электрокотёл и криптокотёл.",
  },
  {
    href: "/kalkulyator",
    title: "Калькулятор под дом",
    text: "Быстро прикиньте доход, расход на свет и примерный итог за месяц.",
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
            "Криптокотёл для отопления дома, бассейна, бойлера, тёплого пола и теплицы.",
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
                <h1>Тепло для дома и возможный доход от майнинга</h1>
                <p>
                  Майнер добывает биткоин и нагревается. Мы предлагаем использовать это
                  тепло для дома, бассейна, бойлера или теплицы, а перед установкой
                  показать понятный расчёт.
                </p>
                <div className="page-hero__stats">
                  <article>
                    <strong>Тёплый пол</strong>
                    <span>Радиаторы, бойлер, бассейн, баня и тёплый пол.</span>
                  </article>
                  <article>
                    <strong>Без лишней переделки</strong>
                    <span>Можно подключить рядом с текущим котлом.</span>
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
              title="Главное для дома — тепло, комфорт и понятные цифры"
              description="Без сложных терминов: смотрим, куда можно направить тепло, сколько стоит электричество и какой доход может дать майнинг."
            />
            <FeatureGrid items={homeFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Где использовать"
              title="Где в доме это особенно полезно"
              description="Чем больше вам нужно тепла, тем интереснее считать криптокотёл: дом, бассейн, бойлер, баня или теплица."
            />
            <FeatureGrid items={homeCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Путь внедрения"
              title="Как понять, подойдёт ли это вашему дому"
              description="Начинаем с простых вводных и только потом переходим к оборудованию и подключению."
            />
            <StepsGrid items={homeSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда дальше"
              title="Что посмотреть дальше"
              description="Сравните криптокотёл с газом, электричеством или сразу откройте калькулятор."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите понять выгоду для дома?"
              text="Напишите, чем дом греется сейчас, какой тариф на электричество и куда нужно тепло. Мы покажем предварительный расчёт."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Подобрать для дома"
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
