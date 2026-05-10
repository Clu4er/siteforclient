import Image from "next/image";

import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PageCta } from "@/components/ui/page-cta";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { mediaAssets } from "@/lib/site-assets";
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Криптокотёл или газ: сравнение сценариев отопления",
  description:
    "Отдельная SEO-страница со сравнением криптокотла и газового отопления: где газ рационален, а где криптокотёл становится интересным инженерным и коммерческим решением.",
  path: "/sravnenie-s-gazom",
  keywords: [
    "криптокотёл или газ",
    "сравнение криптокотла с газом",
    "майнинг отопление против газа",
  ],
});

const gasInsights = [
  {
    title: "Газ остаётся сильным базовым сценарием",
    text: "Если на объект уже заведён газ и тариф прогнозируем, газовое отопление остаётся понятным, дешёвым и привычным решением.",
  },
  {
    title: "Криптокотёл не обязан «побеждать» газ в любой точке",
    text: "Честная коммерческая подача лучше работает на доверие. Мы усиливаем не универсальные обещания, а те сценарии, где решение действительно оправдано.",
  },
  {
    title: "Премиальный и технологичный сегмент",
    text: "На объектах, где важны статус, инженерная новизна, независимость и дополнительная цифровая функция, криптокотёл становится сильным отдельным продуктом.",
  },
];

const gasRows = [
  {
    criterion: "Базовая привычность",
    left: "Газ остаётся самым знакомым и понятным способом отопления для большинства домов и объектов.",
    right: "Криптокотёл требует объяснения логики, но даёт дополнительный слой ценности за пределами просто отопления.",
  },
  {
    criterion: "Что делает кВт·ч / ресурс",
    left: "Газ превращается в тепло и только в тепло.",
    right: "Электроэнергия превращается и в тепло, и в вычислительную работу в сети BTC.",
  },
  {
    criterion: "Имидж и технологичность",
    left: "Рациональный, но консервативный сценарий.",
    right: "Технологичный, статусный и нестандартный инженерный контур.",
  },
  {
    criterion: "Когда особенно интересно",
    left: "Когда газ уже подключён и объекту важна только себестоимость отопления.",
    right: "Когда владельцу важны гибкость, цифровая функция, премиальный образ и дополнительная экономическая логика.",
  },
];

const relatedLinks = [
  {
    href: "/sravnenie-s-elektrichestvom",
    title: "Сравнение с электричеством",
    text: "Если объект греется от сети, логика криптокотла часто становится ещё более предметной и вычислимой.",
  },
  {
    href: "/dlya-doma",
    title: "Страница для дома",
    text: "Отдельный маршрут для частных объектов с бассейнами, бойлерами, тёплым полом и гибридной интеграцией.",
  },
  {
    href: "/dlya-biznesa",
    title: "Страница для бизнеса",
    text: "Для коммерческих объектов, где тепловая нагрузка выше, а решение обсуждается на уровне операционной модели.",
  },
];

export default async function CompareGasPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/sravnenie-s-gazom");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "Сравнение криптокотла с газовым отоплением",
          description:
            "Коммерческое и инженерное сравнение газового отопления и криптокотла для дома и бизнеса.",
          path: "/sravnenie-s-gazom",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">Сравнение с газом</span>
                <h1>Газ против криптокотла: где сравнение честное, а где слишком упрощённое</h1>
                <p>
                  Отдельная SEO-страница нужна не ради красивого заголовка, а чтобы честно
                  объяснить рынок. Газ остаётся сильным базовым сценарием, но у
                  криптокотла есть свои зоны ценности, где «тепло + майнинг» обсуждаются
                  как отдельный продукт.
                </p>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.banner.src}
                  alt={mediaAssets.banner.alt}
                  width={mediaAssets.banner.width}
                  height={mediaAssets.banner.height}
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
              eyebrow="Что важно понимать"
              title="Эта страница усиливает доверие, потому что не продаёт универсальную сказку"
              description="Чем честнее сайт объясняет сильные и слабые стороны технологии, тем выше конверсия с осознанного трафика и тем лучше качество SEO-страницы в долгом горизонте."
            />
            <FeatureGrid items={gasInsights} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Таблица сравнения"
              title="Как отличается логика решений"
              description="Вместо поверхностного «лучше / хуже» мы оставили таблицу, которая помогает быстро увидеть разницу в инженерной и коммерческой постановке вопроса."
            />
            <ComparisonTable leftTitle="Газовое отопление" rightTitle="Криптокотёл" rows={gasRows} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные страницы"
              title="Где смотреть дальше"
              description="Обычно после этой страницы посетитель либо уходит в домашний или бизнес-сценарий, либо хочет сравнить решение с электрическим отоплением."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Нужно сравнение под конкретный объект?"
              text="Мы можем честно разобрать сценарий: что уже подключено, есть ли газ, сколько стоит кВт·ч и где криптокотёл становится действительно сильным решением."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Сравнить под мой объект"
              secondaryHref="/kalkulyator"
              secondaryLabel="Перейти в калькулятор"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="compare-gas"
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
