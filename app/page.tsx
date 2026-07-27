"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../lib/api";

const STATS = [
  { number: "25+", label: "Years Experience", icon: "🏆" },
  { number: "500+", label: "Happy Customers", icon: "😊" },
  { number: "MCL", label: "Approved Contractor", icon: "🏭" },
  { number: "2001", label: "Established", icon: "📅" },
];

const SERVICES = [
  { icon: "⚙️", name: "Motor Rewinding", desc: "AC & DC motor rewinding for all types and sizes. Machine-based precision winding." },
  { icon: "🔌", name: "Transformer Repair", desc: "Complete transformer repair and maintenance for industrial and domestic use." },
  { icon: "🏠", name: "House Wiring", desc: "Safe and certified house wiring, drill panel, getan box installation." },
  { icon: "💧", name: "Pump Installation", desc: "Water pump installation, repair and maintenance services." },
  { icon: "🌀", name: "Fan Repair & Rewinding", desc: "Machine-based fan winding — ceiling fan, table fan, exhaust fan." },
  { icon: "🏭", name: "Industrial Maintenance", desc: "Heavy electrical maintenance for MCL and industrial contracts." },
];

const WHY_US = [
  { icon: "✅", title: "25 Years Experience", desc: "Serving Brajrajnagar since 2001 with trust and quality." },
  { icon: "🏭", title: "MCL Approved Contractor", desc: "Authorized contractor for Mahanadi Coalfields Limited." },
  { icon: "🔧", title: "Machine-Based Winding", desc: "Fan winding done by machine for precision and durability." },
  { icon: "⚡", title: "All Electrical Work", desc: "AC/DC motors, transformers, starters, HEMM spare parts." },
  { icon: "📍", title: "Local & Trusted", desc: "Based in Brajrajnagar — always available for local support." },
  { icon: "💰", title: "Affordable Pricing", desc: "Quality work at fair prices with no hidden charges." },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", location: "Brajrajnagar", text: "Bahut achha kaam karte hain. Motor rewinding perfectly done. 10 saal se yahan aa raha hun.", rating: 5 },
  { name: "Suresh Mahanta", location: "Jharsuguda", text: "Very reliable shop. Fan winding machine se hoti hai toh quality bahut achhi rehti hai.", rating: 5 },
  { name: "MCL Contractor", location: "Orient Colliery", text: "Professional service for industrial electrical work. Always on time and quality assured.", rating: 5 },
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getProducts({ limit: 6 }).then((r) => setProducts(r.data.products)).catch(() => {});
    getCategories().then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-yellow-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                <span className="text-yellow-400 text-sm font-medium">⚡ Est. 2001 • Brajrajnagar, Odisha</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Your Trusted<br />
                <span className="text-yellow-400">Electrical Partner</span><br />
                Since 2001
              </h1>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                Rahul Electrical Works — 25 years of excellence in electrical repair, rewinding, and supply. MCL approved contractor serving Brajrajnagar and Jharsuguda.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                AC & DC Motor • Transformer • House Wiring • Fan Rewinding • Spare Parts
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/services" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
                  🔧 Our Services
                </Link>
                <Link href="/products" className="border-2 border-yellow-500/50 hover:border-yellow-400 text-white px-6 py-3 rounded-xl transition-all hover:bg-yellow-500/10">
                  🛒 Shop Products
                </Link>
                <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-bold text-yellow-400">{s.number}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-yellow-500 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-900 font-semibold text-sm">
            <span>⚡ AC & DC Motor Rewinding</span>
            <span>•</span>
            <span>🔌 Transformer Repair</span>
            <span>•</span>
            <span>🏠 House Wiring</span>
            <span>•</span>
            <span>🌀 Fan Rewinding</span>
            <span>•</span>
            <span>💡 LED Bulbs & Electrical Goods</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-yellow-600 font-semibold mb-2">About Us</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Rahul Electrical Works —<br />A Legacy of 25 Years
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2001 by <strong>Pradeep Kumar</strong>, Rahul Electrical Works has been serving the electrical needs of Brajrajnagar, Jharsuguda and surrounding areas for over two decades.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are an <strong>MCL (Mahanadi Coalfields Limited) approved contractor</strong>, handling heavy industrial electrical work alongside our retail shop. We deal in mechanical, electrical, HEMM spare parts and general order supply.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our shop specializes in AC & DC motor rewinding, transformer repair, fan rewinding (machine-based), house wiring, and all types of electrical goods supply.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors">
                Read More About Us →
              </Link>
            </div>
            <div className="space-y-4">
              {/* Founder card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/images/owner-pradeep-kumar.jpg"
                    alt="Pradeep Kumar, Founder of Rahul Electrical Works"
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Pradeep Kumar</h3>
                    <p className="text-gray-500 text-sm">Founder & Proprietor</p>
                    <p className="text-yellow-600 text-sm font-medium">25+ Years Experience</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  "Quality work and customer trust has been our foundation for over two decades. We believe in honest pricing and durable repairs."
                </p>
              </div>

              {/* MCL badge */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
                <span className="text-3xl">🏭</span>
                <div>
                  <h4 className="font-bold text-gray-900">MCL Approved Contractor</h4>
                  <p className="text-gray-500 text-sm">Mahanadi Coalfields Limited — Industrial Electrical Contractor</p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">📞 Contact Us</p>
                <div className="flex gap-4">
                  <a href="tel:9124312684" className="text-green-700 font-bold hover:underline">9124312684</a>
                  <span className="text-gray-400">|</span>
                  <a href="tel:8895626074" className="text-green-700 font-bold hover:underline">8895626074</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-600 font-semibold mb-2">What We Do</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="text-gray-500 mt-2">Professional electrical services at your doorstep</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-yellow-200 transition-all group">
                <span className="text-4xl block mb-4">{s.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link href="/bookings" className="text-yellow-600 font-semibold text-sm hover:underline">
                  Book Now →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-block border-2 border-yellow-500 text-yellow-600 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 hover:text-gray-900 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      {products.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-yellow-600 font-semibold mb-1">Our Products</p>
                <h2 className="text-3xl font-bold text-gray-900">Electrical Goods</h2>
              </div>
              <Link href="/products" className="text-yellow-600 font-semibold hover:underline">View all →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((cat) => (
                <Link key={cat.id} href={`/products?category=${cat.slug}`}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-yellow-50 hover:border-yellow-300 border border-gray-100 transition-all">
                  <p className="font-medium text-gray-800 text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.product_count} items</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/products" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors">
                🛒 Browse All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-400 font-semibold mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold">Why Rahul Electrical Works?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((w) => (
              <div key={w.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="text-3xl block mb-3">{w.icon}</span>
                <h3 className="font-bold text-white mb-2">{w.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-600 font-semibold mb-2">Customer Reviews</p>
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-yellow-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Need Electrical Help?</h2>
          <p className="text-gray-800 mb-6">Call us or WhatsApp — we respond quickly!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:9124312684"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-colors">
              📞 9124312684
            </a>
            <a href="tel:8895626074"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-colors">
              📞 8895626074
            </a>
            <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
              💬 WhatsApp Order
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
