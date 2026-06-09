import Image from "next/image";
import Link from "next/link";

import { MiningHeatCalculator } from "@/components/calculator/mining-heat-calculator";
import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PageCta } from "@/components/ui/page-cta";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepsGrid } from "@/components/ui/steps-grid";
import { UseCasesGallery } from "@/components/use-cases/use-cases-gallery";
import { getSiteContent } from "@/lib/cms";
import { mediaAssets } from "@/lib/site-assets";
import { buildMetadata, createFaqSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Криптокотлы и отопление на базе майнинга для дома и бизнеса",
  description:
    "Проектируем и внедряем криптокотлы: тепло для дома, бизнеса, бассейнов, теплиц и технологических контуров плюс участие оборудования в сети BTC.",
  path: "/",
  keywords: [
    "криптокотёл для дома",
    "криптокотёл для бизнеса",
    "майнинг отопление",
    "утилизация тепла BTC",
  ],
});

const audienceCards = [
  {
    badge: "Дом",
    href: "/home-heating",
    title: "Частные дома и коттеджи",
    text: "Решение для объектов, где нужно отопление, ГВС, тёплый пол, баня или стабильный бытовой комфорт.",
  },
  {
    badge: "Тепло",
    href: "/home-heating",
    title: "Бассейны и теплицы",
    text: "Подходит для контуров, где тепло требуется регулярно: подогрев воды, тепличные комплексы и сезонные нагрузки.",
  },
  {
    badge: "Сервис",
    href: "/business-heating",
    title: "Гостиницы, кафе и базы отдыха",
    text: "Сценарий для коммерческих объектов с потребностью в отоплении, горячей воде и понятной тепловой нагрузке.",
  },
  {
    badge: "Бизнес",
    href: "/business-heating",
    title: "СТО, автомойки, производство",
    text: "Вариант для сервисных, торговых и производственных помещений с постоянной или сезонной потребностью в тепле.",
  },
];

const miningTerms = [
  {
    badge: "Майнинг",
    title: "Добыча Биткоина",
    text: "Специальное оборудование выполняет вычисления, поддерживает сеть Биткоин и получает вознаграждение пропорционально вкладу.",
  },
  {
    badge: "Асик",
    title: "Оборудование для вычислений",
    text: "Асик-майнер потребляет электроэнергию, работает с высоким хешрейтом и во время работы выделяет большое количество тепла.",
  },
  {
    badge: "Блокчейн",
    title: "Глобальная сеть",
    text: "Множество устройств по всему миру работают вместе и поддерживают сеть Биткоин.",
  },
  {
    badge: "Тепло",
    title: "Побочный продукт становится полезным",
    text: "Вместо простого охлаждения оборудования тепло можно направить в отопление дома, бассейна, теплицы или коммерческого объекта.",
  },
];

const valueCards = [
  {
    title: "1. Выделение тепла",
    text: "Асик-майнер во время работы преобразует почти всю потребляемую электроэнергию в тепло. Эту энергию можно использовать для отопления.",
  },
  {
    title: "2. Передача энергии",
    text: "Тепло от оборудования передаётся через систему охлаждения в теплообменник, где нагревается теплоноситель для отопительного контура.",
  },
  {
    title: "3. Распределение тепла",
    text: "Насос прокачивает нагретый теплоноситель по радиаторам, тёплому полу, бассейну, теплице или другим потребителям.",
  },
];

const sectorCards = [
  {
    badge: "Контур",
    title: "Радиаторы и тёплый пол",
    text: "Нагретый теплоноситель можно направить в действующий отопительный контур дома или коммерческого объекта.",
  },
  {
    badge: "Вода",
    title: "Бассейн и ГВС",
    text: "Тепло может использоваться для подогрева бассейна, бойлера, горячей воды или отдельного водяного теплообменника.",
  },
  {
    badge: "Агро",
    title: "Теплица и тепличное хозяйство",
    text: "Для теплиц важны регулярная тепловая нагрузка, сезонность и возможность использовать тепло в понятном режиме.",
  },
  {
    badge: "Бизнес",
    title: "Производственные помещения",
    text: "Криптокотёл можно рассматривать для цехов, складов, торговых площадей, СТО и других объектов с отоплением.",
  },
];

const implementationSteps = [
  {
    title: "Осмотр объекта",
    text: "Собираем данные по площади, контурам отопления, стоимости электроэнергии, сезонности и текущей схеме теплопотребления.",
  },
  {
    title: "Подбор оборудования",
    text: "Подбираем оборудование и схему подключения под вашу задачу: отопление дома, теплицы, бассейна, производственного или коммерческого помещения.",
  },
  {
    title: "Монтаж и запуск",
    text: "Подключаем криптокотёл к системе отопления, проверяем работу оборудования и объясняем, как пользоваться системой.",
  },
];

const comparePreviewLinks = [
  {
    href: "/electric-heating-comparison",
    title: "Сравнение с электричеством",
    text: "Если объект уже греется от сети, криптокотёл помогает превратить часть затрат на кВт·ч в тепло плюс доход от вычислительной работы.",
  },
];

const relatedLinks = [
  {
    href: "/home-heating",
    title: "Криптокотёл для дома",
    text: "Решения для домовладельцев, тёплых полов, бассейнов и частных объектов.",
  },
  {
    href: "/business-heating",
    title: "Криптокотёл для бизнеса",
    text: "Отели, теплицы, сервис, производство, коммерческие объекты и масштабируемые контуры тепла.",
  },
  {
    href: "/gpu",
    title: "ГПУ и утилизация тепла",
    text: "Сценарии для вычислительных площадок, ИИ-контуров и серверной утилизации тепла.",
  },
  {
    href: "/engineering",
    title: "Инженерия",
    text: "Подключение к существующему отоплению, автоматика, резерв и гибридные схемы.",
  },
  {
    href: "/bearings",
    title: "Оптовые поставки подшипников",
    text: "Также компания занимается поставками подшипников для производственных и сервисных задач.",
  },
];

export default async function HomePage() {
  const content = await getSiteContent();
  const faqPreview = content.faq;

  return (
    <MarketingShell content={content}>
      <JsonLd
        data={createServiceSchema({
          name: "Криптокотлы и отопление на базе майнинга",
          description:
            "Инженерные решения для дома, бизнеса и объектов с постоянным спросом на тепло: отопление, ГВС, бассейн, теплица и технологические контуры.",
          path: "/",
          providerName: content.company.name,
        })}
      />
      <JsonLd data={createFaqSchema(faqPreview)} />

      <main>
        <section className="hero-home">
          <div className="shell hero-home__grid">
            <div className="hero-copy">
              <span className="eyebrow">
                Криптокотёл: <span className="text-highlight">тепло от майнинга</span>{" "}
                для отопления объектов
              </span>
              <h1>
                Криптокотлы для <span className="text-highlight">дома</span>,{" "}
                <span className="text-highlight">теплицы</span>, бассейна и бизнеса
              </h1>
              <p>
                Асик-майнер выделяет тепло во время добычи Биткоина. Мы помогаем
                направить эту энергию в отопительный контур, чтобы объект получал
                тепло, а оборудование продолжало выполнять вычислительную работу в сети{" "}
                <span className="text-highlight">BTC</span>.
              </p>

              <div className="hero-copy__actions">
                <Link className="btn btn--primary" href="/contacts">
                  {content.hero.primaryCta}
                </Link>
                <Link className="btn btn--ghost" href="/calculator">
                  {content.hero.secondaryCta}
                </Link>
              </div>

              <div className="hero-route-cards">
                <Link className="link-card" href="/home-heating">
                  <strong>Для дома</strong>
                  <p>Частный дом, коттедж, тёплый пол, бассейн и бытовые контуры.</p>
                </Link>
                <Link className="link-card" href="/business-heating">
                  <strong>Для бизнеса</strong>
                  <p>Гостиницы, теплицы, СТО, производство и коммерческие объекты.</p>
                </Link>
              </div>
            </div>

            <div className="hero-stage">
              <div className="hero-stage__main">
                <Image
                  src={mediaAssets.houseIllustration.src}
                  alt={mediaAssets.houseIllustration.alt}
                  width={mediaAssets.houseIllustration.width}
                  height={mediaAssets.houseIllustration.height}
                  priority
                  sizes="(max-width: 960px) 100vw, 42vw"
                />
              </div>
              <div className="hero-stage__floating hero-stage__floating--top">
                <Image
                  src={mediaAssets.homeDisplay.src}
                  alt={mediaAssets.homeDisplay.alt}
                  width={mediaAssets.homeDisplay.width}
                  height={mediaAssets.homeDisplay.height}
                  quality={95}
                  sizes="(max-width: 639px) calc(100vw - 40px), 20rem"
                />
              </div>
              <div className="hero-stage__floating hero-stage__floating--bottom">
                <Image
                  src={mediaAssets.greenMining.src}
                  alt={mediaAssets.greenMining.alt}
                  width={mediaAssets.greenMining.width}
                  height={mediaAssets.greenMining.height}
                  quality={95}
                  sizes="(max-width: 639px) calc(100vw - 40px), 20rem"
                />
              </div>
              <div className="metric-pill metric-pill--left">
                <strong>2 в 1</strong>
                <span>тепло + участие в сети BTC</span>
              </div>
              <div className="metric-pill metric-pill--right">
                <strong>до 95%</strong>
                <span>электроэнергии становится теплом</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="stat-strip">
              <article>
                <strong>Майнинг</strong>
                <span>Добыча Биткоина с помощью специального оборудования.</span>
              </article>
              <article>
                <strong>Асик</strong>
                <span>Устройство, которое выполняет вычисления и выделяет тепло.</span>
              </article>
              <article>
                <strong>Хешрейт</strong>
                <span>Мощность асика и его вклад в сеть Биткоин.</span>
              </article>
              <article>
                <strong>Криптокотёл</strong>
                <span>Решение, которое даёт тепло и использует оборудование для майнинга.</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Что это такое"
              title={
                <>
                  Что такое майнинг и зачем здесь{" "}
                  <span className="text-highlight">отопление</span>
                </>
              }
              description="Майнинг можно представить как большую вычислительную систему: множество асиков по всему миру поддерживают сеть Биткоин, а вознаграждение распределяется пропорционально вкладу оборудования."
            />
            <div className="intro-copy-grid">
              <div className="intro-copy">
                <p>
                  Наверняка вы слышали слово «майнинг» и знаете, что на этом можно
                  зарабатывать. Здесь объясняем простыми словами, как добыча Биткоина
                  связана с отоплением.
                </p>
                <p>
                  Во время работы асики сильно нагреваются. Обычно это тепло нужно
                  просто отводить, но его можно использовать с пользой: направлять в
                  систему отопления дома, теплицы, бассейна или коммерческого объекта.
                </p>
                <p>
                  Криптокотёл помогает получать тепло и одновременно использовать
                  оборудование для майнинга. Вместо отдельного нагревателя объект
                  получает инженерный контур, где электрическая энергия работает дважды:
                  даёт тепло и вычислительную работу.
                </p>
              </div>
              <FeatureGrid items={miningTerms} />
            </div>
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Принцип работы"
              title={
                <>
                  Работу <span className="text-highlight">криптокотла</span>{" "}
                  можно разделить на три этапа
                </>
              }
              description="Оборудование выделяет тепло, теплообменник передаёт энергию теплоносителю, а насос распределяет её по отопительным контурам объекта."
            />
            <FeatureGrid items={valueCards} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Схема применения"
              title="Схема сфер применения криптокотла"
              description="Отдельная схема показывает, куда может уходить полезное тепло: дом, бассейн, теплица, сервисные и производственные объекты."
            />
            <figure className="application-scheme">
              <Image
                src={mediaAssets.applicationScheme.src}
                alt={mediaAssets.applicationScheme.alt}
                width={mediaAssets.applicationScheme.width}
                height={mediaAssets.applicationScheme.height}
                sizes="(max-width: 1180px) 100vw, 1180px"
              />
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <UseCasesGallery />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как это работает"
              title="Схема подключения криптокотла к отоплению"
              description="Криптокотёл подключается к отопительному контуру объекта и передаёт тепло в систему через теплоноситель. Конфигурация подбирается индивидуально под площадь, существующую схему, тариф и режим работы."
            />

            <div className="connection-schema">
              <figure className="connection-schema__media">
                <Image
                  src={mediaAssets.connectionSchema.src}
                  alt={mediaAssets.connectionSchema.alt}
                  width={mediaAssets.connectionSchema.width}
                  height={mediaAssets.connectionSchema.height}
                  sizes="(max-width: 1180px) 100vw, 62vw"
                />
              </figure>

              <div className="connection-schema__content">
                <h3>Что показывает схема</h3>
                <ul>
                  <li>
                    Нагретый теплоноситель может использоваться для радиаторов,
                    тёплого пола, бассейна, теплицы и технологических контуров.
                  </li>
                  <li>
                    Насос прокачивает теплоноситель по системе отопления и возвращает
                    его к источнику нагрева после отдачи тепла.
                  </li>
                  <li>
                    Теплообменник передаёт энергию в водяной контур без смешивания
                    рабочих сред.
                  </li>
                  <li>
                    Манометр, расширительный бак и буферные элементы помогают держать
                    систему управляемой и безопасной.
                  </li>
                </ul>
                <div className="connection-schema__actions">
                  <Link className="btn btn--primary" href="/calculator">
                    Посчитать свой объект
                  </Link>
                  <Link className="btn btn--ghost" href="/engineering">
                    Посмотреть инженерию
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell split-section">
            <div>
              <SectionHeading
                eyebrow="Сравнение"
                title={
                  <>
                    Чем криптокотёл отличается от{" "}
                    <span className="text-highlight">электрического котла</span>
                  </>
                }
                description="Обычный электрический котёл превращает электроэнергию только в тепло. Криптокотёл использует ту же энергию так, чтобы объект получал тепло, а оборудование выполняло вычислительную работу в сети Биткоин."
              />
            </div>
            <RelatedLinks items={comparePreviewLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Тепловые контуры"
              title="Куда можно направить нагретый теплоноситель"
              description="Система проектируется под конкретный объект: учитываются площадь, текущая схема отопления, сезонность, стоимость электроэнергии и желаемый режим работы оборудования."
            />
            <FeatureGrid items={sectorCards} columns={4} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Для каких объектов"
              title="Подходит для коммерческих и частных объектов"
              description="Особенно актуально там, где тепло нужно регулярно: дома, теплицы, бассейны, гостиницы, базы отдыха, производственные помещения, торговые площади, СТО и автомойки."
            />
            <FeatureGrid items={audienceCards} columns={4} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell calculator-layout calculator-layout--single">
            <MiningHeatCalculator defaults={content.calculatorDefaults} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как мы работаем"
              title="От осмотра объекта до монтажа и запуска"
              description="Сначала собираем вводные и оцениваем текущую систему, затем подбираем оборудование и схему подключения, после этого выполняем монтаж, проверку и запуск."
            />
            <StepsGrid items={implementationSteps} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="FAQ"
              title="Вопросы, которые возникают до расчёта"
              description="Коротко отвечаем на вопросы, которые обычно появляются до обращения: интеграция, шум, сезонность, электричество и расчёт."
            />
            <div className="faq-preview">
              {faqPreview.map((item) => (
                <article className="faq-preview__item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
            <div className="section-actions">
              <Link className="btn btn--ghost" href="/faq">
                Открыть полный FAQ
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда перейти дальше"
              title="Выберите сценарий под свой объект"
              description="Если вы уже понимаете задачу, переходите сразу в страницу для дома, бизнеса, ГПУ или инженерной схемы."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите посчитать дом, гостиницу, теплицу или технический контур?"
              text="Свяжитесь с нами. Мы обсудим вводные по объекту, предложим сценарий интеграции и подскажем, где криптокотёл действительно работает лучше классического отопления."
              primaryHref="/contacts"
              primaryLabel="Связаться"
              secondaryHref="/calculator"
              secondaryLabel="Сначала открыть калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="home"
              title={content.leadForm.title}
              subtitle="Позвоните, напишите на email или откройте Telegram. Быстро обсудим объект, вводные по теплу и следующий шаг."
              buttonLabel={content.leadForm.buttonLabel}
              contactInfo={content.company}
            />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
