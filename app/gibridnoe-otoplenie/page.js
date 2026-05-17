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
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Подключение криптокотла к существующему отоплению | Гибридная схема",
  description:
    "Как встроить криптокотёл в действующую систему отопления с газовым, электрическим или резервным котлом: сценарии, обвязка, автоматика и расчёт тепла.",
  path: "/gibridnoe-otoplenie",
  keywords: [
    "гибридное отопление",
    "подключение криптокотла к отоплению",
    "криптокотел с газовым котлом",
    "майнинг отопление существующая система",
  ],
});

const fitCards = [
  {
    title: "Есть действующий котёл",
    text: "Криптокотёл можно включить как дополнительный источник тепла, не ломая базовую схему и оставляя газовый, электрический или резервный котёл в системе.",
  },
  {
    title: "Нужно разгрузить расходы",
    text: "Считаем, какую часть тепловой нагрузки можно закрыть оборудованием, а где разумнее оставить привычный источник тепла.",
  },
  {
    title: "Есть несколько контуров",
    text: "Отдельно смотрим тёплый пол, радиаторы, ГВС, бассейн, теплицу и технологические зоны, чтобы тепло шло туда, где оно действительно нужно.",
  },
];

const steps = [
  {
    title: "Разбираем текущую систему",
    text: "Фиксируем котлы, насосные группы, буферные ёмкости, автоматику, температурные режимы и реальные точки подключения.",
  },
  {
    title: "Считаем тепловую нагрузку",
    text: "Определяем сезонный и постоянный спрос на тепло, тариф электроэнергии, доступную мощность и экономику сценария.",
  },
  {
    title: "Проектируем гибридную схему",
    text: "Подбираем место криптокотла в контуре, логику приоритетов, защиту, резервирование и режимы работы.",
  },
  {
    title: "Готовим запуск",
    text: "Описываем обвязку, автоматику и контроль, чтобы система работала предсказуемо рядом с существующим отоплением.",
  },
];

const relatedLinks = [
  {
    href: "/home-heating",
    title: "Для дома",
    text: "Сценарии для коттеджей, бассейнов, тёплых полов и бытовых контуров.",
  },
  {
    href: "/business-heating",
    title: "Для бизнеса",
    text: "Отели, теплицы, сервисные зоны и объекты с постоянным спросом на тепло.",
  },
  {
    href: "/gas-heating-comparison",
    title: "Сравнение с газом",
    text: "Где криптокотёл дополняет газовую схему, а где газ остаётся базовым источником.",
  },
];

export default async function HybridHeatingPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/gibridnoe-otoplenie");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Подключение криптокотла к существующему отоплению",
          description:
            "Проектирование гибридной схемы, где криптокотёл работает рядом с текущим отоплением, резервным источником и автоматикой объекта.",
          path: "/gibridnoe-otoplenie",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__copy page-hero__copy--wide">
              <span className="eyebrow">Гибридное отопление</span>
              <h1>Как встроить криптокотёл в существующую систему отопления</h1>
              <p>
                Не всегда нужно строить систему с нуля. Часто сильнее работает гибридный сценарий:
                криптокотёл берёт на себя полезную тепловую нагрузку, а текущий котёл остаётся
                резервом, пиковым источником или частью общей автоматики.
              </p>
              <div className="hero-copy__actions">
                <a className="btn btn--primary" href="#lead-form">
                  Обсудить подключение
                </a>
                <a className="btn btn--ghost" href="/calculator">
                  Открыть калькулятор
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Когда подходит"
              title="Сценарий для объектов, где отопление уже есть"
              description="Задача не в том, чтобы заменить всё оборудование одним махом, а в том, чтобы аккуратно добавить источник тепла с понятной экономикой."
            />
            <FeatureGrid items={fitCards} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Порядок работы"
              title="Сначала схема и расчёт, потом оборудование"
              description="Мы смотрим на объект как на инженерную систему: нагрузка, контуры, автоматика, резерв и только после этого подбор конфигурации."
            />
            <StepsGrid items={steps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные разделы"
              title="Посмотрите соседние сценарии"
              description="Эти страницы помогают понять, как гибридная схема ведёт себя в доме, бизнесе и рядом с газовым отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите понять, можно ли подключиться к вашей системе?"
              text="Опишите текущий котёл, контуры, площадь, тариф и задачи по теплу. Мы предложим реалистичный сценарий подключения."
              primaryHref="/contacts#lead-form"
              primaryLabel="Оставить заявку"
              secondaryHref="/calculator"
              secondaryLabel="Сначала посчитать модель"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="hybrid-heating"
              title="Запросить схему подключения"
              subtitle="Укажите, какое отопление уже стоит на объекте, какие контуры нужно греть и какая мощность доступна."
              buttonLabel="Отправить запрос"
            />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
