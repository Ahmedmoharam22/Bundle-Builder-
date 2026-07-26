import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { productMap, categoryProductIdsMap, initialSelectedItems } from '../data/products';
import { Product } from '../types/product';
import { makeCartKey, StepType } from './helpers';

export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  selectedColor?: string;
}

interface BundleState {
  items: Record<string, CartItem>;
  activeVariants: Record<string, string>;
  openStep: StepType | number;

  // Actions
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setOpenStep: (step: StepType | number) => void;
  clearCart: () => void;

  // Getters / Computed
  getItemQuantity: (productId: string, variantId: string | null) => number;
  getActiveVariantQuantity: (product: Product) => number;
  getStepSelectedCount: (categoryId: string) => number;

  // Pricing Calculations
  getTotals: () => {
    subtotal: number;
    total: number;
    savings: number;
    shipping: number;
  };
}

export const useBundleStore = create<BundleState>()(
  persist(
    (set, get) => ({
      //  Seed Initial State from JSON
      items: initialSelectedItems as Record<string, CartItem>,

      activeVariants: {
        'wyze-cam-v4': 'white',
        'wyze-cam-pan-v3': 'white',
        'wyze-cam-floodlight-v2': 'white',
        'wyze-battery-cam-pro': 'white',
      },

      openStep: 'cameras', // Step 1 is open on load

      setOpenStep: (step) => set({ openStep: step }),

      setActiveVariant: (productId, variantId) =>
        set((state) => ({
          activeVariants: { ...state.activeVariants, [productId]: variantId },
        })),

      setQuantity: (productId, variantId, quantity) =>
        set((state) => {
          const key = makeCartKey(productId, variantId);
          const newItems = { ...state.items };

          if (quantity <= 0) {
            delete newItems[key];
          } else {
            newItems[key] = {
              productId,
              variantId,
              quantity,
            };
          }

          return { items: newItems };
        }),

      clearCart: () => set({ items: {} }),

      getItemQuantity: (productId, variantId) => {
        const key = makeCartKey(productId, variantId);
        return get().items[key]?.quantity || 0;
      },

      getActiveVariantQuantity: (product) => {
        const activeVariantId =
          product.variants.length > 0
            ? get().activeVariants[product.id] || product.variants[0].id
            : null;
        return get().getItemQuantity(product.id, activeVariantId);
      },

      // Optimized to O(N) using pre-calculated Category Product IDs Set
      getStepSelectedCount: (categoryId) => {
        const items = get().items;
        const categoryProductIds = categoryProductIdsMap.get(categoryId);

        if (!categoryProductIds) return 0;

        const selectedProductIds = new Set<string>();

        Object.values(items).forEach((item) => {
          if (item.quantity > 0 && categoryProductIds.has(item.productId)) {
            selectedProductIds.add(item.productId);
          }
        });

        return selectedProductIds.size;
      },

      // Optimized to O(N) using Map lookup instead of Array.find()
      getTotals: () => {
        const items = get().items;
        let subtotal = 0;
        let total = 0;
        const shipping = 0;

        Object.values(items).forEach((item) => {
          const product = productMap.get(item.productId);
          if (product) {
            subtotal += product.basePrice * item.quantity;
            total += product.salePrice * item.quantity;
          }
        });

        const savings = subtotal - total;

        return { subtotal, total, savings, shipping };
      },
    }),
    {
      name: 'bundle-builder-storage',
      // Persist only cart items and user selections (openStep resets to step 1 on load)
      partialize: (state) => ({
        items: state.items,
        activeVariants: state.activeVariants,
      }),
    }
  )
);