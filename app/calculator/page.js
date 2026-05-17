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
  path: "/calculator",
  keywords: [
    "калькулятор криптокотла",
    "калькулятор майнинг отопления",
    "TH/s курс BTC электричество калькулятор",
  ],
});

const calculatorBenefits = [
  {
    title: "Показывает первый ориентир",
    text: "В расчёте нет лишних абстракций: TH/s, курс BTC, мощность, стоимость кВт·ч и итог в рублях.",
  },
  {
    title: "Помогает подготовить разговор",
    text: "После расчёта проще обсудить мощность, тариф, полезное тепло и ожидания от проекта.",
  },
  {
    title: "Не заменяет инженерный проект",
    text: "После калькулятора мы считаем объект, контуры, автоматику, резервирование и реальную полезную тепловую нагрузку.",
  },
];

const relatedLinks = [
  {
    href: "/home-heating",
    title: "Перейти в сценарий для дома",
    text: "Если вы считаете дом, бассейн или тёплый пол, дальше логично посмотреть решение для частного объекта.",
  },
  {
    href: "/business-heating",
    title: "Перейти в сценарий для бизнеса",
    text: "Для гостиниц, теплиц и коммерческих объектов важны дополнительные вводные по масштабу и эксплуатации.",
  },
  {
    href: "/electric-heating-comparison",
    title: "Сравнить с электричеством",
    text: "Если объект уже отапливается от сети, сравнение поможет спокойнее оценить цифры.",
  },
];

export default async function CalculatorPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/calculator");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Калькулятор отопления на базе майнинга",
          description:
            "Расчёт сценария криптокотла по TH/s, курсу BTC, мощности, тарифу и полезному теплу.",
          path: "/calculator",
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
                Введите основные параметры и получите первый ориентир по сценарию:
                TH/s, курс BTC, мощность, стоимость электричества, полезное тепло и
                примерный итог в рублях.
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
              title="Это быстрый расчёт, а не обещание доходности"
              description="Калькулятор помогает понять порядок цифр. Для решения под объект мы отдельно считаем контуры, сезонность, резерв и схему передачи тепла."
            />
            <FeatureGrid items={calculatorBenefits} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда идти дальше"
              title="После расчёта выберите свой сценарий"
              description="Можно перейти к домашнему или бизнес-решению, а если объект уже топится от сети — сравнить криптокотёл с электрическим отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под реальный объект?"
              text="Отправьте вводные. Мы расширим быстрый калькулятор до инженерного сценария с учётом контуров, автоматики, сезонности и роли оборудования в общей системе."
              primaryHref="/contacts#lead-form"
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
              <Link className="btn btn--ghost" href="/contacts">
                Перейти в контакты
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
