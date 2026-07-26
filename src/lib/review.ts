import productsData from "@/data/products.json";
import type { CartItem } from "@/store/useBundleStore";
import { CATEGORY_MAP } from "@/lib/category";

export const ALL_PRODUCTS = productsData.categories.flatMap((c) => c.products);

export interface GroupedItem {
  categoryName: string;
  items: Array<{ key: string; item: CartItem }>;
}

export const getGroupedItems = (
  items: Record<string, CartItem>,
): GroupedItem[] => {
  return CATEGORY_MAP.map((catGroup) => {
    const catItems = Object.entries(items)
      .filter(([, item]) => {
        const product = ALL_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return false;

        if (
          product.category &&
          product.category.toUpperCase() === catGroup.name
        ) {
          return true;
        }

        const parentCategory = productsData.categories.find((c) =>
          c.products.some((p) => p.id === item.productId),
        );

        return parentCategory
          ? catGroup.ids.includes(parentCategory.id.toLowerCase())
          : false;
      })
      .map(([key, item]) => ({ key, item }));

    return {
      categoryName: catGroup.name,
      items: catItems,
    };
  }).filter((group) => group.items.length > 0);
};