import Link from "next/link";
import ServicesGrid from "../../components/services/ServicesGrid";

const SERVICES = [
  {
    icon: "⚙️",
    name: "AC & DC Motor Rewinding",
    desc: "Professional rewinding for single-phase and three-phase motors of all sizes and ratings. We use high-quality copper wire and insulation materials for long-lasting performance.",
    details: ["All motor sizes and ratings", "Single & three phase", "Quality copper wire used", "Industrial & domestic motors"],
    price: "Starting ₹450 (fractional HP)",
    key: "price_motor_rewinding",
  },
  {
    icon: "🔌",
    name: "Transformer Repair",
    desc: "Expert diagnosis and repair of distribution transformers, step-up and step-down transformers. We handle both industrial and domestic transformer maintenance.",
    details: ["Distribution transformers", "Step-up & step-down", "Winding replacement", "Oil testing & refilling"],
    price: "Starting ₹1,500",
    key: "price_transformer_repair",
  },
  {
    icon: "🏠",
    name: "House Wiring",
    desc: "Complete house wiring, rewiring, electrical fitting and panel installation. Safe, standard and certified work by experienced electricians.",
    details: ["New house wiring", "Rewiring old houses", "Drill panel installation", "Getan box & switch fitting"],
    price: "Starting ₹500/point",
    key: "price_house_wiring",
  },
  {
    icon: "🌀",
    name: "Fan Rewinding",
    desc: "Machine-based ceiling fan, table fan and exhaust fan rewinding. Our machine ensures precise tension and uniform winding — better than manual winding.",
    details: ["Machine-based precision winding", "Ceiling, table & exhaust fans", "Capacitor replacement", "Speed regulator repair"],
    price: "Starting ₹250",
    key: "price_fan_rewinding",
  },
  {
    icon: "💧",
    name: "Pump Installation & Repair",
    desc: "Installation, repair and maintenance of water pumps, submersible pumps and agricultural pumps. We handle both domestic and industrial pump systems.",
    details: ["Submersible pumps", "Agricultural pumps", "Motor-pump alignment", "Starter panel wiring"],
    price: "Starting ₹600",
    key: "price_pump_repair",
  },
  {
    icon: "⚡",
    name: "ABC & Starter Repair",
    desc: "All types of Air Break Contactor (ABC) and motor starter repair, rewinding and maintenance for industrial applications.",
    details: ["ABC rewinding", "Starter panel repair", "Contactor replacement", "Control circuit repair"],
    price: "Starting ₹700",
    key: "price_abc_starter",
  },
  {
    icon: "🏭",
    name: "MCL Industrial Work",
    desc: "Heavy electrical maintenance under MCL (Mahanadi Coalfields Limited) contracts. We handle motors, panels, starters and HEMM electrical systems.",
    details: ["MCL approved contractor", "HEMM electrical systems", "Motor replacement", "Panel maintenance"],
    price: "Contact for quote",
    key: "price_mcl_work",
  },
  {
    icon: "🔧",
    name: "General Electrical Repair",
    desc: "All types of electrical repair work — coolers, geysers, stabilizers, inverters and more. If it's electrical, we can fix it.",
    details: ["Cooler & geyser repair", "Stabilizer servicing", "Inverter maintenance", "All electrical appliances"],
    price: "Starting ₹200",
    key: "price_general_repair",
  },
];

async function getLivePrices(): Promise<Record<string, string>> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${API_URL}/settings`, { cache: "no-store" });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export default async function ServicesPage() {
  const liveSettings = await getLivePrices();
  const services = SERVICES.map((s) => ({
    ...s,
    price: liveSettings[s.key] || s.price,
  }));
  return (
    <div className="surface-circuit">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-10 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob-delay" />
        <div className="relative max-w-4xl mx-auto text-center">
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
        <ServicesGrid services={services} />
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
      <section className="surface-circuit-dark text-white py-14 px-4">
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
