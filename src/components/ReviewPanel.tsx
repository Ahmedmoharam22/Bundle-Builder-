
import React from "react";
import { useReviewPanel } from "@/hooks/useReviewPanel";
import ReviewCategory from "./review/ReviewCategory";
import { ReviewSummary } from "./review/ReviewSummary";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { PANEL } from "@/lib/constants";

export  const ReviewPanel: React.FC = () => {
  const {
    groupedItems,
    subtotal,
    total,
    savings,
    hasItems,
    clearCart,
    setQuantity,
    handleSaveForLater,
    monthlyPayment,
    savingsMessage,
  } = useReviewPanel();

  return (
    <div
      style={{
        maxWidth: PANEL.WIDTH, // 399px
        padding: PANEL.PADDING, // 24px
        borderRadius: PANEL.RADIUS, // 12px
      }}
      className="bg-brand-bg border border-gray-200/80 w-full flex flex-col sticky top-6 shadow-xs"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-heading">
            Your security system
          </h2>
          {hasItems && (
            <Button
              variant="outline"
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 active:scale-95 transition-all duration-150 rounded-md border border-red-200/60 shadow-xs cursor-pointer"
            >
              <span>Clear All</span>
            </Button>
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
              <ReviewCategory
                key={group.categoryName}
                group={group}
                setQuantity={setQuantity}
              />
            ))
          )}

          {/* Shipping Badge */}
          <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-200/80">
            <div className="flex items-center gap-2 text-brand-heading font-medium">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
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

      <ReviewSummary
        subtotal={subtotal}
        total={total}
        savings={savings}
        monthlyPayment={monthlyPayment}
        savingsMessage={savingsMessage}
        handleSaveForLater={handleSaveForLater}
      />
    </div>
  );
};

