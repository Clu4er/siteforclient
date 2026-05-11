import Link from "next/link";

import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createOrganizationSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Контакты — расчёт криптокотла для дома или бизнеса",
  description:
    "Свяжитесь с BTC-ГРУПП: расскажите про дом, бассейн, теплицу, бизнес или серверную, а мы посчитаем, есть ли выгода от тепла и майнинга.",
  path: "/kontakty",
  keywords: ["контакты криптокотёл", "заявка на криптокотёл", "расчёт отопления майнингом"],
});

export default async function ContactsPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/kontakty");
  const telegram = content.company.telegram?.replace("@", "");

  const contactCards = [
    {
      badge: "Телефон",
      title: content.company.phone,
      text: "Позвоните, если хотите быстро понять, подходит ли решение под ваш объект.",
    },
    {
      badge: "Email",
      title: content.company.email,
      text: "Можно отправить описание объекта, тариф на электричество, текущую систему отопления и вопросы.",
    },
    {
      badge: "География",
      title: content.company.address,
      text: "Работаем с частными домами, бизнесом, теплицами, бассейнами и серверными задачами.",
    },
  ];

  return (
    <MarketingShell content={content}>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createOrganizationSchema(content.company)} />

      <main>
        <section className="page-hero">
          <div className="shell">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero__copy page-hero__copy--wide">
              <span className="eyebrow">Контакты</span>
              <h1>Расскажите про объект — мы посчитаем выгоду</h1>
              <p>
                Напишите, что нужно греть: дом, бассейн, теплицу, гостиницу, производство
                или серверную. Мы зададим уточняющие вопросы и покажем, есть ли смысл
                считать криптокотёл подробнее.
              </p>
              <div className="hero-copy__actions">
                <a className="btn btn--primary" href={`tel:${content.company.phone.replace(/\D/g, "")}`}>
                  Позвонить
                </a>
                {content.company.whatsapp ? (
                  <a className="btn btn--ghost" href={`https://wa.me/${content.company.whatsapp}`}>
                    Написать в WhatsApp
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Контактные каналы"
              title="Выберите удобный способ связи"
              description="Можно позвонить, написать в мессенджер или оставить заявку. Чем больше вводных вы отправите, тем точнее будет первый расчёт."
            />
            <FeatureGrid items={contactCards} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell shell--two-columns">
            <div className="contact-panel">
              <span className="eyebrow">Мессенджеры и режим</span>
              <h2>Быстрые каналы</h2>
              <p>
                Для быстрых вопросов удобнее телефон или мессенджер. Для расчёта лучше
                оставить вводные через форму: так мы сразу увидим объект, тариф и задачу.
              </p>
              <div className="contact-links">
                <a href={`tel:${content.company.phone.replace(/\D/g, "")}`}>{content.company.phone}</a>
                <a href={`mailto:${content.company.email}`}>{content.company.email}</a>
                {content.company.whatsapp ? (
                  <a href={`https://wa.me/${content.company.whatsapp}`}>WhatsApp</a>
                ) : null}
                {telegram ? <a href={`https://t.me/${telegram}`}>Telegram</a> : null}
                {content.company.max ? <a href={content.company.max}>MAX</a> : null}
              </div>
              <div className="contact-note">
                <strong>Режим работы:</strong>
                <span>{content.company.hours}</span>
              </div>
            </div>

            <div className="contact-panel">
              <span className="eyebrow">Что прислать</span>
              <h2>Что прислать для первого расчёта</h2>
              <ul className="bullet-list">
                <li>Тип объекта: дом, гостиница, теплица, сервис, производство, GPU.</li>
                <li>Какой источник отопления используется сейчас.</li>
                <li>Цена электричества и сколько тепла нужно в обычный день.</li>
                <li>Если есть: площадь, бассейн, бойлер, теплица, тёплый пол или серверная.</li>
              </ul>
              <div className="section-actions">
                <Link className="btn btn--ghost" href="/faq">
                  Сначала посмотреть FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <LeadForm
              source="contacts"
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
