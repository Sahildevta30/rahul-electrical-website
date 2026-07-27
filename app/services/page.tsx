import Link from "next/link";

const SERVICES = [
  {
    icon: "⚙️",
    name: "AC & DC Motor Rewinding",
    desc: "Professional rewinding for single-phase and three-phase motors of all sizes and ratings. We use high-quality copper wire and insulation materials for long-lasting performance.",
    details: ["All motor sizes and ratings", "Single & three phase", "Quality copper wire used", "Industrial & domestic motors"],
    price: "Starting ₹450 (fractional HP)",
  },
  {
    icon: "🔌",
    name: "Transformer Repair",
    desc: "Expert diagnosis and repair of distribution transformers, step-up and step-down transformers. We handle both industrial and domestic transformer maintenance.",
    details: ["Distribution transformers", "Step-up & step-down", "Winding replacement", "Oil testing & refilling"],
    price: "Starting ₹1,500",
  },
  {
    icon: "🏠",
    name: "House Wiring",
    desc: "Complete house wiring, rewiring, electrical fitting and panel installation. Safe, standard and certified work by experienced electricians.",
    details: ["New house wiring", "Rewiring old houses", "Drill panel installation", "Getan box & switch fitting"],
    price: "Starting ₹500/point",
  },
  {
    icon: "🌀",
    name: "Fan Rewinding",
    desc: "Machine-based ceiling fan, table fan and exhaust fan rewinding. Our machine ensures precise tension and uniform winding — better than manual winding.",
    details: ["Machine-based precision winding", "Ceiling, table & exhaust fans", "Capacitor replacement", "Speed regulator repair"],
    price: "Starting ₹250",
  },
  {
    icon: "💧",
    name: "Pump Installation & Repair",
    desc: "Installation, repair and maintenance of water pumps, submersible pumps and agricultural pumps. We handle both domestic and industrial pump systems.",
    details: ["Submersible pumps", "Agricultural pumps", "Motor-pump alignment", "Starter panel wiring"],
    price: "Starting ₹600",
  },
  {
    icon: "⚡",
    name: "ABC & Starter Repair",
    desc: "All types of Air Break Contactor (ABC) and motor starter repair, rewinding and maintenance for industrial applications.",
    details: ["ABC rewinding", "Starter panel repair", "Contactor replacement", "Control circuit repair"],
    price: "Starting ₹700",
  },
  {
    icon: "🏭",
    name: "MCL Industrial Work",
    desc: "Heavy electrical maintenance under MCL (Mahanadi Coalfields Limited) contracts. We handle motors, panels, starters and HEMM electrical systems.",
    details: ["MCL approved contractor", "HEMM electrical systems", "Motor replacement", "Panel maintenance"],
    price: "Contact for quote",
  },
  {
    icon: "🔧",
    name: "General Electrical Repair",
    desc: "All types of electrical repair work — coolers, geysers, stabilizers, inverters and more. If it's electrical, we can fix it.",
    details: ["Cooler & geyser repair", "Stabilizer servicing", "Inverter maintenance", "All electrical appliances"],
    price: "Starting ₹200",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold mb-3">Our Services</p>
          <h1 className="text-4xl font-bold mb-4">Electrical Services Since 2001</h1>
          <p className="text-gray-300 text-lg mb-6">
            Professional electrical repair and installation by Rahul Electrical Works — 25 years of trusted service in Brajrajnagar, Jharsuguda.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/bookings"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors">
              🔧 Book a Service
            </Link>
            <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* MCL badge */}
      <section className="bg-yellow-500 py-3">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-bold text-gray-900 text-sm">
            🏭 MCL Approved Contractor — Mahanadi Coalfields Limited Industrial Electrical Work
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div key={s.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{s.icon}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h2>
                  <span className="text-yellow-600 text-sm font-semibold">{s.price}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1 mb-5">
                {s.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="text-yellow-500 text-xs">✓</span> {d}
                  </li>
                ))}
              </ul>
              <Link href={`/bookings?service=${encodeURIComponent(s.name)}`}
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Book This Service
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Special highlight */}
      <section className="bg-blue-50 border-y border-blue-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-6xl">🌀</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Machine-Based Fan Winding — Our Specialty
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Unlike manual fan winding, our <strong>machine-based winding process</strong> ensures precise tension,
                uniform coil placement and consistent quality across all fans. This results in better performance,
                lower noise and longer motor life. We are one of the few shops in Brajrajnagar with machine-based fan winding capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Need a Service?</h2>
          <p className="text-gray-400 mb-6">Book online or call us directly — we serve Brajrajnagar, Jharsuguda and surrounding areas.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/bookings"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors">
              Book Online
            </Link>
            <a href="tel:9124312684"
              className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-xl transition-colors">
              📞 9124312684
            </a>
            <a href="tel:8895626074"
              className="border border-gray-600 hover:border-white text-white px-8 py-3 rounded-xl transition-colors">
              📞 8895626074
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
