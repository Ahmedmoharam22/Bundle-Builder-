import { useCallback } from "react";
import { useBundleStore } from "@/store/useBundleStore";
import type { Product } from "@/types/product";
import { getActiveVariantId, isProductSelected } from "@/lib/helpers";

export interface UseProductCardReturn {
  activeVariantId: string | null;
  activeQuantity: number;
  isSelected: boolean;
  handleIncrease: () => void;
  handleDecrease: () => void;
  setActiveVariant: (productId: string, variantId: string) => void;
}

export const useProductCard = (product: Product): UseProductCardReturn => {
  // 1. Get activeVariantId reactively
  const activeVariantId = useBundleStore((s) =>
    getActiveVariantId(product, s.activeVariants)
  );

  // 2. Read quantity REACTIVELY by subscribing to s.items changes directly!
  const activeQuantity = useBundleStore((s) => {
    // Calling getItemQuantity inside selector forces re-render whenever s.items changes
    return s.getItemQuantity(product.id, activeVariantId);
  });

  // 3. Check selection state reactively
  const isSelected = useBundleStore((s) =>
    isProductSelected(product, s.getItemQuantity)
  );

  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);
  const setQuantity = useBundleStore((s) => s.setQuantity);

  const handleIncrease = useCallback(
    () => setQuantity(product.id, activeVariantId, activeQuantity + 1),
    [setQuantity, product.id, activeVariantId, activeQuantity]
  );

  const handleDecrease = useCallback(() => {
    if (activeQuantity > 0)
      setQuantity(product.id, activeVariantId, activeQuantity - 1);
  }, [setQuantity, product.id, activeVariantId, activeQuantity]);

  return {
    activeVariantId,
    activeQuantity,
    isSelected,
    handleIncrease,
    handleDecrease,
    setActiveVariant,
  };
};