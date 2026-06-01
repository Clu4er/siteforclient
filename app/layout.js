import "@/app/globals.css";

import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Криптокотлы и отопление на базе майнинга | ВТС-ГРУПП",
    template: "%s | ВТС-ГРУПП",
  },
  description:
    "Проектируем криптокотлы и системы утилизации тепла для дома, бизнеса, бассейнов, теплиц и ГПУ.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
