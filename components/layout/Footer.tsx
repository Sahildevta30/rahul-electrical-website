import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-gray-900 text-lg">R</div>
            <div>
              <p className="font-black text-white text-sm">Rahul Electrical Works</p>
              <p className="text-xs text-gray-500">Est. 2001</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Your Trusted Electrical Partner Since 2001. MCL approved contractor serving Brajrajnagar and Jharsuguda.
          </p>
          <div className="flex gap-3">
            <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-2 rounded-lg transition-colors">
              💬 WhatsApp
            </a>
            <a href="tel:9124312684"
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-2 rounded-lg transition-colors">
              📞 Call
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <Link href="/" className="block text-gray-400 hover:text-yellow-400 transition-colors">Home</Link>
            <Link href="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link>
            <Link href="/services" className="block text-gray-400 hover:text-yellow-400 transition-colors">Services</Link>
            <Link href="/products" className="block text-gray-400 hover:text-yellow-400 transition-colors">Products</Link>
            <Link href="/bookings" className="block text-gray-400 hover:text-yellow-400 transition-colors">Book Service</Link>
            <Link href="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Our Services</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>⚙️ AC & DC Motor Rewinding</p>
            <p>🔌 Transformer Repair</p>
            <p>🏠 House Wiring</p>
            <p>🌀 Fan Rewinding</p>
            <p>💧 Pump Installation</p>
            <p>🏭 MCL Industrial Work</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm">Contact Us</h3>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span>📍</span>
              <p className="text-gray-400">Near Orient Post Office, Budhijam, Orient Colliery, Brajrajnagar, Jharsuguda, Odisha — 768233</p>
            </div>
            <div className="flex gap-2 items-center">
              <span>📞</span>
              <div>
                <a href="tel:9124312684" className="text-gray-400 hover:text-yellow-400 block transition-colors">9124312684</a>
                <a href="tel:8895626074" className="text-gray-400 hover:text-yellow-400 block transition-colors">8895626074</a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span>✉️</span>
              <a href="mailto:rahulelecworks@gmail.com" className="text-gray-400 hover:text-yellow-400 transition-colors break-all">
                rahulelecworks@gmail.com
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <span>🕐</span>
              <p className="text-gray-400">Mon–Sat: 9AM – 7PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Rahul Electrical Works. All rights reserved.</p>
          <p>Proprietor: Pradeep Kumar | Brajrajnagar, Jharsuguda, Odisha</p>
        </div>
      </div>
    </footer>
  );
}
