import { create } from "zustand";
import { getWishlist, addToWishlist, removeFromWishlist } from "./api";

interface WishlistStore {
  ids: Set<string>;
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (productId: string) => Promise<void>;
  has: (productId: string) => boolean;
  count: () => number;
  reset: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ids: new Set(),
  loaded: false,
  load: async () => {
    try {
      const res = await getWishlist();
      set({ ids: new Set(res.data.map((p: any) => p.id)), loaded: true });
    } catch {
      set({ loaded: true });
    }
  },
  toggle: async (productId: string) => {
    const ids = new Set(get().ids);
    const wasIn = ids.has(productId);
    // optimistic update
    if (wasIn) ids.delete(productId); else ids.add(productId);
    set({ ids });
    try {
      if (wasIn) await removeFromWishlist(productId);
      else await addToWishlist(productId);
    } catch {
      // revert on failure
      const reverted = new Set(get().ids);
      if (wasIn) reverted.add(productId); else reverted.delete(productId);
      set({ ids: reverted });
    }
  },
  has: (productId: string) => get().ids.has(productId),
  count: () => get().ids.size,
  reset: () => set({ ids: new Set(), loaded: false }),
}));
