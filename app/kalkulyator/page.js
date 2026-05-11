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
  title: "Калькулятор криптокотла — доход, электричество и тепло",
  description:
    "Посчитайте примерный доход от майнинга, расход на электричество, итог в рублях и количество тепла для отопления.",
  path: "/kalkulyator",
  keywords: [
    "калькулятор криптокотла",
    "калькулятор майнинг отопления",
    "TH/s курс BTC электричество калькулятор",
  ],
});

const calculatorBenefits = [
  {
    title: "Показывает главное",
    text: "Доход от майнинга, расход на электричество, итог в месяц и сколько тепла можно использовать.",
  },
  {
    title: "Помогает начать разговор",
    text: "Цифры не заменяют проект, но быстро показывают, стоит ли считать объект подробнее.",
  },
  {
    title: "Не обещает точную прибыль",
    text: "Результат зависит от курса BTC, тарифа, оборудования и условий работы.",
  },
];

const relatedLinks = [
  {
    href: "/dlya-doma",
    title: "Посмотреть решение для дома",
    text: "Если считаете дом, бассейн или тёплый пол, посмотрите страницу для частного объекта.",
  },
  {
    href: "/dlya-biznesa",
    title: "Посмотреть решение для бизнеса",
    text: "Для гостиниц, теплиц и сервиса нужны вводные по масштабу и теплу.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнить с электричеством",
    text: "Посмотрите, чем криптокотёл отличается от обычного электрокотла.",
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
            "Расчёт криптокотла по мощности майнера, курсу BTC, тарифу, расходу на электричество и теплу.",
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
              <h1>Посчитайте тепло, расход и возможный доход</h1>
              <p>
                Это быстрый предварительный расчёт. Введите мощность майнера, курс BTC,
                потребление и цену электричества — получите ориентир за день и месяц.
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
              title="Это ориентир, а не обещание прибыли"
              description="Калькулятор помогает понять порядок цифр. Точный результат зависит от тарифа, курса BTC, модели оборудования и условий работы."
            />
            <FeatureGrid items={calculatorBenefits} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда идти дальше"
              title="Что посмотреть после расчёта"
              description="Если цифры выглядят интересно, переходите на страницу для дома, бизнеса или сравнение с электричеством."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите точнее посчитать ваш объект?"
              text="Отправьте вводные: тариф, объект, куда нужно тепло и какое отопление стоит сейчас. Мы подготовим более точный расчёт."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Получить консультацию"
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
