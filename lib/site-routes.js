export const allSiteRoutes = [
  { href: "/", label: "Главная" },
  { href: "/home-heating", label: "Для дома" },
  { href: "/business-heating", label: "Для бизнеса" },
  { href: "/gibridnoe-otoplenie", label: "Гибридное отопление" },
  { href: "/gas-heating-comparison", label: "Сравнение с газом" },
  { href: "/electric-heating-comparison", label: "Сравнение с электричеством" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/gpu-heat-recovery", label: "GPU и тепло" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
  { href: "/bearings", label: "Подшипники" },
];

export const headerRoutes = [
  { href: "/home-heating", label: "Для дома" },
  { href: "/business-heating", label: "Для бизнеса" },
  { href: "/electric-heating-comparison", label: "Сравнение" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/bearings", label: "Подшипники" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
];

export const footerRouteGroups = [
  {
    title: "Решения",
    links: [
      { href: "/home-heating", label: "Криптокотёл для дома" },
      { href: "/business-heating", label: "Криптокотёл для бизнеса" },
      { href: "/gibridnoe-otoplenie", label: "Подключение к текущему отоплению" },
      { href: "/gpu-heat-recovery", label: "GPU и утилизация тепла" },
    ],
  },
  {
    title: "Сравнение",
    links: [
      { href: "/gas-heating-comparison", label: "Сравнение с газом" },
      { href: "/electric-heating-comparison", label: "Сравнение с электричеством" },
      { href: "/calculator", label: "Калькулятор отопления" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contacts", label: "Контакты" },
      { href: "/bearings", label: "Подшипники" },
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
