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
  title: "FAQ по криптокотлам, майнингу и отоплению",
  description:
    "Частые вопросы о криптокотлах, отоплении на базе майнинга, интеграции в существующие системы, шуме, электричестве, сезонности и расчётах.",
  path: "/faq",
  keywords: ["faq криптокотёл", "вопросы про криптокотлы", "майнинг отопление FAQ"],
});

const faqCategories = [
  {
    title: "Инженерия и интеграция",
    text: "Подключение к существующей системе, резервирование, контуры, шум, охлаждение и тепловая схема.",
  },
  {
    title: "Экономика и расчёты",
    text: "Логика калькулятора, стоимость электроэнергии, TH/s, курс BTC и роль сезонности.",
  },
  {
    title: "Сегменты и сценарии",
    text: "Дом, бизнес, теплица, ГПУ, гостиница, сервисный объект и производственные сценарии.",
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
          name: "FAQ по криптокотлам и отоплению на базе майнинга",
          description:
            "Ответы на частые вопросы по интеграции, расчётам, шуму, теплу, электричеству и сценариям использования криптокотлов.",
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
              <h1>
                FAQ по <span className="text-highlight">криптокотлам</span> и
                отоплению на базе майнинга
              </h1>
              <p>
                Здесь собраны ответы на вопросы, которые обычно появляются до расчёта:
                как подключается оборудование, насколько оно шумит, что происходит
                летом и почему калькулятор не является обещанием доходности.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что здесь внутри"
              title={
                <>
                  Коротко о <span className="text-highlight">главном</span> перед
                  заявкой
                </>
              }
              description="Мы отвечаем простым языком: про подключение, расчёт, шум, сезонность и сценарии для разных объектов."
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
              description="Если не находите свой вопрос, переходите в контакты и присылайте вводные по объекту."
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
              text="Отправьте короткое описание объекта или текущей схемы отопления. Мы ответим предметно, а не общими фразами."
              primaryHref="/contacts#lead-form"
              primaryLabel="Задать вопрос"
              secondaryHref="/calculator"
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
