import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enigma",
  description: "The AI Mystery game",
};

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={chakra_petch.className}>{children}</body>
    </html>
  );
}
