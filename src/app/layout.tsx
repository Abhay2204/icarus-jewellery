import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICARUS | Fine Jewellery & Haute Joaillerie",
  description:
    "Discover ICARUS fine jewellery. Everyday elegance crafted with high jewelry precision, featuring timeless gemstones and diamond collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${cinzel.variable}`}
    >
      <body className="font-sans antialiased bg-[#0e0e0e] text-white selection:bg-[#c5a47e] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
