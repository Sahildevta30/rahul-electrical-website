"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getWishlist, removeFromWishlist } from "../../lib/api";
import { useCartStore } from "../../lib/cartStore";
import { useAuthStore } from "../../lib/authStore";
import { useWishlistStore } from "../../lib/wishlistStore";

export default function WishlistPage() {
  const { isLoggedIn } = useAuthStore();
  const { addItem } = useCartStore();
  const { load: reloadCount } = useWishlistStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    setLoading(true);
    getWishlist()
      .then((r) => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (isLoggedIn()) fetchWishlist(); else setLoading(false); }, []);

  const handleRemove = async (id: string) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    try { await removeFromWishlist(id); reloadCount(); } catch {}
  };

  if (!isLoggedIn()) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔐</p>
        <h2 className="text-xl font-bold mb-2">Please login to view your wishlist</h2>
        <Link href="/account" className="inline-block bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium mt-4">Login / Register</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">♡</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Tap the heart icon on any product to save it here</p>
        <Link href="/products" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-xl">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist ({products.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
            <Link href={`/products/${p.slug}`} className="shrink-0">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📦</div>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              {p.category_name && <p className="text-xs text-gray-400">{p.category_name}</p>}
              <Link href={`/products/${p.slug}`}>
                <p className="font-medium text-gray-900 text-sm truncate hover:text-yellow-600 transition-colors">{p.name}</p>
              </Link>
              <p className="text-yellow-600 font-bold mt-1">₹{p.price}</p>
              {p.stock > 0 ? (
                <p className="text-green-600 text-xs mt-1">In Stock</p>
              ) : (
                <p className="text-red-500 text-xs mt-1">Out of Stock</p>
              )}
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              {p.stock > 0 && (
                <button
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image_url: p.image_url || "" })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap">
                  + Cart
                </button>
              )}
              <button onClick={() => handleRemove(p.id)} className="text-red-400 hover:text-red-600 text-xs">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
