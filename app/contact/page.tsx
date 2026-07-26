export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-400 font-semibold mb-3">Contact Us</p>
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-300">We're available 6 days a week. Call, WhatsApp or visit us!</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Phone */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-3">📞</span>
              <h3 className="font-bold text-gray-900 mb-3">Call Us</h3>
              <a href="tel:9124312684" className="block text-yellow-600 font-bold text-lg hover:underline mb-1">9124312684</a>
              <a href="tel:8895626074" className="block text-yellow-600 font-bold text-lg hover:underline">8895626074</a>
              <p className="text-gray-400 text-xs mt-2">Mon–Sat: 9AM – 7PM</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <span className="text-3xl block mb-3">💬</span>
              <h3 className="font-bold text-gray-900 mb-2">WhatsApp Order</h3>
              <p className="text-gray-600 text-sm mb-4">Send us your requirements on WhatsApp — quick response!</p>
              <a href="https://wa.me/919124312684?text=Hello%20Rahul%20Electrical%20Works%2C%20I%20need%20help%20with%20electrical%20work."
                target="_blank" rel="noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Open WhatsApp Chat
              </a>
            </div>

            {/* Email */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-3">✉️</span>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:rahulelecworks@gmail.com"
                className="text-yellow-600 hover:underline text-sm break-all">
                rahulelecworks@gmail.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6">
              <span className="text-3xl block mb-3">📍</span>
              <h3 className="font-bold text-gray-900 mb-2">Visit Our Shop</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Near Orient Post Office,<br />
                Budhijam, Orient Colliery,<br />
                Brajrajnagar, Jharsuguda,<br />
                Odisha — 768233
              </p>
              <a href="https://maps.google.com/?q=Brajrajnagar+Jharsuguda+Orient+Colliery+Odisha"
                target="_blank" rel="noreferrer"
                className="inline-block border border-yellow-500 text-yellow-700 font-medium px-4 py-2 rounded-xl text-sm hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                Get Directions →
              </a>
            </div>

            {/* Timings */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-3">🕐</span>
              <h3 className="font-bold text-gray-900 mb-3">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday – Saturday</span>
                  <span className="font-medium text-gray-900">9AM – 7PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map + WhatsApp order panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map embed */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">📍 Our Location — Brajrajnagar, Jharsuguda</h3>
              </div>
              <iframe
                title="Rahul Electrical Works Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.123456789!2d83.9161!3d21.8345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrajrajnagar%2C+Jharsuguda%2C+Odisha!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* WhatsApp order template */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">💬 Order via WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-5">
                Send us this message on WhatsApp with your details — we'll reply within 30 minutes during working hours.
              </p>

              <div className="bg-green-50 rounded-xl p-4 font-mono text-sm text-gray-700 leading-relaxed mb-5 border border-green-100">
                Hello Rahul Electrical Works,<br /><br />
                I need help with:<br />
                Service/Product: ___________<br /><br />
                My Name: ___________<br />
                Phone: ___________<br />
                Address: ___________<br />
                Preferred Date: ___________
              </div>

              <div className="flex gap-3">
                <a href={`https://wa.me/919124312684?text=${encodeURIComponent("Hello Rahul Electrical Works,\n\nI need help with:\nService/Product:\n\nMy Name:\nPhone:\nAddress:\nPreferred Date:")}`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-center transition-colors">
                  💬 Open on WhatsApp: 9124312684
                </a>
              </div>
            </div>

            {/* What we deal in */}
            <div className="bg-gray-900 text-white rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">⚡ What We Deal In</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                <div className="space-y-2">
                  <p>✅ AC & DC Motors</p>
                  <p>✅ Transformers</p>
                  <p>✅ Starters & ABC</p>
                  <p>✅ Electrical Equipment</p>
                </div>
                <div className="space-y-2">
                  <p>✅ HEMM Spare Parts</p>
                  <p>✅ LED Bulbs</p>
                  <p>✅ Mechanical Items</p>
                  <p>✅ General Order Supply</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-yellow-400 text-sm font-semibold">🏭 MCL Approved Contractor • Est. 2002 • Brajrajnagar, Odisha</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
