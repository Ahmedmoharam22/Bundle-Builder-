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
  const activeVariants = useBundleStore((s) => s.activeVariants);
  const getItemQuantity = useBundleStore((s) => s.getItemQuantity);
  const setActiveVariant = useBundleStore((s) => s.setActiveVariant);
  const setQuantity = useBundleStore((s) => s.setQuantity);

  const activeVariantId = getActiveVariantId(product, activeVariants);
  const activeQuantity = getItemQuantity(product.id, activeVariantId);
  const isSelected = isProductSelected(product, getItemQuantity);

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
