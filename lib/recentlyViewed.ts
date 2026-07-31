const KEY = "rew_recently_viewed";
const MAX_ITEMS = 8;

export interface RecentProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url?: string;
  stock: number;
}

export function getRecentlyViewed(excludeId?: string): RecentProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const items: RecentProduct[] = raw ? JSON.parse(raw) : [];
    return excludeId ? items.filter((p) => p.id !== excludeId) : items;
  } catch {
    return [];
  }
}

export function addRecentlyViewed(product: RecentProduct) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    let items: RecentProduct[] = raw ? JSON.parse(raw) : [];
    items = items.filter((p) => p.id !== product.id);
    items.unshift(product);
    items = items.slice(0, MAX_ITEMS);
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable — silently ignore
  }
}
