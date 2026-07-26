"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/product/ProductCard";
import { getProducts, getCategories } from "../../lib/api";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("created_at");
  const [page, setPage] = useState(1);

  const load = useCallback(() => {
    setLoading(true);
    const params: any = { page, limit: 20, sort };
    if (search) params.search = search;
    if (category) params.category = category;
    getProducts(params)
      .then((r) => { setProducts(r.data.products); setTotal(r.data.total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, sort, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { getCategories().then((r) => setCategories(r.data)).catch(() => {}); }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Electrical Products</h1>
        <p className="text-gray-500 text-sm mt-1">LED Bulbs, Cables, Switches, Spare Parts & More</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Categories</h3>
              <div className="space-y-1">
                <button onClick={() => { setCategory(""); setPage(1); }}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!category ? "bg-yellow-100 text-yellow-800 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => { setCategory(cat.slug); setPage(1); }}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${category === cat.slug ? "bg-yellow-100 text-yellow-800 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    {cat.name} <span className="float-right text-gray-400">{cat.product_count}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Sort By</h3>
              <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="created_at">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <input type="text" placeholder="Search electrical products..."
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          </div>
          <p className="text-sm text-gray-500 mb-4">{total} products found</p>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-xl h-52 animate-pulse" />)}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {page > 1 && <button onClick={() => setPage(page - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">← Prev</button>}
                {total > page * 20 && <button onClick={() => setPage(page + 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next →</button>}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><ProductsContent /></Suspense>;
}
