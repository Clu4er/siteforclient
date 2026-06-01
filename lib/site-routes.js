export const allSiteRoutes = [
  { href: "/", label: "Главная" },
  { href: "/home-heating", label: "Для дома" },
  { href: "/business-heating", label: "Для бизнеса" },
  { href: "/gpu", label: "ГПУ" },
  { href: "/engineering", label: "Инженерия" },
  { href: "/gas-heating-comparison", label: "Сравнение с газом" },
  { href: "/electric-heating-comparison", label: "Сравнение с электричеством" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
  { href: "/bearings", label: "Подшипники" },
];

export const scenarioRoutes = [
  {
    href: "/home-heating",
    label: "Для дома",
    title: "Для дома",
    text: "Коттеджи, бассейны, тёплые полы, бойлеры и бытовые контуры тепла.",
  },
  {
    href: "/business-heating",
    label: "Для бизнеса",
    title: "Для бизнеса",
    text: "Гостиницы, теплицы, сервисные объекты и площадки с постоянной тепловой нагрузкой.",
  },
  {
    href: "/gpu",
    label: "ГПУ",
    title: "ГПУ",
    text: "Вычислительное тепло для ГВС, вентиляции, отопления и технических контуров.",
  },
  {
    href: "/engineering",
    label: "Инженерия",
    title: "Инженерия",
    text: "Подключение криптокотла к существующей системе, резерву, автоматике и контурам.",
  },
  {
    href: "/gas-heating-comparison",
    label: "Сравнение",
    title: "Сравнение",
    text: "Сравнение криптокотла с газовым и электрическим отоплением без лишних обещаний.",
    activePaths: ["/gas-heating-comparison", "/electric-heating-comparison"],
  },
];

export const headerRoutes = [
  { href: "/home-heating", label: "Для дома" },
  { href: "/business-heating", label: "Для бизнеса" },
  { href: "/gpu", label: "ГПУ" },
  { href: "/engineering", label: "Инженерия" },
  {
    href: "/gas-heating-comparison",
    label: "Сравнение",
    activePaths: ["/gas-heating-comparison", "/electric-heating-comparison"],
  },
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
      { href: "/gpu", label: "ГПУ и утилизация тепла" },
      { href: "/engineering", label: "Инженерия отопления" },
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

export function isRouteActive(route, pathname) {
  if (!route || !pathname) {
    return false;
  }

  const activePaths = route.activePaths || [route.href];

  return activePaths.some((path) =>
    path === "/" ? pathname === path : pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function getNeighborScenarioLinks(pathname) {
  return scenarioRoutes
    .filter((route) => !isRouteActive(route, pathname))
    .map(({ href, title, text }) => ({ href, title, text }));
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
