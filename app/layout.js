import "@/app/globals.css";

import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Криптокотлы и отопление на базе майнинга",
    template: "%s | BTC-ГРУПП",
  },
  description:
    "Криптокотлы для дома и бизнеса: майнер добывает биткоин, выделяет тепло, а система направляет это тепло в отопление.",
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
