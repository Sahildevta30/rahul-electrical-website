"use client";
import Link from "next/link";
import { useCartStore } from "../../lib/cartStore";

export default function CartPage() {
  const { items, updateQty, removeItem, total, count } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started</p>
        <Link href="/products" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-xl">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({count()} items)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📦</div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center">−</button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center">+</button>
              </div>
              <p className="font-bold text-gray-900 w-20 text-right">₹{item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 ml-2">✕</button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between"><span>Items ({count()})</span><span>₹{total()}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">Free</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span><span>₹{total()}</span>
            </div>
          </div>
          <Link href="/checkout" className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl text-center transition-colors">
            Proceed to Checkout
          </Link>
          <Link href="/products" className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-3">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
