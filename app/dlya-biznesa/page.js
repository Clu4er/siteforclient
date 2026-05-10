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
  title: "Криптокотёл для бизнеса, гостиниц, теплиц и производства",
  description:
    "Страница для бизнеса: гостиницы, базы отдыха, теплицы, фермы, сервис, коммерческие объекты и производственные площадки с потребностью в полезном тепле.",
  path: "/dlya-biznesa",
  keywords: [
    "криптокотёл для бизнеса",
    "майнинг отопление гостиницы",
    "майнинг отопление теплицы",
    "утилизация тепла для производства",
  ],
});

const businessFeatures = [
  {
    title: "Сегменты с постоянным теплопотреблением",
    text: "Чем более предсказуем спрос на тепло, тем понятнее экономическая модель проекта и тем сильнее ценность сайта как коммерческого инструмента.",
  },
  {
    title: "Отдельная подача для B2B",
    text: "Для бизнеса важны НДС, эксплуатация, масштабирование, контуры автоматики и управляемый расчёт, а не только визуально эффектный hero-блок.",
  },
  {
    title: "Масштабируемость по объектам и зонам",
    text: "Можно проектировать несколько зон нагрева, резервирование, каскадирование и разные сценарии сезонной или круглогодичной загрузки.",
  },
];

const businessCases = [
  {
    badge: "Сервис",
    title: "Гостиницы и базы отдыха",
    text: "Постоянный спрос на отопление, ГВС и сервисные зоны делает решение понятным и обсуждаемым на уровне коммерции объекта.",
  },
  {
    badge: "Агро",
    title: "Теплицы и фермы",
    text: "Полезное тепло, сезонность, масштабирование и сценарии распределения нагрузки по зонам делают агросегмент одним из самых перспективных.",
  },
  {
    badge: "Сервис",
    title: "СТО, мойки, сервисные площадки",
    text: "Коммерческие объекты с постоянной потребностью в тепле могут использовать систему как инженерный и операционный инструмент.",
  },
  {
    badge: "Цеха",
    title: "Производство и цеха",
    text: "Для производственных площадок мы смотрим на тепло как на элемент инфраструктуры, а не как на отдельную декоративную инновацию.",
  },
];

const businessSteps = [
  {
    title: "Анализ операционной нагрузки",
    text: "Смотрим часы работы, зоны теплопотребления, сезонность, резервирование и ограничения по электроэнергии.",
  },
  {
    title: "Коммерческий и инженерный сценарий",
    text: "Считаем полезное тепло, энергопотребление, роль в текущей инфраструктуре и потенциальный экономический эффект по сценариям.",
  },
  {
    title: "Подготовка к внедрению и масштабированию",
    text: "Проектируем систему так, чтобы её можно было развивать по зонам, новым объектам и дополнительным контурам тепла.",
  },
];

const relatedLinks = [
  {
    href: "/gpu-otoplenie",
    title: "GPU и техконтуры",
    text: "Если у бизнеса есть вычислительные мощности, отдельная страница про GPU помогает усилить этот сценарий.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Актуально для объектов, где уже есть высокая электрическая нагрузка и интерес к изменению структуры затрат.",
  },
  {
    href: "/kontakty",
    title: "Контакты и заявка",
    text: "Здесь можно перейти к обсуждению объекта, коммерческого предложения и инженерной проработки.",
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
            "Инженерные решения для гостиниц, теплиц, производственных площадок, сервисных объектов и бизнеса с постоянным спросом на полезное тепло.",
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
                <h1>Криптокотёл для коммерческих объектов и сценариев с полезным теплом</h1>
                <p>
                  Эта страница выстроена под B2B-логику: гостиницы, теплицы, фермы,
                  сервисные площадки, производство и бизнес, где полезное тепло можно
                  превратить в часть инфраструктуры, а не только в статью расходов.
                </p>
                <div className="page-hero__stats">
                  <article>
                    <strong>B2B-подача</strong>
                    <span>Отдельная логика для НДС, эксплуатации, контуров и масштабирования.</span>
                  </article>
                  <article>
                    <strong>Сильные сегменты</strong>
                    <span>Гостиницы, теплицы, сервис, производство и вычислительные контуры.</span>
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
              eyebrow="B2B-фокус"
              title="Мы усилили коммерческий сегмент, а не просто перенесли домашние смыслы на бизнес"
              description="У бизнеса другие вопросы: стабильность, НДС, объектная нагрузка, эксплуатация, сервис и масштабирование. Поэтому подача здесь выстроена как отдельный коммерческий маршрут."
            />
            <FeatureGrid items={businessFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Сегменты"
              title="Где бизнес-кейс особенно понятен"
              description="Чем стабильнее тепловая нагрузка и понятнее стоимость электроэнергии, тем легче вывести проект из разряда «интересная идея» в разряд операционного решения."
            />
            <FeatureGrid items={businessCases} columns={4} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как внедряем"
              title="B2B-маршрут от задачи к коммерческому предложению"
              description="Мы выстраиваем путь так, чтобы бизнес видел не только технологию, но и понятный способ принятия решения."
            />
            <StepsGrid items={businessSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные маршруты"
              title="Страницы, которые усиливают B2B-решение"
              description="Перелинковка здесь работает и на навигацию, и на SEO: отдельные страницы под GPU, электричество и контактный маршрут усиливают качество сайта как коммерческого продукта."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужен расчёт под гостиницу, теплицу, сервис или производство?"
              text="Оставьте вводные по объекту. Мы подготовим инженерный сценарий, посчитаем полезное тепло и соберём ориентир по нагрузке и экономике."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Запросить B2B-расчёт"
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
