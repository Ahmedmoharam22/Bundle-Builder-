

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
        onClick={onDecrease}
        disabled={isDisabled}
        aria-label="Decrease quantity"
        title="Decrease quantity"
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </Button>

      <span 
        style={{ minWidth: STEPPER.COUNTER_MIN_WIDTH }}
        className="text-center text-[14px] font-bold leading-none text-brand-heading"
      >
        {quantity}
      </span>

      <Button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        title="Increase quantity"
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </Button>
    </div>
  );
};