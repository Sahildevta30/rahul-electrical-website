"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "../../lib/cartStore";
import { useWishlistStore } from "../../lib/wishlistStore";
import { useAuthStore } from "../../lib/authStore";

interface Product {
  id: string; name: string; slug: string; price: number;
  stock: number; image_url?: string; category_name?: string;
  avg_rating?: number; review_count?: number; description?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { has, toggle, load, loaded } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const [quickView, setQuickView] = useState(false);

  useEffect(() => {
    if (isLoggedIn() && !loaded) load();
  }, [isLoggedIn, loaded, load]);

  useEffect(() => {
    if (!quickView) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setQuickView(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quickView]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      window.location.href = "/account";
      return;
    }
    toggle(product.id);
  };

  const inWishlist = has(product.id);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative">
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <span className={inWishlist ? "text-red-500" : "text-gray-300"}>{inWishlist ? "♥" : "♡"}</span>
        </button>

        <div className="relative">
          <Link href={`/products/${product.slug}`}>
            <div className="aspect-square bg-gray-50 overflow-hidden">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
              )}
            </div>
          </Link>
          <button
            onClick={(e) => { e.preventDefault(); setQuickView(true); }}
            className="absolute bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur text-white text-xs font-medium py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            👁 Quick View
          </button>
        </div>

        <div className="p-3">
          {product.category_name && <p className="text-xs text-gray-400 mb-1">{product.category_name}</p>}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-yellow-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          {product.avg_rating && Number(product.avg_rating) > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs text-gray-500">{Number(product.avg_rating).toFixed(1)}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <p className="font-bold text-gray-900">₹{product.price}</p>
            {product.stock > 0 ? (
              <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url || "" })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors">
                + Cart
              </button>
            ) : (
              <span className="text-red-500 text-xs font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {quickView && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-overlay-in"
          onClick={() => setQuickView(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Quick View</h3>
              <button onClick={() => setQuickView(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              <div className="w-full sm:w-40 aspect-square bg-gray-50 rounded-xl overflow-hidden shrink-0">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                )}
              </div>
              <div className="flex-1">
                {product.category_name && <p className="text-xs text-yellow-600 font-medium mb-1">{product.category_name}</p>}
                <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                {product.avg_rating && Number(product.avg_rating) > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs text-gray-500">{Number(product.avg_rating).toFixed(1)} ({product.review_count || 0} reviews)</span>
                  </div>
                )}
                <p className="text-2xl font-bold text-gray-900 mb-3">₹{product.price}</p>
                {product.stock > 0 ? (
                  <p className="text-green-600 text-xs font-medium mb-3">✓ In Stock</p>
                ) : (
                  <p className="text-red-500 text-xs font-medium mb-3">✕ Out of Stock</p>
                )}
                <div className="flex gap-2">
                  {product.stock > 0 && (
                    <button
                      onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url || "" }); setQuickView(false); }}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-sm py-2.5 rounded-xl transition-colors">
                      🛒 Add to Cart
                    </button>
                  )}
                  <Link href={`/products/${product.slug}`}
                    className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-sm py-2.5 rounded-xl text-center transition-colors">
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
