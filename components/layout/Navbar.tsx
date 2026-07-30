"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "../../lib/cartStore";
import { useWishlistStore } from "../../lib/wishlistStore";
import { useAuthStore } from "../../lib/authStore";
import { useLangStore } from "../../lib/langStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { count } = useCartStore();
  const { count: wishlistCount, load: loadWishlist, loaded: wishlistLoaded, reset: resetWishlist } = useWishlistStore();
  const { user, logout, isLoggedIn } = useAuthStore();
  const { lang, setLang } = useLangStore();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn() && !wishlistLoaded) loadWishlist();
    if (!isLoggedIn() && wishlistLoaded) resetWishlist();
  }, [isLoggedIn, wishlistLoaded, loadWishlist, resetWishlist]);

  const handleLogout = () => { logout(); resetWishlist(); };

  const nav = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:9124312684" className="hover:text-yellow-400 transition-colors">📞 9124312684</a>
            <span className="text-gray-600">|</span>
            <a href="tel:8895626074" className="hover:text-yellow-400 transition-colors">📞 8895626074</a>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-gray-400">📍 Brajrajnagar, Jharsuguda, Odisha</span>
            <a href="https://wa.me/918895626074" target="_blank" rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 px-2 py-0.5 rounded text-white transition-colors">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-gray-900 text-lg">
            R
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm leading-tight">Rahul Electrical</p>
            <p className="text-xs text-gray-500 leading-tight">Works • Est. 2001</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-yellow-500 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="hidden sm:block text-xs border border-gray-300 rounded-full px-2 py-1 text-gray-600 hover:bg-gray-50">
            {lang === "en" ? "हिं" : "EN"}
          </button>

          <Link href="/wishlist" className="relative p-2">
            <span className="text-xl">♡</span>
            {wishlistCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount()}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2">
            <span className="text-xl">🛒</span>
            {count() > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count()}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                {user.name?.split(" ")[0] || "Account"}
              </button>
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-44 hidden group-hover:block">
                <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                <Link href="/account?tab=bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/account" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
              Login
            </Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-600">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href ? "bg-yellow-100 text-yellow-800" : "text-gray-700 hover:bg-gray-50"
              }`}>
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-3">
            <a href="tel:9124312684" className="text-sm text-gray-600">📞 9124312684</a>
            <a href="tel:8895626074" className="text-sm text-gray-600">📞 8895626074</a>
          </div>
        </div>
      )}
    </header>
  );
}
