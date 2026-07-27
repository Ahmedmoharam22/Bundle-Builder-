

import React from "react";
import type { CartItem } from "@/store/useBundleStore";
import type { Product } from "@/types/product";
import { QuantityStepper } from "../QuantityStepper";
import { formatPrice, isPlanCategory } from "@/lib/helpers";

interface ReviewItemProps {
  item: CartItem;
  product: Product;
  categoryName: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  item,
  product,
  categoryName,
  onIncrease,
  onDecrease,
}) => {
  const variant = product.variants?.find((v) => v.id === item.variantId);
  const displayName = product.name;
  const isFree = product.salePrice === 0;
  const isPlan = isPlanCategory(categoryName);

  return (
    <div className="flex items-center justify-between text-xs">
      {/* Product Image (36px x 36px) & Title */}
      <div className="flex items-center gap-2.5 max-w-[170px]">
        <div className="w-9 h-9 shrink-0 bg-white rounded-lg p-1 border border-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={displayName}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div>
          <h4 className="font-semibold text-brand-heading leading-tight text-[12px]">
            {displayName}
          </h4>
          {variant && (
            <span className="text-[10px] text-brand-price block">
              {variant.label}
            </span>
          )}
        </div>
      </div>

      {/* Stepper + Price */}
      <div className="flex items-center gap-3">
        {!isPlan && (
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        )}

        <div className="text-right min-w-[55px]">
          {isFree ? (
            <div>
              <span className="block text-[10px] text-brand-muted-strike line-through">
                {formatPrice(product.basePrice)}
              </span>
              <span className="font-bold text-brand-primary">FREE</span>
            </div>
          ) : isPlan ? (
            <div>
              <span className="block text-[10px] text-brand-muted-strike line-through">
                {formatPrice(product.basePrice)}/mo
              </span>
              <span className="font-bold text-brand-primary">
                {formatPrice(product.salePrice)}/mo
              </span>
            </div>
          ) : (
            <div>
              {product.basePrice !== product.salePrice && (
                <span className="block text-[10px] text-brand-muted-strike line-through">
                  {formatPrice(product.basePrice * item.quantity)}
                </span>
              )}
              <span className="font-bold text-brand-primary">
                {formatPrice(product.salePrice * item.quantity)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};