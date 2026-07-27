"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, createReview } from "../../../lib/api";
import { useCartStore } from "../../../lib/cartStore";
import { useAuthStore } from "../../../lib/authStore";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    if (!slug) return;
    getProduct(slug as string).then((r) => setProduct(r.data)).catch(console.error).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>;
  if (!product) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-red-500">Product not found</div>;

  const waMsg = encodeURIComponent(`Hello Rahul Electrical Works,\n\nI want to order:\nProduct: ${product.name}\nPrice: ₹${product.price}\n\nName:\nPhone:\nAddress:`);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url || "" });
    router.push("/cart");
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push("/account"); return; }
    setSubmittingReview(true);
    try {
      await createReview({ product_id: product.id, rating, comment });
      setReviewMsg("Review submitted! It will appear after approval.");
      setComment("");
    } catch (err: any) {
      setReviewMsg(err.response?.data?.message || "Failed to submit review");
    } finally { setSubmittingReview(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full aspect-square object-cover" />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center text-8xl bg-gray-50">📦</div>
          )}
        </div>
        <div>
          {product.category_name && <p className="text-sm text-yellow-600 font-medium mb-2">{product.category_name}</p>}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          {Number(product.avg_rating) > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">{"★".repeat(Math.round(Number(product.avg_rating)))}</span>
              <span className="text-sm text-gray-500">{Number(product.avg_rating).toFixed(1)} ({product.review_count} reviews)</span>
            </div>
          )}
          <p className="text-3xl font-bold text-gray-900 mb-4">₹{product.price}</p>
          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium text-sm">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500 font-medium text-sm">✕ Out of Stock</span>
            )}
          </div>
          {product.description && <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium text-gray-700">Qty:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50">−</button>
                <span className="px-4 py-2 text-sm font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-50">+</button>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            {product.stock > 0 && (
              <>
                <button onClick={handleAddToCart} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors">🛒 Add to Cart</button>
                <button onClick={handleAddToCart} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors">⚡ Buy Now</button>
              </>
            )}
            <a href={`https://wa.me/918895626074?text=${waMsg}`} target="_blank" rel="noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-center transition-colors">💬 WhatsApp</a>
          </div>
          {product.brand && <p className="mt-4 text-sm text-gray-500">Brand: <span className="font-medium text-gray-700">{product.brand}</span></p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((r: any) => (
                <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm">{r.user_name || "Customer"}</p>
                    <span className="text-yellow-400 text-sm">{"★".repeat(r.rating)}</span>
                  </div>
                  {r.comment && <p className="text-gray-600 text-sm">{r.comment}</p>}
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 text-sm">No reviews yet.</p>}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h2>
          <form onSubmit={handleReview} className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)}
                    className={`text-2xl transition-transform hover:scale-110 ${n <= rating ? "text-yellow-400" : "text-gray-200"}`}>★</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Share your experience..." />
            </div>
            {reviewMsg && <p className="text-sm text-green-600">{reviewMsg}</p>}
            <button type="submit" disabled={submittingReview}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-lg font-medium text-sm disabled:opacity-60">
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
