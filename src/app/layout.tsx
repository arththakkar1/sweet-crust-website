import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweet Crust Bakery — Artisanal Baked Goods",
  description:
    "Handcrafted pastries, celebration cakes, artisan breads and signature cookies. Sweet Crust Bakery — where every bite is a moment of joy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="bg-[var(--bg-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
