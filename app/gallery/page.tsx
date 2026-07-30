"use client";
import { useEffect, useState } from "react";
import Reveal from "../../components/ui/Reveal";

interface GalleryImage {
  src: string;
  caption: string;
}

// Add more photos here as they become available — just push new entries with the image path and a caption.
const GALLERY: GalleryImage[] = [
  { src: "/images/owner-pradeep-kumar.jpg", caption: "Pradeep Kumar, Founder — Rahul Electrical Works" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold mb-3">Our Work</p>
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-gray-300">A look at our shop, our team and the work we're proud of.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        {GALLERY.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Photos coming soon — check back shortly!</p>
        ) : (
          <Reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(img)}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group relative"
              >
                <img src={img.src} alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs font-medium">{img.caption}</span>
                </div>
              </button>
            ))}
          </Reveal>
        )}

        <div className="text-center mt-12 text-gray-500 text-sm">
          Have photos from a job we did for you? Share them with us on{" "}
          <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer" className="text-green-600 font-medium hover:underline">
            WhatsApp
          </a>{" "}
          — we'd love to feature them here!
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 animate-overlay-in"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-2xl w-full animate-modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button onClick={() => setSelected(null)} className="text-white text-2xl leading-none hover:text-gray-300">✕</button>
            </div>
            <img src={selected.src} alt={selected.caption} className="w-full rounded-xl" />
            <p className="text-white text-center mt-3 text-sm">{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
