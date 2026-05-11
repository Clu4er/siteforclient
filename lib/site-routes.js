export const allSiteRoutes = [
  { href: "/", label: "Главная" },
  { href: "/dlya-doma", label: "Для дома" },
  { href: "/dlya-biznesa", label: "Для бизнеса" },
  { href: "/sravnenie-s-gazom", label: "Сравнение с газом" },
  { href: "/sravnenie-s-elektrichestvom", label: "Сравнение с электричеством" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/gpu-otoplenie", label: "GPU и тепло" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
  { href: "/podshipniki", label: "Подшипники" },
];

export const headerRoutes = [
  { href: "/dlya-doma", label: "Для дома" },
  { href: "/dlya-biznesa", label: "Для бизнеса" },
  { href: "/sravnenie-s-elektrichestvom", label: "Сравнение" },
  { href: "/kalkulyator", label: "Калькулятор" },
  { href: "/podshipniki", label: "Подшипники" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
];

export const footerRouteGroups = [
  {
    title: "Решения",
    links: [
      { href: "/dlya-doma", label: "Криптокотёл для дома" },
      { href: "/dlya-biznesa", label: "Криптокотёл для бизнеса" },
      { href: "/gpu-otoplenie", label: "GPU и тепло" },
    ],
  },
  {
    title: "Сравнение",
    links: [
      { href: "/sravnenie-s-gazom", label: "Сравнение с газом" },
      { href: "/sravnenie-s-elektrichestvom", label: "Сравнение с электричеством" },
      { href: "/kalkulyator", label: "Калькулятор отопления" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/kontakty", label: "Контакты" },
      { href: "/podshipniki", label: "Подшипники" },
    ],
  },
];

export function getRouteByPath(pathname) {
  return allSiteRoutes.find((route) => route.href === pathname) || null;
}

export function getBreadcrumbs(pathname) {
  if (!pathname || pathname === "/") {
    return [{ href: "/", label: "Главная" }];
  }

  const currentRoute = getRouteByPath(pathname);

  return [
    { href: "/", label: "Главная" },
    currentRoute || { href: pathname, label: pathname.replace(/\//g, "") },
  ];
}
