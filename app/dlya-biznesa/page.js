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
  title: "Криптокотёл для бизнеса — тепло и доход от майнинга",
  description:
    "Криптокотёл помогает бизнесу получать тепло для помещений, теплиц, воды или сервиса и параллельно майнить BTC. Рассчитайте выгоду под объект.",
  path: "/dlya-biznesa",
  keywords: [
    "криптокотёл для бизнеса",
    "майнинг отопление гостиницы",
    "майнинг отопление теплицы",
    "тепло от майнинга для производства",
  ],
});

const businessFeatures = [
  {
    title: "Подходит там, где тепло нужно регулярно",
    text: "Чем чаще бизнесу нужно тепло, тем проще посчитать пользу: гостиница, теплица, СТО, ферма или производство.",
  },
  {
    title: "Считаем в деньгах, а не в обещаниях",
    text: "Смотрим тариф, мощность оборудования, расход на свет, тепло и возможный доход от майнинга.",
  },
  {
    title: "Можно начинать с одного участка",
    text: "Систему можно считать для отдельной зоны: вода, теплица, склад, сервисная зона или помещение.",
  },
];

const businessCases = [
  {
    badge: "Сервис",
    title: "Гостиницы и базы отдыха",
    text: "Номера, вода и общие зоны требуют тепла каждый день. Это удобно считать.",
  },
  {
    badge: "Агро",
    title: "Теплицы и фермы",
    text: "Теплицам часто нужно много тепла. Майнинг может стать дополнительным источником дохода.",
  },
  {
    badge: "Сервис",
    title: "СТО, мойки, сервисные площадки",
    text: "Тепло можно использовать для помещений, воды и рабочих зон.",
  },
  {
    badge: "Цеха",
    title: "Производство и цеха",
    text: "Если на площадке уже есть потребность в тепле, можно посчитать криптокотёл как часть расходов и доходов.",
  },
];

const businessSteps = [
  {
    title: "Разбираем, где нужно тепло",
    text: "Смотрим часы работы, сезонность, тариф на электричество и места, куда можно направить тепло.",
  },
  {
    title: "Считаем расход и возможный доход",
    text: "Показываем, сколько стоит электричество, сколько тепла получается и какой ориентир даёт майнинг.",
  },
  {
    title: "Подбираем решение под объект",
    text: "Предлагаем схему, которую можно начать с малого и расширять, если расчёт подтвердит смысл.",
  },
];

const relatedLinks = [
  {
    href: "/gpu-otoplenie",
    title: "GPU и серверное тепло",
    text: "Если у бизнеса уже есть серверы или GPU, их тепло тоже можно использовать.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Посмотрите, чем криптокотёл отличается от обычного электрокотла.",
  },
  {
    href: "/kontakty",
    title: "Контакты и заявка",
    text: "Опишите объект, и мы подскажем, с чего начать расчёт.",
  },
];

export default async function ForBusinessPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/dlya-biznesa");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Криптокотёл для бизнеса и коммерческих объектов",
          description:
            "Криптокотлы для гостиниц, теплиц, производств, СТО и бизнеса, где тепло нужно регулярно.",
          path: "/dlya-biznesa",
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
                <h1>Тепло для бизнеса, которое может приносить доход</h1>
                <p>
                  Криптокотёл потребляет электричество, добывает BTC и отдаёт тепло.
                  Это тепло можно использовать для помещений, воды, теплиц, сервиса
                  или производства.
                </p>
                <div className="page-hero__stats">
                  <article>
                    <strong>Для расчёта</strong>
                    <span>Тариф, мощность, тепло, доход и расход на электричество.</span>
                  </article>
                  <article>
                    <strong>Сильные сегменты</strong>
                    <span>Гостиницы, теплицы, сервис, производство и серверные.</span>
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
              eyebrow="Для бизнеса"
              title="Бизнесу важно видеть расчёт, а не сложные термины"
              description="Мы объясняем простую логику: сколько стоит электричество, куда идёт тепло и какой доход может дать оборудование."
            />
            <FeatureGrid items={businessFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Где использовать"
              title="Где бизнесу особенно интересно считать криптокотёл"
              description="Лучшие случаи — там, где тепло нужно не разово, а каждый день или весь сезон."
            />
            <FeatureGrid items={businessCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как внедряем"
              title="Как перейти от идеи к понятному расчёту"
              description="Сначала собираем вводные, затем считаем цифры и показываем, есть ли смысл двигаться дальше."
            />
            <StepsGrid items={businessSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда дальше"
              title="Что посмотреть дальше"
              description="Сравните с электрическим отоплением, посмотрите страницу про GPU или сразу отправьте вводные."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите посчитать выгоду для бизнеса?"
              text="Опишите объект, тариф на электричество и куда нужно тепло. Мы покажем предварительные цифры без обещаний гарантированной прибыли."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Подобрать для бизнеса"
              secondaryHref="/kalkulyator"
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
