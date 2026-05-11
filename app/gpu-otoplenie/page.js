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
  title: "GPU и серверное тепло — как использовать тепло от оборудования",
  description:
    "GPU, серверы и рендер-фермы сильно греются. Это тепло можно направить в воду, воздух, отопление или технические задачи.",
  path: "/gpu-otoplenie",
  keywords: [
    "GPU отопление",
    "тепло от GPU",
    "AI ферма отопление",
    "серверное тепло",
  ],
});

const gpuFeatures = [
  {
    title: "Оборудование уже выделяет тепло",
    text: "GPU, серверы и рендер-станции нагреваются во время работы. Вместо того чтобы выбрасывать это тепло, его можно использовать.",
  },
  {
    title: "Подходит для AI, рендера и серверных",
    text: "Если оборудование работает регулярно, можно считать не только охлаждение, но и пользу от полученного тепла.",
  },
  {
    title: "Тепло можно направить в дело",
    text: "Его можно использовать для воды, воздуха, помещений или технологических задач, если это не мешает работе оборудования.",
  },
];

const gpuUseCases = [
  {
    badge: "AI",
    title: "AI и ML-задачи",
    text: "GPU считают задачи и нагреваются. Это тепло можно попробовать вернуть в воду, воздух или помещения.",
  },
  {
    badge: "Рендер",
    title: "Рендер и медиапроизводство",
    text: "Рендер-станции и фермы часто работают долго. Их тепло может стать дополнительной пользой для объекта.",
  },
  {
    badge: "Серверы",
    title: "Серверные и техпомещения",
    text: "Если оборудование нужно охлаждать каждый день, стоит проверить, можно ли часть тепла использовать рядом.",
  },
];

const gpuSteps = [
  {
    title: "Понимаем, где появляется тепло",
    text: "Смотрим, какое оборудование греется, как долго оно работает и сколько тепла можно забрать без риска.",
  },
  {
    title: "Смотрим, куда его направить",
    text: "Проверяем, есть ли рядом вода, воздух, помещения или другая задача, где это тепло действительно нужно.",
  },
  {
    title: "Считаем масштаб",
    text: "Если парк оборудования растёт, система отвода тепла должна расти вместе с ним и оставаться понятной в обслуживании.",
  },
];

const relatedLinks = [
  {
    href: "/dlya-biznesa",
    title: "Страница для бизнеса",
    text: "GPU обычно рассматривают вместе с задачами бизнеса: помещениями, водой, вентиляцией и затратами.",
  },
  {
    href: "/kalkulyator",
    title: "Калькулятор",
    text: "Быстрый расчёт помогает оценить мощность, электричество и примерное количество тепла.",
  },
  {
    href: "/kontakty",
    title: "Контакты",
    text: "Если оборудование уже работает, отправьте вводные: что греется, сколько часов и куда можно направить тепло.",
  },
];

export default async function GpuHeatingPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/gpu-otoplenie");

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={createServiceSchema({
          name: "GPU и использование серверного тепла",
          description:
            "Использование тепла от GPU, AI и серверного оборудования для воды, воздуха, помещений и технических задач.",
          path: "/gpu-otoplenie",
          providerName: content.company.name,
        })}
      />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__grid">
              <div className="page-hero__copy">
                <span className="eyebrow">GPU и серверное тепло</span>
                <h1>Серверы и GPU греются. Это тепло можно использовать</h1>
                <p>
                  GPU, серверы и рендер-фермы сильно нагреваются во время работы. Обычно
                  это тепло просто выводят наружу. Мы помогаем понять, можно ли направить
                  его в воду, воздух, отопление или полезную задачу на объекте.
                </p>
              </div>

              <div className="page-hero__media">
                <Image
                  src={mediaAssets.unitInside.src}
                  alt={mediaAssets.unitInside.alt}
                  width={mediaAssets.unitInside.width}
                  height={mediaAssets.unitInside.height}
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
              eyebrow="Когда есть смысл"
              title="Если оборудование уже греется, тепло можно не выбрасывать"
              description="Сначала важно понять простую вещь: оборудование должно работать регулярно, а рядом должна быть задача, где тепло действительно нужно."
            />
            <FeatureGrid items={gpuFeatures} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Где использовать"
              title="Куда можно направить тепло от GPU"
              description="Подходит не каждый объект. Считаем только там, где тепло можно использовать без вреда для оборудования и процесса."
            />
            <FeatureGrid items={gpuUseCases} columns={3} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Как подходим"
              title="Сначала проверяем пользу, потом предлагаем решение"
              description="Главное правило: отвод тепла не должен мешать работе GPU. Поэтому сначала считаем и только потом обсуждаем подключение."
            />
            <StepsGrid items={gpuSteps} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Связанные страницы"
              title="Что ещё посмотреть"
              description="После этой страницы можно перейти к бизнес-задаче, быстрому расчёту или сразу отправить вводные."
            />
            <RelatedLinks items={relatedLinks} />
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <PageCta
              title="Есть серверная, GPU или рендер-ферма?"
              text="Опишите оборудование, режим работы и куда потенциально можно направить тепло. Мы подскажем, есть ли смысл считать решение подробнее."
              primaryHref="/kontakty#lead-form"
              primaryLabel="Обсудить тепло от GPU"
              secondaryHref="/dlya-biznesa"
              secondaryLabel="Перейти к бизнесу"
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <LeadForm
              source="gpu"
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
