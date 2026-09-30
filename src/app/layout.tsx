import type { Metadata } from "next";
import "./globals.css";
// Initial company-logo loader kept for future client request.
// import InitialLoader from "../components/layout/InitialLoader";

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
      <body className="bg-[#050505] text-[#f5f2eb]">
        {/* <InitialLoader /> */}
        {children}
      </body>
    </html>
  );
}
