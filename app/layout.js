import "@/app/globals.css";

import { getSiteUrl } from "@/lib/site-url";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Криптокотлы и отопление на базе майнинга",
    template: "%s | BTC-ГРУПП",
  },
  description:
    "Коммерческий сайт о криптокотлах, отоплении на базе майнинга, утилизации тепла и инженерных сценариях для дома, бизнеса и GPU-контуров.",
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
