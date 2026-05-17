import Image from "next/image";
import Link from "next/link";

import { BearingsCatalog } from "@/components/bearings/bearings-catalog";
import { LeadForm } from "@/components/forms/lead-form";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteContent } from "@/lib/cms";

export const metadata = {
  title: {
    absolute: "Подшипники для промышленности и сервиса | СПК",
  },
  description:
    "Саратовская Подшипниковая Корпорация поставляет российские и импортные подшипники, помогает подобрать аналоги и быстро обработать заявку.",
  alternates: {
    canonical: "/bearings",
  },
  openGraph: {
    title: "Подшипники для промышленности и сервиса | СПК",
    description:
      "Поставка российских и импортных подшипников, подбор аналогов и обработка заявок для снабжения.",
    url: "/bearings",
    siteName: "Саратовская Подшипниковая Корпорация",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/media/bearings-hero.png",
        width: 2048,
        height: 1024,
        alt: "Подшипники для промышленности и сервиса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подшипники для промышленности и сервиса | СПК",
    description:
      "Поставка российских и импортных подшипников, подбор аналогов и обработка заявок для снабжения.",
    images: ["/media/bearings-hero.png"],
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
    label: "наименований подшипниковой продукции на складе",
  },
  {
    value: "B2B",
    label: "поставки для промышленности, снабжения и сервиса",
  },
  {
    value: "Контроль",
    label: "входная проверка продукции перед отгрузкой",
  },
  {
    value: "Аналоги",
    label: "подбор по размерам и техническим характеристикам",
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
    title: "Широкий ассортимент",
    text: "Российские и импортные подшипники от проверенных производителей под заявки снабжения и производства.",
  },
  {
    title: "Складской комплекс",
    text: "Популярные позиции поддерживаются в наличии, а заявки обрабатываются в удобной для клиента форме.",
  },
  {
    title: "Долгосрочная работа",
    text: "Работаем спокойно и понятно: уточняем задачу, сроки, наличие и варианты поставки.",
  },
];

const spkContactInfo = {
  title: "Контактная информация",
  phone: "+7 (903) 328-76-11",
  secondaryPhones: [],
  email: "Kav-spk@mail.ru",
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
  email: "Kav-spk@mail.ru",
  telephone: "+7(903)-328-76-11",
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
                Поставляем российские и импортные подшипники для промышленности,
                сервиса и производственных предприятий. Работаем с заявками по
                номерам, размерам, аналогам и условиям эксплуатации.
              </p>

              <div className="hero-copy__actions">
                <Link className="btn btn--primary" href="#lead-form">
                  Отправить заявку
                </Link>
                <Link className="btn btn--ghost" href="#catalog">
                  Смотреть бренды
                </Link>
              </div>

              <div className="hero-route-cards">
                <Link className="link-card" href="#catalog">
                  <strong>Импортные бренды</strong>
                  <p>Torrington, Timken, THK, NTN, NSK, Nachi, Koyo, INA и другие.</p>
                </Link>
                <Link className="link-card" href="#contacts">
                  <strong>Контакты СПК</strong>
                  <p>Саратов, ул. им. Тархова С.Ф., 29А. Телефоны и email ниже.</p>
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
                    Опыт поставки{" "}
                    <span className="text-highlight">подшипниковой продукции</span>{" "}
                    для промышленности
                  </>
                }
                description="СПК работает с российскими и импортными подшипниками, помогает закрывать заявки снабжения и подбирать аналоги по размерам или техническим характеристикам."
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
                  ООО «Саратовская Подшипниковая Корпорация» имеет большой опыт
                  поставки подшипников. Помогаем с заявками по номерам, размерам,
                  брендам и аналогам, чтобы снабжение быстрее получило понятный ответ.
                </p>
                <p>
                  На собственной территории расположен складской комплекс. Продукция
                  проходит входной контроль, чтобы клиент получил нужные позиции без
                  пересортицы и лишних задержек.
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
              title="Поставки для разных отраслей и классов точности"
              description="Подшипники поставляются для автомобильной, сельскохозяйственной, строительной, машиностроительной, энергетической и нефтяной отрасли."
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
                title="Помогаем снабжению быстрее закрывать заявки"
                description="Уточняем задачу, проверяем наличие, подбираем аналоги и возвращаемся с понятным вариантом поставки."
              />
            </div>
            <div className="related-links">
              <article className="link-card">
                <strong>Консультация и подбор</strong>
                <p>
                  Специалисты проконсультируют по установке и эксплуатации
                  подшипников, помогут подобрать аналоги по размерам или
                  характеристикам.
                </p>
              </article>
              <article className="link-card">
                <strong>Быстрая обработка заявок</strong>
                <p>
                  Ответ клиенту выполняется в удобной форме и в короткие сроки.
                  Для срочных задач можно сразу связаться по телефону.
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
              description="ООО ТД «Саратовская Подшипниковая Корпорация». Адрес, телефоны и email для заявок на поставку подшипников."
            />

            <div className="bearings-contact-grid">
              <article className="contact-panel">
                <h3>Компания</h3>
                <strong>ООО ТД «Саратовская Подшипниковая Корпорация»</strong>
                <p>410064, Саратов, ул. им. Тархова С.Ф., 29А</p>
              </article>
              <article className="contact-panel">
                <h3>Телефоны</h3>
                <a href="tel:+79033287611">+7 (903) 328-76-11</a>
              </article>
              <article className="contact-panel">
                <h3>Email и сайт</h3>
                <a href="mailto:Kav-spk@mail.ru">Kav-spk@mail.ru</a>
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
              subtitle="Укажите номер подшипника, бренд, аналог, размеры, количество или описание узла. Специалисты СПК вернутся с вариантом поставки и уточняющими вопросами."
              buttonLabel="Отправить заявку"
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
