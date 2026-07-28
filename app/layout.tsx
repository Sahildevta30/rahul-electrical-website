import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Rahul Electrical Works | Your Trusted Electrical Partner Since 2001",
  description:
    "Rahul Electrical Works — 25 years of trusted electrical service in Brajrajnagar, Jharsuguda, Odisha. AC & DC motor rewinding, transformer repair, house wiring, fan rewinding, LED bulbs. MCL approved contractor.",
  keywords:
    "Rahul Electrical Works, motor rewinding Brajrajnagar, transformer repair Jharsuguda, house wiring Odisha, fan rewinding, LED bulbs, MCL contractor, electrical shop Brajrajnagar",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Rahul Electrical Works",
  image: "https://rahul-electrical-website.vercel.app/images/owner-pradeep-kumar.jpg",
  url: "https://rahul-electrical-website.vercel.app",
  telephone: ["+919124312684", "+918895626074"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Orient Post Office, Budhijam, Orient Colliery",
    addressLocality: "Brajrajnagar",
    addressRegion: "Odisha",
    postalCode: "768233",
    addressCountry: "IN",
  },
  areaServed: ["Brajrajnagar", "Jharsuguda", "Odisha"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Pradeep Kumar",
  },
  foundingDate: "2001",
  description:
    "MCL approved electrical contractor offering AC & DC motor rewinding, transformer repair, house wiring, fan rewinding, pump repair and general electrical services in Brajrajnagar and Jharsuguda, Odisha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
