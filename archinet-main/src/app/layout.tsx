import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArchiNet | Next-Gen Architectural Network & Blueprint Showcase",
  description: "Global architectural intelligence network, interactive vector blueprint viewer, dynamic 3D structural analysis, and studio collaboration platform.",
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
