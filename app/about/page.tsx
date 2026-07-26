import Link from "next/link";

const TIMELINE = [
  { year: "2002", event: "Rahul Electrical Works founded by Pradeep Kumar in Brajrajnagar, Odisha." },
  { year: "2005", event: "Expanded services to include transformer repair and industrial electrical work." },
  { year: "2010", event: "Became MCL (Mahanadi Coalfields Limited) approved contractor." },
  { year: "2015", event: "Introduced machine-based fan rewinding for better quality and precision." },
  { year: "2020", event: "Started dealing in HEMM spare parts and general order supply." },
  { year: "2026", event: "Launched online presence — bringing 24 years of trust to the digital world." },
];

const SERVICES_DETAIL = [
  { icon: "⚙️", name: "AC & DC Motor Rewinding", detail: "All types of single-phase and three-phase motor rewinding using quality copper wire." },
  { icon: "🔌", name: "Transformer Repair", detail: "Step-up, step-down and distribution transformer repair for industrial and domestic use." },
  { icon: "🏠", name: "House Wiring", detail: "Complete house wiring, rewiring, drill panel, getan box, switch and socket fitting." },
  { icon: "🌀", name: "Fan Rewinding", detail: "Machine-based ceiling fan, table fan and exhaust fan rewinding for precise quality." },
  { icon: "💧", name: "Pump Installation", detail: "Water pump, submersible pump and agricultural pump installation and repair." },
  { icon: "🏭", name: "Industrial / MCL Work", detail: "Heavy electrical maintenance under MCL tender — motors, starters, control panels." },
  { icon: "⚡", name: "ABC & Starter Repair", detail: "All types of ABC (Air Break Contactor) and motor starter repair and maintenance." },
  { icon: "🔧", name: "HEMM Spare Parts", detail: "Supply of Heavy Earth Moving Machinery spare parts and electrical components." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rahul Electrical Works
          </h1>
          <p className="text-gray-300 text-lg">
            Your Trusted Electrical Partner Since 2002
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-yellow-600 font-semibold mb-2">Our Story</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">24 Years of Electrical Excellence</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Rahul Electrical Works was established in <strong>2002</strong> by <strong>Pradeep Kumar</strong> in Brajrajnagar, Jharsuguda, Odisha. What started as a small electrical repair shop has grown into a trusted name in the region for all types of electrical work.
              </p>
              <p>
                Over 24 years, we have served <strong>500+ customers</strong> — from individual homeowners needing fan repairs to large industrial clients like <strong>Mahanadi Coalfields Limited (MCL)</strong> for whom we work as an approved contractor.
              </p>
              <p>
                Our shop deals in <strong>AC & DC motor rewinding, transformer repair, house wiring, fan rewinding, ABC & starter repair, HEMM spare parts</strong> and general electrical goods supply. We are also authorized dealers of LED bulbs and all types of electrical goods.
              </p>
              <p>
                One of our specialties is <strong>machine-based fan rewinding</strong> — unlike manual winding, our machine ensures precise tension and uniform winding for longer life and better performance.
              </p>
              <p>
                As the market moves online, we are now bringing our 24-year legacy to the digital world — so that customers from across Jharsuguda and Odisha can find us, contact us and order from us easily.
              </p>
            </div>
          </div>

          {/* Founder */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-3xl font-bold text-yellow-700">
                  PK
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pradeep Kumar</h3>
                  <p className="text-yellow-600 font-medium">Founder & Proprietor</p>
                  <p className="text-gray-500 text-sm">Rahul Electrical Works</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-4">
                "For 24 years, our work has spoken for itself. We believe in honest pricing, quality repairs and customer satisfaction. Every motor we rewind, every wire we install — we do it like it's for our own home."
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">24+ Years Experience</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">MCL Contractor</span>
                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">500+ Customers</span>
              </div>
            </div>

            {/* MCL */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🏭</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">MCL Approved Contractor</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Rahul Electrical Works is an approved contractor for <strong>Mahanadi Coalfields Limited (MCL)</strong>. We handle heavy electrical maintenance work under MCL tenders — motors, panels, starters and HEMM equipment.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">📍 Find Us</h4>
              <p className="text-gray-600 text-sm mb-3">Near Orient Post Office, Budhijam, Orient Colliery, Brajrajnagar, Jharsuguda, Odisha — 768233</p>
              <div className="space-y-2">
                <a href="tel:9124312684" className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm font-medium">
                  📞 9124312684
                </a>
                <a href="tel:8895626074" className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm font-medium">
                  📞 8895626074
                </a>
                <a href="mailto:rahulelecworks@gmail.com" className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm font-medium">
                  ✉️ rahulelecworks@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-600 font-semibold mb-2">Our Journey</p>
            <h2 className="text-3xl font-bold text-gray-900">24 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-yellow-200"></div>
            <div className="space-y-8">
              {TIMELINE.map((t) => (
                <div key={t.year} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shrink-0 relative z-10">
                    {t.year}
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1 mt-3">
                    <p className="text-gray-700">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services we offer */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-yellow-600 font-semibold mb-2">What We Do</p>
          <h2 className="text-3xl font-bold text-gray-900">Our Complete Service Range</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_DETAIL.map((s) => (
            <div key={s.name} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-yellow-300 hover:bg-yellow-50 transition-all">
              <span className="text-3xl block mb-3">{s.icon}</span>
              <h3 className="font-bold text-gray-900 text-sm mb-2">{s.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-500 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to work with us?</h2>
          <p className="text-gray-800 mb-6">Call, WhatsApp or book a service online</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/bookings" className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              🔧 Book a Service
            </Link>
            <a href="https://wa.me/919124312684" target="_blank" rel="noreferrer"
              className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
              💬 WhatsApp Us
            </a>
            <Link href="/contact" className="border-2 border-gray-900 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors">
              📍 Find Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
