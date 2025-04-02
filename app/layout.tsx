import type { Metadata } from "next";
import { Geist, Geist_Mono, Bubblegum_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bubblegumSans = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bubblegum-sans",
});

export const metadata: Metadata = {
  title: "Shayari Kunj",
  description: "Dive into a world of emotions with handpicked shayaris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bubblegumSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
