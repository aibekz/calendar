import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ibmPlexMono, lora } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simpli Calendar",
  description: "Simpli Calendar",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${lora.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
