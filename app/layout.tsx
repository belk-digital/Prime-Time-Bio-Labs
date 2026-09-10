import type { Metadata } from "next";
import { Syncopate, Michroma, Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import SessionProvider from "@/components/providers/SessionProvider";
import AgeGate from "@/components/AgeGate";
import SiteHeader from "@/components/nav/SiteHeader";
import HeaderVisibility from "@/components/nav/HeaderVisibility";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const futuristicFont = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-futuristic",
});

const michromaFont = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
});

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PrimeTime BioLabs",
  description: "Peptide solutions for clarity, precision, and efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${futuristicFont.variable} ${michromaFont.variable} ${interFont.variable} font-futuristic antialiased bg-black text-white`}>
        <SmoothScrollProvider>
          <SessionProvider>
            <HeaderVisibility>
              <AgeGate />
            </HeaderVisibility>
            <HeaderVisibility>
              <SiteHeader />
            </HeaderVisibility>
            {children}
            <HeaderVisibility>
              <CartDrawer />
            </HeaderVisibility>
          </SessionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
