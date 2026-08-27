import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-family-body",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-family-headline",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IP-SAKTI Sahayak",
  description: "Navigate IP with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64 bg-surface min-h-screen">
          <Header />
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
