"use client";
import { useState } from "react";
import Link from "next/link";
import Reveal from "../../components/ui/Reveal";

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We primarily serve Brajrajnagar, Jharsuguda and surrounding MCL areas including Orient Colliery, Lajkura, Samleswari, Bundia and Lakhanpur. We also ship select products across Odisha via courier.",
  },
  {
    q: "How do I book a service (motor rewinding, house wiring, etc.)?",
    a: "You can book online through our 'Book Service' page, call us directly at 9124312684 / 8895626074, or message us on WhatsApp. We'll confirm your appointment and technician details.",
  },
  {
    q: "Do you offer machine-based fan rewinding?",
    a: "Yes — unlike manual winding, our machine-based fan rewinding ensures precise tension and uniform coil placement, resulting in better performance and longer motor life.",
  },
  {
    q: "Are you an MCL approved contractor?",
    a: "Yes, Rahul Electrical Works is a trusted electrical contractor for Mahanadi Coalfields Limited (MCL), handling ACB, VCB, geten box, pump motor, transformer and other electrical work across several MCL areas.",
  },
  {
    q: "What payment methods do you accept for online orders?",
    a: "Currently we accept Cash on Delivery (COD) for online product orders. For services, payment is collected upon completion of work.",
  },
  {
    q: "How will my order be delivered?",
    a: "Orders within Brajrajnagar and Jharsuguda are delivered directly by us. For other parts of Odisha, we ship via courier — you'll receive tracking details once your order is dispatched.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "If a product is defective or damaged on arrival, contact us within 48 hours via phone or WhatsApp and we'll arrange a replacement or refund. Please check the product before use.",
  },
  {
    q: "Do you provide warranty on repairs?",
    a: "Yes, most repair work (motor rewinding, transformer repair, etc.) comes with a service warranty. Ask our technician for specific warranty terms at the time of service.",
  },
  {
    q: "What are your working hours?",
    a: "We're open Monday to Saturday, 9 AM to 7 PM. We're closed on Sundays. For urgent electrical issues, call us directly and we'll do our best to help.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold mb-3">Got Questions?</p>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300">Everything you need to know about our services, orders and delivery.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <Reveal className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span className={`text-yellow-500 text-xl shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 text-sm leading-relaxed px-5 pb-5">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="text-center mt-12 bg-yellow-50 rounded-2xl p-8">
          <p className="text-gray-700 font-medium mb-4">Still have a question?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              💬 Ask on WhatsApp
            </a>
            <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
