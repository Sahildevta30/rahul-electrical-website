"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "../../lib/cartStore";
import { useAuthStore } from "../../lib/authStore";
import { createOrder } from "../../lib/api";
import LocalitySelect from "../components/ui/LocalitySelect";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", address: "", city: "", state: "", pincode: "", payment_method: "cod" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "found" | "not_found">("idle");

  if (!user) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">🔐</p>
      <h2 className="text-xl font-bold mb-2">Please login to checkout</h2>
      <Link href="/account" className="inline-block bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium mt-4">Login / Register</Link>
    </div>
  );

  if (items.length === 0) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">🛒</p>
      <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
      <Link href="/products" className="inline-block bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium mt-4">Shop Now</Link>
    </div>
  );

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const lookupPincode = async (pincode: string) => {
    setPincodeStatus("loading");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      const result = data?.[0];
      if (result?.Status === "Success" && result.PostOffice?.length) {
        const localities: string[] = Array.from(
          new Set(result.PostOffice.map((po: any) => po.Name as string))
        );
        setCityOptions(localities);
        setForm((f) => ({
          ...f,
          city: f.city || localities[0],
          state: result.PostOffice[0].State || f.state,
        }));
        setPincodeStatus("found");
      } else {
        setCityOptions([]);
        setPincodeStatus("not_found");
      }
    } catch {
      setCityOptions([]);
      setPincodeStatus("not_found");
    }
  };

  const handlePincodeChange = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 6);
    set("pincode", digits);
    if (digits.length === 6) {
      lookupPincode(digits);
    } else {
      setPincodeStatus("idle");
      setCityOptions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await createOrder({ items: items.map((i) => ({ product_id: i.id, quantity: i.quantity })), payment_method: form.payment_method, shipping_name: form.name, shipping_phone: form.phone, shipping_address: form.address, shipping_city: form.city, shipping_state: form.state, shipping_pincode: form.pincode });
      clearCart();
      router.push("/account?tab=orders&success=1");
    } catch (err: any) {
      setError(err.response?.data?.message || "Order failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Delivery Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Address *</label><textarea required rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input
                  inputMode="numeric"
                  value={form.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="6-digit PIN"
                />
                {pincodeStatus === "loading" && <p className="text-xs text-gray-400 mt-1">Looking up area…</p>}
                {pincodeStatus === "not_found" && form.pincode.length === 6 && (
                  <p className="text-xs text-amber-600 mt-1">Couldn't auto-detect — please fill City/State manually.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Area</label>
                <LocalitySelect
                  value={form.city}
                  onChange={(v) => set("city", v)}
                  options={cityOptions}
                  placeholder="Search or type your area"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Auto-filled from PIN code" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-yellow-400">
              <input type="radio" name="payment" value="cod" checked={form.payment_method === "cod"} onChange={() => set("payment_method", "cod")} />
              <div><p className="font-medium text-sm text-gray-900">Cash on Delivery</p><p className="text-xs text-gray-500">Pay when you receive</p></div>
            </label>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">{item.name} ×{item.quantity}</span>
                <span className="font-medium shrink-0">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
            <span>Total</span><span>₹{total()}</span>
          </div>
          <button type="submit" disabled={loading} className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
