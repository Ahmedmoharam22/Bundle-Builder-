import React from "react";
import { useBundleStore } from "@/store/useBundleStore";
import { getGroupedItems, ALL_PRODUCTS } from "@/lib/review";
import { QuantityStepper } from "./QuantityStepper";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export const ReviewPanel: React.FC = () => {
  const { items, setQuantity, getTotals, clearCart } = useBundleStore();
  const { subtotal, total, savings } = getTotals();

  const groupedItems = getGroupedItems(items);

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Your system configuration has been saved successfully!");
  };

  return (
    <div className="bg-brand-bg rounded-[10px] border border-gray-200/80 w-full max-w-[399px] p-[15px] gap-[5px] flex flex-col sticky top-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-heading">
            Your security system
          </h2>
          {Object.keys(items).length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-brand-strike hover:underline font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <p className="text-xs text-brand-body mt-1 mb-5 leading-relaxed">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        {/* Categorized Line Items */}
        <div className="space-y-5 mb-6 max-h-[440px] overflow-y-auto pr-1">
          {groupedItems.length === 0 ? (
            <div className="text-center py-8 text-brand-price text-xs italic bg-white/50 rounded-xl border border-dashed border-gray-200">
              No items added to your system yet.
            </div>
          ) : (
            groupedItems.map((group) => (
              <div key={group.categoryName} className="space-y-2">
                <h3 className="text-[11px] font-bold tracking-wider text-brand-price uppercase border-b border-gray-200/60 pb-1">
                  {group.categoryName}
                </h3>

                <div className="space-y-3 pt-1">
                  {group.items.map(({ key, item }) => {
                    const product = ALL_PRODUCTS.find(
                      (p) => p.id === item.productId,
                    );
                    if (!product) return null;

                    const variant = product.variants?.find(
                      (v) => v.id === item.variantId,
                    );
                    const displayName = product.name;

                    const isFree = product.salePrice === 0;
                    const isPlan = group.categoryName === "PLAN";

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5 max-w-[170px]">
                          <div className="w-9 h-9 flex-shrink-0 bg-white rounded-lg p-1 border border-gray-100 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={displayName}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-heading leading-tight">
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
                              onIncrease={() =>
                                setQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity + 1,
                                )
                              }
                              onDecrease={() =>
                                setQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity - 1,
                                )
                              }
                            />
                          )}

                          <div className="text-right min-w-[55px]">
                            {isFree ? (
                              <div>
                                <span className="block text-[10px] text-brand-muted-strike line-through">
                                  ${product.basePrice.toFixed(2)}
                                </span>
                                <span className="font-bold text-brand-primary">
                                  FREE
                                </span>
                              </div>
                            ) : isPlan ? (
                              <div>
                                <span className="block text-[10px] text-brand-muted-strike line-through">
                                  ${product.basePrice.toFixed(2)}/mo
                                </span>
                                <span className="font-bold text-brand-primary">
                                  ${product.salePrice.toFixed(2)}/mo
                                </span>
                              </div>
                            ) : (
                              <div>
                                {product.basePrice !== product.salePrice && (
                                  <span className="block text-[10px] text-brand-muted-strike line-through">
                                    $
                                    {(
                                      product.basePrice * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                )}
                                <span className="font-bold text-brand-primary">
                                  $
                                  {(product.salePrice * item.quantity).toFixed(
                                    2,
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-200/80">
            <div className="flex items-center gap-2 text-brand-heading font-medium">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-bold">Fast Shipping</span>
            </div>
            <div className="text-right">
              <span className="text-brand-muted-strike line-through text-[10px] mr-1">
                $5.99
              </span>
              <span className="font-bold text-brand-primary">FREE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-200/80 pt-4 space-y-3">
        <div className="flex items-end justify-between">
          <div className="flex-shrink-0">
            <img
              src="/images/badge-satisfaction.webp"
              alt="100% Wyze satisfaction guarantee"
              className="w-20 h-20 object-contain"
            />
          </div>

          <div className="flex flex-col items-end gap-1">
            {total > 0 && (
              <span className="bg-brand-primary text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                as low as ${(total / 10).toFixed(2)}/mo
              </span>
            )}

            <div className="flex items-baseline gap-2 mt-1">
              {subtotal > total && (
                <span className="text-lg text-brand-muted-strike font-normal line-through">
                  ${subtotal.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-black text-brand-primary tracking-tight">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <div className="text-brand-success text-[11px] font-bold text-center py-1">
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </div>
        )}

        <Button className="w-full max-w-[350px] h-[48px] bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm rounded-[4px] flex items-center justify-center">
          Checkout
        </Button>

        <div className="text-center pt-1">
          <a
            href="#"
            onClick={handleSaveForLater}
            className="text-xs text-brand-price underline hover:text-brand-primary"
          >
            Save my system for later
          </a>
        </div>
      </div>
    </div>
  );
};