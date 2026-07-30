import type { CartItem } from "@/store/useBundleStore";
import { CATEGORY_MAP, CATEGORY_NAME_BY_ID } from "@/lib/category";
import { productCategoryIdMap } from "@/data/products";

export interface GroupedItem {
  categoryName: string;
  items: Array<{ key: string; item: CartItem }>;
}

export const getGroupedItems = (
  items: Record<string, CartItem>,
): GroupedItem[] => {
  const groupedItems = new Map<string, Array<{ key: string; item: CartItem }>>();

  Object.entries(items).forEach(([key, item]) => {
    const productCategoryId = productCategoryIdMap.get(item.productId);
    if (!productCategoryId) return;

    const categoryName = CATEGORY_NAME_BY_ID.get(productCategoryId);
    if (!categoryName) return;

    const categoryItems = groupedItems.get(categoryName);
    if (categoryItems) {
      categoryItems.push({ key, item });
      return;
    }

    groupedItems.set(categoryName, [{ key, item }]);
  });

  // O(N) lookup acceptable for current payload size; can be converted to Map O(1) if dataset scales.
  return CATEGORY_MAP.map((catGroup) => ({
    categoryName: catGroup.name,
    items: groupedItems.get(catGroup.name) ?? [],
  })).filter((group) => group.items.length > 0);
};