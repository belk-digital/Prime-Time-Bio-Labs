import type { Metadata } from "next";
import { Syncopate, Michroma, Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
