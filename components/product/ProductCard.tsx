"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "../../lib/cartStore";
import { useWishlistStore } from "../../lib/wishlistStore";
import { useAuthStore } from "../../lib/authStore";

interface Product {
  id: string; name: string; slug: string; price: number;
  stock: number; image_url?: string; category_name?: string;
  avg_rating?: number; review_count?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { has, toggle, load, loaded } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn() && !loaded) load();
  }, [isLoggedIn, loaded, load]);

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group relative">
      <button
        onClick={handleWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <span className={inWishlist ? "text-red-500" : "text-gray-300"}>{inWishlist ? "♥" : "♡"}</span>
      </button>
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
  );
}
