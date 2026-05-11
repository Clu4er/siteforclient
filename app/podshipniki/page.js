import Image from "next/image";
import Link from "next/link";

import { BearingsCatalog } from "@/components/bearings/bearings-catalog";
import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";

export const metadata = {
  title: "ООО ТД «Саратовская Подшипниковая Корпорация» | Подшипники",
  description:
    "Подберём подшипник по номеру, размеру или аналогу. Поставляем российские и импортные бренды для промышленности, ремонта, сервиса и производства.",
  alternates: {
    canonical: "/podshipniki",
  },
  keywords: [
    "Саратовская Подшипниковая Корпорация",
    "подшипники Саратов",
    "импортные подшипники",
    "отечественные подшипники",
    "поставка подшипников",
  ],
};

const importedBrands = [
  "Torrington",
  "Timken",
  "THK",
  "NTN",
  "NSK",
  "Nachi",
  "Koyo",
  "INA",
  "IKO",
  "FYH",
  "FBJ",
  "FAG",
  "HIWIN",
];

const domesticBrands = [
  "СПЗ-3",
  "СПЗ-4",
  "SPZ-GROUP",
  "MPZ",
  "VBF",
  "ХАРП",
  "Ролтом",
  "КЗУП",
  "ЕПК",
];

const facts = [
  {
    value: "5 000+",
    label: "позиций на складе и под заказ",
  },
  {
    value: "B2B",
    label: "поставки для промышленности и сервиса",
  },
  {
    value: "Контроль",
    label: "проверка товара перед отгрузкой",
  },
  {
    value: "Аналоги",
    label: "подбор по номеру, размеру и бренду",
  },
];

const industries = [
  "автомобилестроение",
  "сельскохозяйственные машины",
  "станки и машиностроение",
  "строительная техника",
  "энергетика",
  "нефтяная промышленность",
  "карьеры и ГОК",
  "дробильно-сортировочное оборудование",
];

const valueCards = [
  {
    title: "Подберём нужную позицию",
    text: "Можно прислать номер, размер, бренд, фото маркировки или описание узла.",
  },
  {
    title: "Найдём замену",
    text: "Если нужной позиции нет, подскажем подходящий аналог по параметрам и задаче.",
  },
  {
    title: "Работаем с заявками",
    text: "Помогаем снабжению, ремонту, сервису и производству закрывать потребность в подшипниках.",
  },
];

const spkContactInfo = {
  title: "Контактная информация",
  phone: "+7 (8452) 46-49-52",
  secondaryPhones: ["+7 (8452) 47-83-89", "+7 (937) 250-38-88"],
  email: "podshipnik-spk@mail.ru",
  whatsapp: "",
  telegram: "",
  address: "410064, Саратов, ул. им. Тархова С.Ф., 29А",
  hours: "Заявки обрабатываются в кратчайшие сроки в удобной для клиента форме.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ООО ТД «Саратовская Подшипниковая Корпорация»",
  url: "https://spkpod.ru/",
  email: "podshipnik-spk@mail.ru",
  telephone: ["+7 8452 46-49-52", "+7 8452 47-83-89", "+7 937 250-38-88"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. им. Тархова С.Ф., 29А",
    addressLocality: "Саратов",
    addressCountry: "RU",
  },
};

export default async function BearingsPage() {
  const content = await getSiteContent();

  return (
    <MarketingShell content={content}>
      <JsonLd data={organizationSchema} />

      <main className="bearings-page">
        <section className="hero-home bearings-hero" id="main">
          <div className="shell hero-home__grid bearings-hero__grid">
            <div className="hero-copy bearings-hero__copy">
              <span className="eyebrow">
                Подшипники для <span className="text-highlight">промышленности</span>{" "}
                и снабжения
              </span>
              <h1>
                Саратовская{" "}
                <span className="text-highlight">Подшипниковая</span> Корпорация
              </h1>
              <p>
                Подберём подшипник по номеру, размеру, бренду или аналогу. Помогаем
                промышленности, ремонту, сервису и производству быстро закрывать заявки.
              </p>

              <div className="hero-copy__actions">
                <Link className="btn btn--primary" href="#lead-form">
                  Подобрать подшипник
                </Link>
                <Link className="btn btn--ghost" href="#catalog">
                  Смотреть бренды
                </Link>
              </div>

              <div className="hero-route-cards">
                <Link className="link-card" href="#catalog">
                  <strong>Бренды и аналоги</strong>
                  <p>Torrington, Timken, THK, NTN, NSK, Koyo, INA, ЕПК и другие.</p>
                </Link>
                <Link className="link-card" href="#contacts">
                  <strong>Консультация</strong>
                  <p>Подскажем, что подойдёт для вашего оборудования.</p>
                </Link>
              </div>
            </div>

            <div className="bearings-visual" aria-label="Подшипниковая продукция">
              <Image
                src="/media/bearings-hero.png"
                alt="Подшипники СПК с технологичной подсветкой"
                width={2048}
                height={1024}
                priority
                sizes="(max-width: 960px) 100vw, 42vw"
              />
              <div className="metric-pill metric-pill--right bearings-visual__label">
                <strong>5 000+</strong>
                <span>позиций и подбор аналогов</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <div className="stat-strip">
              {facts.map((fact) => (
                <article key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="catalog">
          <div className="shell bearings-content-grid">
            <div>
              <SectionHeading
                eyebrow="О компании"
                title={
                  <>
                    Подшипники для{" "}
                    <span className="text-highlight">промышленности, ремонта и сервиса</span>
                  </>
                }
                description="СПК работает с российскими и импортными подшипниками, помогает закрывать заявки снабжения и подбирать аналоги без лишней переписки."
              />

              <div className="feature-grid feature-grid--3 bearings-value-grid">
                {valueCards.map((card) => (
                  <article className="info-card" key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>

              <div className="bearings-copy">
                <p>
                  ООО «Саратовская Подшипниковая Корпорация» много лет работает с
                  подшипниками для промышленности и сервиса. Если вы не уверены в
                  номере или аналоге, специалисты помогут разобраться по размерам,
                  бренду или условиям работы.
                </p>
                <p>
                  Популярные позиции поддерживаются на складе, а продукция проходит
                  входной контроль. Это снижает риск пересортицы, недопоставки и
                  лишних задержек при отгрузке.
                </p>
              </div>
            </div>

            <BearingsCatalog
              importedBrands={importedBrands}
              domesticBrands={domesticBrands}
            />
          </div>
        </section>

        <section className="section section--surface">
          <div className="shell">
            <SectionHeading
              eyebrow="Применение"
              title="Для каких задач поставляем"
              description="Подшипники нужны в технике, станках, производстве, ремонте, энергетике, нефтяной отрасли и дробильно-сортировочном оборудовании."
            />

            <div className="bearings-industries">
              {industries.map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="partners">
          <div className="shell split-section">
            <div>
              <SectionHeading
                eyebrow="Партнёрам"
              title="Помогаем закрывать заявки без лишних сложностей"
              description="Наша задача — быстро понять, что вам нужно, предложить вариант поставки и согласовать понятные сроки."
              />
            </div>
            <div className="related-links">
              <article className="link-card">
                <strong>Консультация и подбор</strong>
                <p>
                  Специалисты помогут подобрать позицию по номеру, размеру, аналогу,
                  производителю или описанию узла.
                </p>
              </article>
              <article className="link-card">
                <strong>Быстрая обработка заявок</strong>
                <p>
                  Можно отправить список позиций, фото маркировки или описание задачи.
                  Для срочных поставок лучше сразу позвонить.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--surface" id="contacts">
          <div className="shell">
            <SectionHeading
              eyebrow="Контакты"
              title="Контактная информация СПК"
              description="Телефоны, email и адрес для заявок на подбор, замену или поставку подшипников."
            />

            <div className="bearings-contact-grid">
              <article className="contact-panel">
                <h3>Компания</h3>
                <strong>ООО ТД «Саратовская Подшипниковая Корпорация»</strong>
                <p>410064, Саратов, ул. им. Тархова С.Ф., 29А</p>
              </article>
              <article className="contact-panel">
                <h3>Телефоны</h3>
                <a href="tel:+78452464952">+7 (8452) 46-49-52</a>
                <a href="tel:+78452478389">+7 (8452) 47-83-89</a>
                <a href="tel:+79372503888">+7 (937) 250-38-88</a>
              </article>
              <article className="contact-panel">
                <h3>Email и сайт</h3>
                <a href="mailto:podshipnik-spk@mail.ru">podshipnik-spk@mail.ru</a>
                <a href="https://spkpod.ru/" target="_blank" rel="noreferrer">
                  spkpod.ru
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <LeadForm
              source="spk-bearings"
              eyebrow="Заявка на подшипники"
              title="Отправить запрос на подбор или поставку"
              subtitle="Укажите номер, бренд, аналог, размер, количество или опишите узел. Специалисты СПК вернутся с вариантом поставки и уточняющими вопросами."
              buttonLabel="Подобрать подшипник"
              objectLabel="Позиция или бренд"
              objectPlaceholder="Например: 6205, SKF, Timken, ЕПК"
              messagePlaceholder="Номер, размеры, количество, производитель, условия работы или требуемый аналог"
              footerText="Для срочных поставок можно дополнительно позвонить по телефону СПК."
              successText="Заявка отправлена. Специалисты СПК свяжутся с вами по указанным контактам."
              contactInfo={spkContactInfo}
            />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
