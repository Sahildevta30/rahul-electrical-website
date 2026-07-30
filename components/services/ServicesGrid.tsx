"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ServiceItem {
  icon: string;
  name: string;
  desc: string;
  details: string[];
  price: string;
}

export default function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelected(s)}
            className="text-left bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-yellow-200 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{s.icon}</span>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{s.name}</h2>
                <span className="text-yellow-600 text-sm font-semibold">{s.price}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
            <ul className="space-y-1 mb-2">
              {s.details.slice(0, 2).map((d) => (
                <li key={d} className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="text-yellow-500 text-xs">✓</span> {d}
                </li>
              ))}
            </ul>
            <span className="inline-block text-yellow-600 text-sm font-medium mt-2">View details →</span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-overlay-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-modal-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.icon}</span>
                <h3 className="font-bold text-gray-900 text-lg">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="p-5">
              <p className="text-yellow-600 font-bold text-lg mb-3">{selected.price}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.desc}</p>
              <ul className="space-y-2 mb-6">
                {selected.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="text-yellow-500">✓</span> {d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/bookings?service=${encodeURIComponent(selected.name)}`}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-sm px-5 py-3 rounded-xl text-center transition-colors">
                  Book This Service
                </Link>
                <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-5 py-3 rounded-xl text-center transition-colors">
                  💬 Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
