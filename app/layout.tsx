import type { Metadata } from "next";
import { Bebas_Neue, DM_Serif_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "simoon — Creative Director / Web Director",
  description: "堀田裕（simoon）のポートフォリオサイト。Creative Director / Web Director / Fukuoka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${notoSansJP.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
