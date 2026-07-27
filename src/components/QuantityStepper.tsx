

import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { isStepperDecreaseDisabled } from "@/lib/helpers";
import { STEPPER } from "@/lib/constants";

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
    <div 
      style={{ gap: STEPPER.CONTAINER_GAP }} 
      className="flex items-center select-none"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDecrease}
        disabled={isDisabled}
        className="h-5 w-5 p-[2px] rounded-none bg-transparent shadow-none hover:bg-transparent text-brand-heading disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <Minus className="w-4 h-4 stroke-[2.4]" />
      </Button>

      <span 
        style={{ minWidth: STEPPER.COUNTER_MIN_WIDTH }}
        className="text-center text-[14px] font-bold leading-none text-brand-heading"
      >
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onIncrease}
        className="h-5 w-5 p-[2px] rounded-none bg-transparent shadow-none hover:bg-transparent text-brand-heading cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.4]" />
      </Button>
    </div>
  );
};