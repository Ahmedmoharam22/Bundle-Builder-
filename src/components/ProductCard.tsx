import React from "react";
import { useProductCard } from "@/hooks/useProductCard";
import type { Product } from "@/types/product";
import { QuantityStepper } from "./QuantityStepper";
import { CARD } from "@/lib/constants";
import { formatPrice } from "@/lib/helpers";
import {
  PRODUCT_CARD_IMAGE_DIMENSIONS,
  getProductCardImageSrc,
} from "@/lib/images";

interface ProductCardProps {
  product: Product;
  imagePriority?: boolean;
}

const cardStyle = {
  maxWidth: CARD.WIDTH,
  minHeight: CARD.MIN_HEIGHT,
  padding: CARD.PADDING,
  gap: CARD.GAP,
  borderRadius: CARD.RADIUS,
};

const imageColumnStyle = { width: CARD.IMAGE_COL_WIDTH };
const badgeStyle = { height: CARD.BADGE_HEIGHT };
const imageStyle = {
  width: `${PRODUCT_CARD_IMAGE_DIMENSIONS.width}px`,
  height: `${PRODUCT_CARD_IMAGE_DIMENSIONS.height}px`,
};

const ProductCardInner: React.FC<ProductCardProps> = ({
  product,
  imagePriority = false,
}) => {
  const {
    activeVariantId,
    activeQuantity,
    isSelected,
    handleIncrease,
    handleDecrease,
    setActiveVariant,
  } = useProductCard(product);
  const imageSrc = getProductCardImageSrc(product.image);

  return (
    <div
      style={cardStyle}
      className={[
        "relative flex items-start w-full bg-white transition-colors duration-150",
        isSelected
          ? "border-2 border-brand-primary"
          : "border border-[#E5E7EB]",
      ].join(" ")}
    >
      <div
        style={imageColumnStyle}
        className="flex flex-col items-center shrink-0 h-full gap-1"
      >
        <div style={badgeStyle} className="self-start flex items-center">
          {product.discountBadge && (
            <span className="bg-brand-primary text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full leading-none">
              {product.discountBadge}
            </span>
          )}
        </div>

        <div className="flex flex-1 items-center justify-center w-full">
          <img
            src={imageSrc}
            alt={product.name}
            width={PRODUCT_CARD_IMAGE_DIMENSIONS.width}
            height={PRODUCT_CARD_IMAGE_DIMENSIONS.height}
            loading={imagePriority ? "eager" : "lazy"}
            fetchPriority={imagePriority ? "high" : "auto"}
            decoding="async"
            style={imageStyle}
            className="object-contain mx-auto"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 h-full min-w-0 min-h-[151px]">
        <div>
          <h3 className="font-bold text-brand-heading text-[16px] leading-tight">
            {product.name}
          </h3>
          <p className="text-[12px] text-brand-body leading-snug mt-1 line-clamp-2">
            {product.description}{" "}
            {product.learnMoreUrl && (
              <a
                href={product.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-link underline hover:text-brand-link-hover font-normal"
              >
                Learn More
              </a>
            )}
          </p>
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-[6px] flex-wrap mt-1">
            {product.variants.map((variant) => {
              const isActive = activeVariantId === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setActiveVariant(product.id, variant.id)}
                  className={[
                    "flex items-center gap-1 text-[11px] px-2 py-1 rounded-[4px] border cursor-pointer transition-colors duration-150",
                    isActive
                      ? "border-emerald-500 bg-emerald-50/20 text-brand-heading font-medium"
                      : "border-gray-300 text-brand-heading hover:bg-gray-50",
                  ].join(" ")}
                >
                  {variant.colorHex && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-gray-300 shrink-0"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  )}
                  <span>{variant.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-end justify-between mt-auto pt-1">
          <QuantityStepper
            quantity={activeQuantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="text-right leading-none">
            {product.basePrice !== product.salePrice && (
              <span className="block text-[13px] text-brand-strike line-through mb-0.5 font-normal">
                {formatPrice(product.basePrice)}
              </span>
            )}
            <span className="text-[16px] font-bold text-brand-price">
              {formatPrice(product.salePrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardInner);