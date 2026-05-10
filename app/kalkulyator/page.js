import Link from "next/link";

import { MiningHeatCalculator } from "@/components/calculator/mining-heat-calculator";
import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PageCta } from "@/components/ui/page-cta";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Калькулятор криптокотла: TH/s, курс BTC, мощность и итог в рублях",
  description:
    "Калькулятор отопления на базе майнинга: TH/s, курс BTC, мощность, стоимость электричества, полезное тепло и ориентир по результату в рублях.",
  path: "/kalkulyator",
  keywords: [
    "калькулятор криптокотла",
    "калькулятор майнинг отопления",
    "TH/s курс BTC электричество калькулятор",
  ],
});

const calculatorBenefits = [
  {
    title: "Оставили понятную механику",
    text: "На странице нет лишних абстракций: TH/s, курс BTC, мощность, стоимость кВт·ч и итог в рублях.",
  },
  {
    title: "Подходит для pre-sale и внутренних расчётов",
    text: "Калькулятор можно использовать на встречах, в переписке, на созвоне и при первичной квалификации лида.",
  },
  {
    title: "Не заменяет инженерный проект",
    text: "После калькулятора мы считаем объект, контуры, автоматику, резервирование и реальную полезную тепловую нагрузку.",
  },
];

const relatedLinks = [
  {
    href: "/dlya-doma",
    title: "Перейти в сценарий для дома",
    text: "Если вы считаете дом, бассейн или тёплый пол, дальше логично перейти в отдельную страницу для частного сегмента.",
  },
  {
    href: "/dlya-biznesa",
    title: "Перейти в сценарий для бизнеса",
    text: "Для гостиниц, теплиц и коммерческих объектов важны дополнительные вводные по масштабу и эксплуатации.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнить с электричеством",
    text: "Если объект уже живёт на сети, эта страница помогает перевести цифры в понятный сравнительный сценарий.",
  },
];

export default async function CalculatorPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/kalkulyator");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Калькулятор отопления на базе майнинга",
          description:
            "Расчёт сценария криптокотла по TH/s, курсу BTC, мощности, тарифу и полезному теплу.",
          path: "/kalkulyator",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__copy page-hero__copy--wide">
              <span className="eyebrow">Калькулятор</span>
              <h1>Калькулятор криптокотла с итогом в рублях</h1>
              <p>
                Мы сохранили ровно ту формулу, которая нужна для первого разговора:
                TH/s, курс BTC, мощность, стоимость электричества, полезное тепло и
                ориентир по экономике. Это удобный мост между интересом и коммерческим
                предложением.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <MiningHeatCalculator defaults={content.calculatorDefaults} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что важно знать"
              title="Калькулятор усиливает UX, когда честно ограничивает свои обещания"
              description="Хороший коммерческий калькулятор помогает быстро понять диапазон сценария, но не подменяет полноценный инженерный расчёт объекта."
            />
            <FeatureGrid items={calculatorBenefits} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда идти дальше"
              title="Следующие страницы после расчёта"
              description="После цифр посетитель обычно идёт либо в домашний или бизнес-сценарий, либо в страницу сравнения с электрическим отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под реальный объект?"
              text="Отправьте вводные. Мы расширим быстрый калькулятор до инженерного сценария с учётом контуров, автоматики, сезонности и роли оборудования в общей системе."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Отправить вводные"
              secondaryHref="/faq"
              secondaryLabel="Сначала посмотреть FAQ"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="calculator"
              title={content.leadForm.title}
              subtitle={content.leadForm.subtitle}
              buttonLabel={content.leadForm.buttonLabel}
            />
            <div className="section-actions">
              <Link className="btn btn--ghost" href="/kontakty">
                Перейти в контакты
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
