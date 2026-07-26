import React from "react";
import type { GroupedItem } from "@/lib/review";
import { ALL_PRODUCTS } from "@/lib/review";
import { ReviewItem } from "./ReviewItem";

interface ReviewCategoryProps {
  group: GroupedItem;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
}

export const ReviewCategory: React.FC<ReviewCategoryProps> = ({
  group,
  setQuantity,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-[11px] font-bold tracking-wider text-brand-price uppercase border-b border-gray-200/60 pb-1">
        {group.categoryName}
      </h3>

      <div className="space-y-3 pt-1">
        {group.items.map(({ key, item }) => {
          const product = ALL_PRODUCTS.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <ReviewItem
              key={key}
              item={item}
              product={product}
              categoryName={group.categoryName}
              onIncrease={() =>
                setQuantity(item.productId, item.variantId, item.quantity + 1)
              }
              onDecrease={() =>
                setQuantity(item.productId, item.variantId, item.quantity - 1)
              }
            />
          );
        })}
      </div>
    </div>
  );
};
