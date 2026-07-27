


import React from "react";
import { useProductCard } from "@/hooks/useProductCard";
import type { Product } from "@/types/product";
import { QuantityStepper } from "./QuantityStepper";
import { CARD } from "@/lib/constants";
import { formatPrice } from "@/lib/helpers";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    activeVariantId,
    activeQuantity,
    isSelected,
    handleIncrease,
    handleDecrease,
    setActiveVariant,
  } = useProductCard(product);

  return (
    <div
      style={{
        maxWidth: CARD.WIDTH,
        minHeight: CARD.MIN_HEIGHT,
        padding: CARD.PADDING,
        gap: CARD.GAP,
        borderRadius: CARD.RADIUS,
      }}
      className={[
        "relative flex items-start w-full bg-white transition-colors duration-150",
        isSelected
          ? "border-2 border-brand-primary"
          : "border border-[#E5E7EB]",
      ].join(" ")}
    >
      {/* ── Left column: badge + image ─────────────────────────── */}
      <div 
        style={{ width: CARD.IMAGE_COL_WIDTH }} 
        className="flex flex-col items-center shrink-0 h-full gap-1"
      >
        {/* Badge */}
        <div style={{ height: CARD.BADGE_HEIGHT }} className="self-start flex items-center">
          {product.discountBadge && (
            <span className="bg-brand-primary text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full leading-none">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Product image */}
        <div className="flex flex-1 items-center justify-center w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            style={{ maxHeight: CARD.IMAGE_MAX_HEIGHT }}
            className="max-w-full object-contain mx-auto"
          />
        </div>
      </div>

      {/* ── Right column: text + controls ──────────────────────── */}
      <div className="flex flex-col justify-between flex-1 h-full min-w-0 min-h-[151px]">
        {/* Title & description */}
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

        {/* Variant chips */}
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

        {/* Bottom row: stepper (left) + price (right) */}
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