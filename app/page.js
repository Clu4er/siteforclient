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
  title: "Криптокотлы для отопления — тепло и майнинг",
  description:
    "Майнер добывает биткоин и выделяет тепло. Мы направляем это тепло в дом, бассейн, теплицу или бизнес и считаем выгоду под ваш объект.",
  path: "/",
  keywords: [
    "криптокотёл для дома",
    "криптокотёл для бизнеса",
    "майнинг отопление",
    "тепло от майнинга BTC",
  ],
});

const audienceCards = [
  {
    badge: "Дом",
    title: "Для дома, коттеджа и бассейна",
    text: "Майнер греется во время работы. Это тепло можно отправить в отопление, тёплый пол, бойлер или бассейн.",
  },
  {
    badge: "Бизнес",
    title: "Для мест, где тепло нужно каждый день",
    text: "Гостиницы, теплицы, СТО, фермы и производства могут получать тепло и параллельно доход от майнинга.",
  },
  {
    badge: "GPU",
    title: "Для серверных и GPU",
    text: "Если оборудование уже работает и нагревается, это тепло можно использовать для воды, воздуха или помещений.",
  },
  {
    badge: "Отопление",
    title: "Можно добавить к текущей системе",
    text: "Криптокотёл не обязательно заменяет газ или электрокотёл. Часто он работает рядом с ними.",
  },
];

const valueCards = [
  {
    title: "Электричество работает на две задачи",
    text: "Обычный котёл просто греет. Криптокотёл греет и помогает добывать биткоин.",
  },
  {
    title: "Сначала считаем, потом предлагаем",
    text: "Мы смотрим тариф, объект, нужное тепло и оборудование. Без обещаний фиксированной прибыли.",
  },
  {
    title: "Подходит не всем, и это нормально",
    text: "Лучше всего работает там, где тепло нужно часто: дом, бассейн, теплица, гостиница или сервис.",
  },
];

const sectorCards = [
  {
    badge: "Дом",
    title: "Коттедж, баня, тёплый пол",
    text: "Для дома, где хочется греться и понимать, сколько реально стоит тепло.",
  },
  {
    badge: "Теплица",
    title: "Аграрные и тепличные объекты",
    text: "Теплицам тепло нужно регулярно, поэтому там проще считать пользу от системы.",
  },
  {
    badge: "Сервис",
    title: "Гостиницы, базы отдыха, бассейны",
    text: "Вода, номера и общие зоны требуют тепла каждый день. Это хороший вариант для расчёта.",
  },
  {
    badge: "GPU",
    title: "AI, рендер, серверные",
    text: "Если серверы уже нагреваются, тепло можно не выбрасывать, а использовать с пользой.",
  },
];

const implementationSteps = [
  {
    title: "Понимаем ваш объект",
    text: "Смотрим площадь, текущий котёл, тариф на электричество, бассейн, теплицу или другие потребители тепла.",
  },
  {
    title: "Считаем тепло и деньги",
    text: "Показываем примерный доход от майнинга, расход на электричество и сколько тепла можно использовать.",
  },
  {
    title: "Подбираем решение",
    text: "Выбираем оборудование и способ подключения так, чтобы система была понятной в эксплуатации.",
  },
  {
    title: "Помогаем с запуском",
    text: "Объясняем режимы работы, что смотреть в первые недели и как расширять систему дальше.",
  },
];

const comparePreviewLinks = [
  {
    href: "/sravnenie-s-gazom",
    title: "Сравнение с газом",
    text: "Газ просто греет. Криптокотёл может греть и параллельно майнить. Сравним, где это уместно.",
  },
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Электрокотёл даёт только тепло. Криптокотёл даёт тепло и возможный доход от BTC.",
  },
];

const relatedLinks = [
  {
    href: "/dlya-doma",
    title: "Криптокотёл для дома",
    text: "Отдельная страница для домовладельцев, тёплых полов, бассейнов и частных объектов.",
  },
  {
    href: "/dlya-biznesa",
    title: "Криптокотёл для бизнеса",
    text: "Отели, теплицы, сервис, производство, коммерческие объекты и понятные системы тепла.",
  },
  {
    href: "/gpu-otoplenie",
    title: "GPU и тепло",
    text: "Как использовать тепло от серверов, GPU и другого горячего оборудования.",
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
            "Майнер добывает биткоин и отдаёт тепло в отопление дома, бассейна, теплицы или бизнес-объекта.",
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
                <span className="text-highlight">доход</span>
              </span>
              <h1>
                Майнинг даёт <span className="text-highlight">тепло</span>. Тепло
                греет дом. BTC может приносить{" "}
                <span className="text-highlight">доход</span>
              </h1>
              <p>
                Майнер работает, добывает биткоин и сильно нагревается. Обычно это
                тепло выбрасывают. Мы предлагаем направить его в отопление дома,
                бассейна, теплицы или бизнеса.
              </p>

              <div className="hero-copy__actions">
                <Link className="btn btn--primary" href="/kontakty#lead-form">
                  {content.hero.primaryCta}
                </Link>
                <Link className="btn btn--ghost" href="/kalkulyator">
                  {content.hero.secondaryCta}
                </Link>
              </div>

              <div className="hero-route-cards">
                <Link className="link-card" href="/dlya-doma">
                  <strong>Для дома</strong>
                  <p>Коттедж, тёплый пол, бассейн, баня и горячая вода.</p>
                </Link>
                <Link className="link-card" href="/dlya-biznesa">
                  <strong>Для бизнеса</strong>
                  <p>Гостиницы, теплицы, СТО, фермы, производство и сервис.</p>
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
                <span>тепло + майнинг BTC</span>
              </div>
              <div className="metric-pill metric-pill--right">
                <strong>до 96%</strong>
                <span>энергии может стать теплом</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="stat-strip">
              <article>
                <strong>Дом и бизнес</strong>
                <span>Решение можно считать для частного и коммерческого объекта.</span>
              </article>
              <article>
                <strong>Гибридный подход</strong>
                <span>Можно подключать вместе с газом или электрокотлом.</span>
              </article>
              <article>
                <strong>Сначала расчёт</strong>
                <span>Проверяем тариф, мощность, тепло и примерный итог.</span>
              </article>
              <article>
                <strong>Экономика в рублях</strong>
                <span>Показываем доход, расход на свет и ориентир за месяц.</span>
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
                  Где можно использовать{" "}
                  <span className="text-highlight">тепло + майнинг</span>
                </>
              }
              description="Идея простая: оборудование майнит, выделяет тепло, а вы используете это тепло там, где оно действительно нужно."
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
                  может быть выгоднее обычного отопления
                </>
              }
              description="Обычный котёл только греет. Криптокотёл греет и параллельно майнит. Поэтому важно считать не только расход на свет, но и возможный доход."
            />
            <FeatureGrid items={valueCards} />
          </div>
        </section>

        <section className="section">
          <div className="shell split-section">
            <div>
              <SectionHeading
                eyebrow="Сравнение сценариев"
                title={
                  <>
                    Сравните с{" "}
                    <span className="text-highlight">газом</span> и{" "}
                    <span className="text-highlight">электричеством</span>
                  </>
                }
                description="Газ и электричество знакомы всем. Поэтому мы объясняем разницу простыми словами и показываем, где криптокотёл уместен."
              />
            </div>
            <RelatedLinks items={comparePreviewLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Где использовать"
              title="Лучше всего там, где тепло нужно часто"
              description="Чем чаще объекту нужно тепло, тем проще посчитать пользу: дом, бассейн, теплица, гостиница, сервис или производство."
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
              title="Как мы двигаемся от идеи к расчёту"
              description="Сначала разбираем вашу ситуацию, потом считаем цифры и только после этого предлагаем решение."
            />
            <StepsGrid items={implementationSteps} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="FAQ"
              title="Простые ответы перед первым разговором"
              description="Без сложной теории: что такое криптокотёл, откуда доход, можно ли греть дом и от чего зависит итог."
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
                Смотреть все вопросы
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Куда дальше"
              title="Выберите, что вам ближе"
              description="Если хотите быстрее понять выгоду, начните со страницы под вашу задачу: дом, бизнес, электричество, газ или GPU."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Хотите понять, есть ли выгода в вашем случае?"
              text="Опишите объект и тариф на электричество. Мы посчитаем, сколько тепла можно получить и какой ориентир по доходу даёт майнинг."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Обсудить мой объект"
              secondaryHref="/kalkulyator"
              secondaryLabel="Посчитать самому"
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
