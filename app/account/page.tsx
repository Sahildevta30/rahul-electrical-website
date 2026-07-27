"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../lib/authStore";
import { login, register, sendOtp, verifyOtp, getMyOrders, getMyBookings } from "../../lib/api";

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800", delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800", assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-orange-100 text-orange-800", completed: "bg-green-100 text-green-800",
};

function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setAuth, logout } = useAuthStore();
  const [tab, setTab] = useState(searchParams.get("tab") || "orders");
  const [authMode, setAuthMode] = useState<"login"|"register"|"otp">("login");
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const success = searchParams.get("success");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!user) return;
    getMyOrders().then((r) => setOrders(r.data)).catch(console.error);
    getMyBookings().then((r) => setBookings(r.data)).catch(console.error);
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try { const r = await login(email, password); setAuth(r.data.user, r.data.token); }
    catch (err: any) { setError(err.response?.data?.message || "Login failed"); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try { const r = await register({ name, email, password, phone }); setAuth(r.data.user, r.data.token); }
    catch (err: any) { setError(err.response?.data?.message || "Registration failed"); }
    finally { setLoading(false); }
  };

  const handleSendOtp = async () => {
    setLoading(true); setError("");
    try { await sendOtp(phone); setAuthMode("otp"); }
    catch (err: any) { setError(err.response?.data?.message || "Failed to send OTP"); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    try { const r = await verifyOtp(phone, otp, name); setAuth(r.data.user, r.data.token); }
    catch (err: any) { setError(err.response?.data?.message || "OTP verification failed"); }
    finally { setLoading(false); }
  };

  if (!user) return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-gray-900 text-xl mx-auto mb-3">R</div>
          <h1 className="text-xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-500 text-sm">Rahul Electrical Works</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">{error}</div>}
        {authMode === "otp" ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600 text-center">OTP sent to <strong>{phone}</strong></p>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label><input required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center tracking-widest text-lg" /></div>
            <button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-xl disabled:opacity-60">{loading ? "Verifying..." : "Verify OTP"}</button>
            <button type="button" onClick={() => setAuthMode("login")} className="w-full text-sm text-gray-500 hover:text-gray-700">← Back</button>
          </form>
        ) : (
          <>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
              {(["login","register"] as const).map((m) => (
                <button key={m} onClick={() => { setAuthMode(m); setError(""); }} className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${authMode === m ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>{m}</button>
              ))}
            </div>
            {authMode === "login" ? (
              <>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                  <button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-xl disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
                </form>
                <div className="relative text-center text-xs text-gray-400 my-2"><span className="bg-white px-2 relative z-10">or login with phone</span><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div></div>
                <div className="flex gap-2">
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                  <button type="button" onClick={handleSendOtp} disabled={loading || !phone} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40">Get OTP</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Password *</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                <button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-xl disabled:opacity-60">{loading ? "Registering..." : "Create Account"}</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">My Account</h1><p className="text-gray-500 text-sm">Welcome, {user.name || user.phone}</p></div>
        <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 border border-red-200 px-4 py-2 rounded-xl">Logout</button>
      </div>
      {success && <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6 text-sm">✅ Your order has been placed successfully!</div>}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {["orders","bookings"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${tab === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
            {t === "orders" ? `My Orders (${orders.length})` : `My Bookings (${bookings.length})`}
          </button>
        ))}
      </div>
      {tab === "orders" && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl"><p className="text-4xl mb-3">📦</p><p className="text-gray-500 mb-4">No orders yet</p><Link href="/products" className="inline-block bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm">Shop Now</Link></div>
          ) : orders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div><p className="font-semibold text-gray-900">Order #{o.id.slice(0,8).toUpperCase()}</p><p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}</p></div>
                <div className="text-right"><span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLOR[o.order_status] || "bg-gray-100"}`}>{o.order_status}</span><p className="font-bold text-gray-900 mt-1">₹{o.total_amount}</p></div>
              </div>
              <p className="text-xs text-gray-400">Payment: {o.payment_method?.toUpperCase()} · {o.payment_status}</p>
            </div>
          ))}
        </div>
      )}
      {tab === "bookings" && (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl"><p className="text-4xl mb-3">🔧</p><p className="text-gray-500 mb-4">No bookings yet</p><Link href="/bookings" className="inline-block bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm">Book a Service</Link></div>
          ) : bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div><p className="font-semibold text-gray-900">{b.service_type}</p><p className="text-sm text-gray-500 mt-0.5">{b.address}</p></div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLOR[b.status] || "bg-gray-100"}`}>{b.status.replace("_"," ")}</span>
              </div>
              {b.admin_notes && <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mt-3">📌 {b.admin_notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AccountContent /></Suspense>;
}
