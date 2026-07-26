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
  const { activeVariants, setActiveVariant, getItemQuantity, setQuantity } =
    useBundleStore();

  const activeVariantId = getActiveVariantId(product, activeVariants);
  const activeQuantity = getItemQuantity(product.id, activeVariantId);
  const isSelected = isProductSelected(product, getItemQuantity);

  const handleIncrease = () =>
    setQuantity(product.id, activeVariantId, activeQuantity + 1);

  const handleDecrease = () => {
    if (activeQuantity > 0)
      setQuantity(product.id, activeVariantId, activeQuantity - 1);
  };

  return {
    activeVariantId,
    activeQuantity,
    isSelected,
    handleIncrease,
    handleDecrease,
    setActiveVariant,
  };
};
