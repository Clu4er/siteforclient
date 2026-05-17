import "@/app/globals.css";

import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Криптокотлы и отопление на базе майнинга | BTC-ГРУПП",
    template: "%s | BTC-ГРУПП",
  },
  description:
    "Проектируем криптокотлы и системы утилизации тепла для дома, бизнеса, бассейнов, теплиц и GPU-контуров.",
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
