import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: "Archinet | Architecture, Design & Networking Events — India",

  description:
    "Archinet connects leading architects, interior designers and premium architectural brands through exclusive networking events and exhibition experiences across India.",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "architecture networking events India",
    "architecture and design exhibition India",
    "architects networking events",
    "interior designers networking India",
    "building materials exhibition",
    "architectural product exhibition",
    "architecture expo India",
  ],

  openGraph: {
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    url: "/",
    title: "Archinet | Architecture, Design & Networking Events — India",
    description:
      "Archinet connects leading architects, interior designers and premium architectural brands through exclusive networking events and exhibition experiences across India.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1376,
        height: 768,
        alt: "Archinet Architecture & Design Networking Events India",
      },
    ],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: "summary_large_image",
    title: "Archinet | Architecture, Design & Networking Events — India",
    description:
      "Archinet connects leading architects, interior designers and premium architectural brands through exclusive networking events and exhibition experiences across India.",
    images: [SITE_CONFIG.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-[#AAA59B] font-sans">
        {children}
      </body>
    </html>
  );
}
