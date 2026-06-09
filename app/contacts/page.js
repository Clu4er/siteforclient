import Link from "next/link";

import { ContactCopyGrid } from "@/components/forms/contact-copy-grid";
import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";
import { getBreadcrumbs } from "@/lib/site-routes";
import { buildMetadata, createBreadcrumbSchema, createOrganizationSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Контакты и расчёт по криптокотлу",
  description:
    "Свяжитесь с ВТС-ГРУПП: расчёт под дом, бизнес, теплицу, ГПУ или коммерческий объект. Телефон, email, Telegram и адрес.",
  path: "/contacts",
  keywords: ["контакты криптокотёл", "заявка на криптокотёл", "расчёт отопления майнингом"],
});

export default async function ContactsPage() {
  const content = await getSiteContent();
  const breadcrumbs = getBreadcrumbs("/contacts");
  const telegram = content.company.telegram?.replace("@", "");

  const contactCards = [
    {
      badge: "Телефон",
      title: content.company.phone,
      text: "Быстрая связь для первичной консультации, уточнения вводных и обсуждения объекта.",
      copyValue: content.company.phone,
    },
    {
      badge: "Email",
      title: content.company.email,
      text: "Подходит для параметров объекта, технических вопросов и исходных данных для расчёта.",
      copyValue: content.company.email,
    },
    {
      badge: "География",
      title: content.company.address,
      text: "Работаем по России и СНГ, обсуждаем частные, коммерческие и вычислительные объекты.",
      copyValue: content.company.address,
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
              <h1>
                Обсудим <span className="text-highlight">объект</span>, сценарий
                отопления и следующий шаг
              </h1>
              <p>
                Расскажите, какой у вас объект и как он отапливается сейчас. Мы
                подскажем, есть ли смысл считать криптокотёл, какие вводные нужны и с
                чего лучше начать.
              </p>
              <div className="hero-copy__actions">
                <a className="btn btn--primary" href={`tel:+${content.company.phone.replace(/\D/g, "")}`}>
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Контактные каналы"
              title="Выберите удобный способ связи"
              description="Можно позвонить, написать на email или открыть Telegram. Мы уточним вводные и дадим первый ориентир по объекту."
            />
            <ContactCopyGrid items={contactCards} />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell shell--two-columns">
            <div className="contact-panel">
              <span className="eyebrow">Мессенджеры и режим</span>
              <h2>Быстрые каналы</h2>
              <p>
                Для оперативных вопросов удобнее идти в телефон или мессенджер, а для
                предметного расчёта лучше заранее подготовить вводные по объекту.
              </p>
              <div className="contact-links">
                <a href={`tel:+${content.company.phone.replace(/\D/g, "")}`}>{content.company.phone}</a>
                <a href={`mailto:${content.company.email}`}>{content.company.email}</a>
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
              <h2>Минимум, чтобы стартовать расчёт</h2>
              <ul className="bullet-list">
                <li>Тип объекта: дом, гостиница, теплица, сервис, производство, ГПУ.</li>
                <li>Какой источник отопления используется сейчас.</li>
                <li>Стоимость электроэнергии и роль полезного тепла на объекте.</li>
                <li>Если есть: площадь, контуры, бассейн, бойлер, теплица, ГВС или техническая нагрузка.</li>
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
