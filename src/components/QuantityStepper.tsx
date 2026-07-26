import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { isStepperDecreaseDisabled } from "@/lib/helpers";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
}) => {
  const isDisabled = isStepperDecreaseDisabled(quantity, min);

  return (
    <div className="flex items-center gap-2 select-none">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDecrease}
        disabled={isDisabled}
        className="h-5 w-5 p-0 rounded-none bg-transparent shadow-none hover:bg-transparent text-brand-heading disabled:opacity-30 disabled:pointer-events-none"
      >
        <Minus className="h-3 w-3 stroke-[2.4]" />
      </Button>

      <span className="w-4 text-center text-[14px] font-bold leading-none text-brand-heading">
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onIncrease}
        className="h-5 w-5 p-0 rounded-none bg-transparent shadow-none hover:bg-transparent text-brand-heading"
      >
        <Plus className="h-3 w-3 stroke-[2.4]" />
      </Button>
    </div>
  );
};