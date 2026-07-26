import React from "react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/helpers";

interface ReviewSummaryProps {
  subtotal: number;
  total: number;
  savings: number;
  monthlyPayment: string;
  savingsMessage: string;
  handleSaveForLater: (e: MouseEvent) => void;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  subtotal,
  total,
  savings,
  monthlyPayment,
  savingsMessage,
  handleSaveForLater,
}) => {
  return (
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
              as low as {monthlyPayment}
            </span>
          )}

          <div className="flex items-baseline gap-2 mt-1">
            {subtotal > total && (
              <span className="text-lg text-brand-muted-strike font-normal line-through">
                {formatPrice(subtotal)}
              </span>
            )}
            <span className="text-2xl font-black text-brand-primary tracking-tight">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <div className="text-brand-success text-[11px] font-bold text-center py-1">
          {savingsMessage}
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
  );
};
