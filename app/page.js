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
    badge: "Для дома",
    href: "/home-heating",
    title: "Для дома, коттеджа и бассейна",
    text: "Сценарий для домовладельцев, которые хотят сократить чистые расходы на отопление и получить технологичный инженерный контур.",
  },
  {
    badge: "Для бизнеса",
    href: "/business-heating",
    title: "Для бизнеса с постоянным спросом на тепло",
    text: "Гостиницы, теплицы, сервисные зоны, фермы, СТО, цеха и любые объекты, где тепло работает круглый год или сезонно с высокой нагрузкой.",
  },
  {
    badge: "ГПУ",
    href: "/gpu",
    title: "ГПУ и вычислительное тепло",
    text: "Использование серверного и ГПУ-тепла для технических задач, ГВС, подогрева воздуха и водяных контуров.",
  },
  {
    badge: "Инженерия",
    href: "/engineering",
    title: "Для новых и существующих систем",
    text: "Мы проектируем гибридные контуры: криптокотёл может работать вместе с газовым, электрическим или резервным источником тепла.",
  },
];

const valueCards = [
  {
    title: "Тепло перестаёт быть только расходом",
    text: "Вместо модели «платим за кВт·ч и только греемся» объект получает тепло и вычислительную работу в сети BTC.",
  },
  {
    title: "Решение строится вокруг объекта, а не вокруг демо",
    text: "Мы считаем схему по нагрузке, существующему отоплению, стоимости кВт·ч, сезонности и сценариям использования тепла.",
  },
  {
    title: "Подходит для дома, бизнеса и вычислительных площадок",
    text: "Можно подобрать сценарий для частного дома, коммерческого объекта, ГПУ-площадки или гибридной инженерной схемы.",
  },
];

const sectorCards = [
  {
    badge: "Дом",
    title: "Коттедж, баня, тёплый пол",
    text: "Подходит для домов, где важны комфорт, управляемость и понятный расчёт затрат на отопление.",
  },
  {
    badge: "Теплица",
    title: "Аграрные и тепличные объекты",
    text: "Сильный сценарий для объектов, где полезное тепло востребовано по сезонам или стабильно в течение всего года.",
  },
  {
    badge: "Сервис",
    title: "Гостиницы, базы отдыха, бассейны",
    text: "Постоянный спрос на ГВС и отопление делает модель особенно интересной для коммерческих объектов сервиса.",
  },
  {
    badge: "ГПУ",
    title: "ИИ, рендер, серверные контуры",
    text: "ГПУ-фермы и вычислительные узлы можно интегрировать в отдельный контур утилизации тепла под задачи бизнеса.",
  },
];

const implementationSteps = [
  {
    title: "Аудит объекта и вводных",
    text: "Собираем данные по площади, контурам отопления, стоимости электроэнергии, сезонности и текущей схеме теплопотребления.",
  },
  {
    title: "Тепловой и финансовый сценарий",
    text: "Считаем хешрейт, энергопотребление, полезное тепло и диапазон экономического результата без обещаний и без искусственных цифр.",
  },
  {
    title: "Подбор оборудования и схемы передачи тепла",
    text: "Определяем оборудование, способ охлаждения, буферные ёмкости, насосные группы, автоматику и резервные источники.",
  },
  {
    title: "Запуск и сопровождение",
    text: "Готовим проект к запуску, прописываем режимы работы и закладываем основу под масштабирование системы.",
  },
];

const comparePreviewLinks = [
  {
    href: "/gas-heating-comparison",
    title: "Сравнение с газом",
    text: "Показываем, где криптокотёл дополняет газовый контур, снижает чистую стоимость тепла и где газ остаётся базовым источником.",
  },
  {
    href: "/electric-heating-comparison",
    title: "Сравнение с электричеством",
    text: "Если объект уже греется от сети, криптокотёл помогает превратить часть затрат на кВт·ч в тепло плюс цифровой актив.",
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
];

export default async function HomePage() {
  const content = await getSiteContent();
  const faqPreview = content.faq.slice(0, 4);

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
                Отопление, которое не только{" "}
                <span className="text-highlight">греет</span>, но и создаёт{" "}
                <span className="text-highlight">цифровой актив</span>
              </span>
              <h1>
                Криптокотлы для <span className="text-highlight">дома</span>,{" "}
                <span className="text-highlight">бизнеса</span> и объектов с
                постоянным спросом на тепло
              </h1>
              <p>
                Проектируем системы, где{" "}
                <span className="text-highlight">тепло + майнинг</span> работают
                как единый инженерный контур: объект получает отопление, ГВС и
                сценарий экономики на базе{" "}
                <span className="text-highlight">BTC</span>.
              </p>

              <div className="hero-copy__actions">
                <Link className="btn btn--primary" href="/contacts#lead-form">
                  {content.hero.primaryCta}
                </Link>
                <Link className="btn btn--ghost" href="/calculator">
                  {content.hero.secondaryCta}
                </Link>
              </div>

              <div className="hero-route-cards">
                <Link className="link-card" href="/home-heating">
                  <strong>Для дома</strong>
                  <p>Коттеджи, тёплые полы, бассейны, баня и частный комфорт.</p>
                </Link>
                <Link className="link-card" href="/business-heating">
                  <strong>Для бизнеса</strong>
                  <p>Гостиницы, теплицы, фермы, сервис и коммерческие объекты.</p>
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
                  sizes="240px"
                />
              </div>
              <div className="hero-stage__floating hero-stage__floating--bottom">
                <Image
                  src={mediaAssets.greenMining.src}
                  alt={mediaAssets.greenMining.alt}
                  width={mediaAssets.greenMining.width}
                  height={mediaAssets.greenMining.height}
                  sizes="240px"
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
                <strong>Дом и бизнес</strong>
                <span>Подбираем решение и для частных, и для коммерческих объектов.</span>
              </article>
              <article>
                <strong>Гибридный подход</strong>
                <span>Работа вместе с газом, электричеством или резервным источником.</span>
              </article>
              <article>
                <strong>Не демо, а внедрение</strong>
                <span>Считаем объект, нагрузку, контуры и коммерческий сценарий.</span>
              </article>
              <article>
                <strong>Экономика в рублях</strong>
                <span>Показываем выручку, затраты, полезное тепло и итог за день, месяц и год.</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Кому подходит"
              title={
                <>
                  Одна идея для нескольких сегментов:{" "}
                  <span className="text-highlight">тепло + майнинг</span>
                </>
              }
              description="Дом, бизнес, ГПУ и инженерные контуры собраны в одной продуктовой логике, но ведут пользователя в свой сценарий без лишнего шума."
            />
            <FeatureGrid items={audienceCards} columns={4} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Ключевая логика"
              title={
                <>
                  Почему <span className="text-highlight">криптокотёл</span>{" "}
                  считают как инженерный сценарий, а не как экзотику
                </>
              }
              description="Если у объекта есть постоянный спрос на тепло, модель «тепло + вычисления» превращается в предмет расчёта по нагрузке, тарифу и роли тепла в системе."
            />
            <FeatureGrid items={valueCards} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как это работает"
              title="Схема подключения криптокотла к отоплению"
              description="На схеме видно базовый принцип: оборудование создаёт тепло, теплообменник передаёт его в систему, а дальше оно расходится туда, где нужно объекту."
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
                    Майнер работает как источник тепла, а не как отдельная
                    коробка, которая просто греет воздух.
                  </li>
                  <li>
                    Насос и теплообменник передают тепло в водяной контур без
                    смешивания рабочих сред.
                  </li>
                  <li>
                    Котёл, буфер, манометр и расширительный бак помогают
                    держать систему управляемой и безопасной.
                  </li>
                  <li>
                    Тепло можно направить в дом, бассейн, теплицу, ГВС или
                    другой контур объекта.
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
                eyebrow="Сравнение сценариев"
                title={
                  <>
                    Простое сравнение с{" "}
                    <span className="text-highlight">газом</span> и{" "}
                    <span className="text-highlight">электричеством</span>
                  </>
                }
                description="Сравнение помогает быстрее понять, где криптокотёл уместен, а где привычный источник тепла остаётся лучшим вариантом."
              />
            </div>
            <RelatedLinks items={comparePreviewLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Сценарии использования"
              title="Коммерческие и частные объекты, где у тепла есть понятная задача"
              description="Чем стабильнее объекту нужно тепло, тем проще посчитать сценарий и честно обсудить пользу решения."
            />
            <FeatureGrid items={sectorCards} columns={4} />
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
              eyebrow="Как внедряем"
              title="Проектный путь от вводных до запуска"
              description="Идём по шагам: собираем вводные, считаем нагрузку, подбираем схему и только потом обсуждаем запуск."
            />
            <StepsGrid items={implementationSteps} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="FAQ"
              title="Вопросы, которые возникают до расчёта"
              description="Коротко отвечаем на вопросы, которые обычно появляются до заявки: интеграция, шум, сезонность, электричество и расчёт."
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
              text="Оставьте заявку. Мы вернёмся с расчётом по объекту, предложим сценарий интеграции и подскажем, где криптокотёл действительно работает лучше классического отопления."
              primaryHref="/contacts#lead-form"
              primaryLabel="Оставить заявку"
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
              subtitle={content.leadForm.subtitle}
              buttonLabel={content.leadForm.buttonLabel}
            />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
