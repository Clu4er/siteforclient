import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

const defaultKeywords = [
  "криптокотёл",
  "отопление на базе майнинга",
  "майнинг и отопление",
  "утилизация тепла майнинга",
  "отопление дома майнингом",
  "отопление бизнеса майнингом",
];

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/media/banner.webp",
}) {
  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ВТС-ГРУПП",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1280,
          height: 1280,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function createWebsiteSchema(company) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: getSiteUrl(),
    inLanguage: "ru",
  };
}

export function createOrganizationSchema(company) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: getSiteUrl(),
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressCountry: "RU",
    },
    areaServed: company.serviceArea,
    openingHours: company.hours,
  };
}

export function createFaqSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  providerName = "ВТС-ГРУПП",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: {
      "@type": "Organization",
      name: providerName,
      url: absoluteUrl(path),
    },
    areaServed: "RU",
  };
}
