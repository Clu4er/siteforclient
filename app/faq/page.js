import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageCta } from "@/components/ui/page-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { getBreadcrumbs } from "@/lib/site-routes";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ по криптокотлам — простые ответы про тепло и майнинг",
  description:
    "Что такое криптокотёл, как он греет дом, откуда берётся доход, сколько нужно электричества и можно ли сначала сделать расчёт.",
  path: "/faq",
  keywords: ["faq криптокотёл", "вопросы про криптокотлы", "майнинг отопление FAQ"],
});

const faqCategories = [
  {
    title: "Как это работает",
    text: "Что такое майнер, почему он греется и как это тепло можно отправить в отопление.",
  },
  {
    title: "Деньги и расчёт",
    text: "Откуда берётся доход, что влияет на итог и почему нельзя обещать фиксированную прибыль.",
  },
  {
    title: "Дом и бизнес",
    text: "Где это можно использовать: дом, бассейн, теплица, гостиница, сервис или производство.",
  },
];

export default async function FaqPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/faq");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFaqSchema(content.faq)} />
      <JsonLd
        data={createServiceSchema({
          name: "FAQ по криптокотлам",
          description:
            "Простые ответы на вопросы о криптокотлах, майнинге, тепле, электричестве, доходе и расчёте под объект.",
          path: "/faq",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__copy page-hero__copy--wide">
              <span className="eyebrow">FAQ</span>
              <h1>Простые ответы про криптокотлы</h1>
              <p>
                Если вы впервые слышите про майнинг и отопление от майнера, начните
                здесь. Объясняем коротко: что это такое, откуда берётся тепло, где может
                быть выгода и что нужно посчитать перед установкой.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что здесь внутри"
              title="Сначала разбираем главное"
              description="Без сложной теории и лишних терминов: только вопросы, которые помогают понять, подходит ли вам такая система."
            />
            <div className="feature-grid feature-grid--3">
              {faqCategories.map((item) => (
                <article className="info-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Ответы"
              title="Частые вопросы"
              description="Если не нашли свой вопрос, переходите в контакты и пришлите вводные по объекту."
            />
            <div className="faq-list">
              {content.faq.map((item) => (
                <article className="faq-list__item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Остались вопросы по вашему объекту?"
              text="Отправьте короткое описание объекта: дом, бассейн, теплица, тариф на электричество и текущее отопление. Мы ответим по вашей ситуации."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Задать вопрос"
              secondaryHref="/kalkulyator"
              secondaryLabel="Перейти в калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="faq"
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
