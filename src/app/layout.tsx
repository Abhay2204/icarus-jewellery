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
  title: "Advika | Imitation Jewellery",
  description:
    "Discover Advika Imitation Jewellery. Everyday elegance crafted with high precision, featuring timeless designs and exquisite imitation jewellery collections.",
  icons: {
    icon: "/assets/logo.png",
  },
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
      <body className="font-sans antialiased bg-[#f5f4eb] text-[#161616] selection:bg-[#c5a47e] selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
