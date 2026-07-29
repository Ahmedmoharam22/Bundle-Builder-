import React, { useCallback } from "react";
import type { CartItem } from "@/store/useBundleStore";
import type { Product } from "@/types/product";
import { QuantityStepper } from "../QuantityStepper";
import { formatPrice, isPlanCategory } from "@/lib/helpers";
import {
  REVIEW_THUMBNAIL_IMAGE_DIMENSIONS,
  getReviewThumbnailImageSrc,
} from "@/lib/images";

interface ReviewItemProps {
  item: CartItem;
  product: Product;
  categoryName: string;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
}

const ReviewItemInner: React.FC<ReviewItemProps> = ({
  item,
  product,
  categoryName,
  setQuantity,
}) => {
  const variant = product.variants?.find((v) => v.id === item.variantId);
  const displayName = product.name;
  const isFree = product.salePrice === 0;
  const isPlan = isPlanCategory(categoryName);
  const imageSrc = getReviewThumbnailImageSrc(product.image);

  const handleIncrease = useCallback(() => {
    setQuantity(item.productId, item.variantId, item.quantity + 1);
  }, [item.productId, item.quantity, item.variantId, setQuantity]);

  const handleDecrease = useCallback(() => {
    setQuantity(item.productId, item.variantId, item.quantity - 1);
  }, [item.productId, item.quantity, item.variantId, setQuantity]);

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2.5 max-w-[170px]">
        <div className="w-9 h-9 shrink-0 bg-white rounded-lg p-1 border border-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={displayName}
            width={REVIEW_THUMBNAIL_IMAGE_DIMENSIONS.width}
            height={REVIEW_THUMBNAIL_IMAGE_DIMENSIONS.height}
            loading="lazy"
            decoding="async"
            className="h-9 w-9 object-contain"
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

      <div className="flex items-center gap-3">
        {!isPlan && (
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
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

export const ReviewItem = React.memo(ReviewItemInner);