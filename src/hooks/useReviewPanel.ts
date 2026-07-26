import type { MouseEvent } from "react";
import { useBundleStore } from "@/store/useBundleStore";
import { getGroupedItems } from "@/lib/review";
import type { GroupedItem } from "@/lib/review";
import { calculateMonthlyPayment, formatSavingsMessage } from "@/lib/helpers";

export interface UseReviewPanelReturn {
  groupedItems: GroupedItem[];
  subtotal: number;
  total: number;
  savings: number;
  hasItems: boolean;
  clearCart: () => void;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  handleSaveForLater: (e: MouseEvent) => void;
  monthlyPayment: string;
  savingsMessage: string;
}

export const useReviewPanel = (): UseReviewPanelReturn => {
  const { items, getTotals, clearCart, setQuantity } = useBundleStore();
  const { subtotal, total, savings } = getTotals();

  const groupedItems = getGroupedItems(items);
  const hasItems = Object.keys(items).length > 0;
  const monthlyPayment = calculateMonthlyPayment(total);
  const savingsMessage = formatSavingsMessage(savings);

  const handleSaveForLater = (e: MouseEvent) => {
    e.preventDefault();
    alert("Your system configuration has been saved successfully!");
  };

  return {
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
  };
};
