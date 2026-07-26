import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Rahul Electrical Works | Your Trusted Electrical Partner Since 2002",
  description:
    "Rahul Electrical Works — 24 years of trusted electrical service in Brajrajnagar, Jharsuguda, Odisha. AC & DC motor rewinding, transformer repair, house wiring, fan rewinding, LED bulbs. MCL approved contractor.",
  keywords:
    "Rahul Electrical Works, motor rewinding Brajrajnagar, transformer repair Jharsuguda, house wiring Odisha, fan rewinding, LED bulbs, MCL contractor, electrical shop Brajrajnagar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
