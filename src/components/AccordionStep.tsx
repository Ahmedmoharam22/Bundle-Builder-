

import React, { useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { StepIcon } from "./StepIcon";
import { useBundleStore } from "@/store/useBundleStore";
import { Button } from "@/components/ui/button";
import { ACCORDION } from "@/lib/constants";
import { getNextAccordionState, formatStepHeader } from "@/lib/helpers";

interface AccordionStepProps {
  stepNumber: number;
  totalSteps?: number;
  title: string;
  categoryId: string;
  iconName?: string;
  children?: React.ReactNode;
  nextStepTitle?: string;
}

const AccordionStepInner: React.FC<AccordionStepProps> = ({
  stepNumber,
  totalSteps = 4,
  title,
  categoryId,
  iconName,
  children,
  nextStepTitle,
}) => {
  const openStep = useBundleStore((s) => s.openStep);
  const setOpenStep = useBundleStore((s) => s.setOpenStep);
  // Inline the derived count so this step only re-renders when ITS category count changes
  const selectedCount = useBundleStore((s) => s.getStepSelectedCount(categoryId));
  const isOpen = openStep === stepNumber;

  const toggleAccordion = useCallback(() => {
    setOpenStep(getNextAccordionState(openStep as number, stepNumber));
  }, [openStep, stepNumber, setOpenStep]);

  return (
    <div 
      style={{ borderRadius: ACCORDION.RADIUS }} 
      className="w-full border border-gray-200 bg-white overflow-hidden mb-4"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={`step-content-${stepNumber}`}
        style={{ padding: ACCORDION.HEADER_PADDING }}
        className="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
      >
        {/* Left: icon + step label + title */}
        <div className="flex items-center gap-3">
          {iconName && <span className="text-brand-heading shrink-0"><StepIcon name={iconName} /></span>}
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold tracking-wider text-brand-price uppercase leading-none">
              {formatStepHeader(stepNumber, totalSteps)}
            </span>
            <h2 className="text-[16px] font-bold text-brand-heading leading-snug mt-0.5">
              {title}
            </h2>
          </div>
        </div>

        {/* Right: selected badge + chevron */}
        <div className="flex items-center gap-2 shrink-0">
          {selectedCount > 0 && (
            <span className="text-[11px] font-semibold text-brand-primary border border-brand-primary px-2.5 py-0.5 rounded-full">
              {selectedCount} selected
            </span>
          )}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-brand-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-brand-price" />
          )}
        </div>
      </button>

      {/* ── Content ─────────────────────────────────────────────── */}
      {isOpen && (
        <div 
          id={`step-content-${stepNumber}`}
          role="region"
          style={{ padding: ACCORDION.PADDING }} 
          className="border-t border-gray-100 bg-brand-bg"
        >
          {/* 2-column card grid (Last card starts left and doesn't stretch) */}
          <div 
            style={{ gap: ACCORDION.GAP }} 
            className="grid grid-cols-1 md:grid-cols-2 justify-items-start items-start"
          >
            {children}
          </div>

          {/* Next button (48px height, 4px radius) */}
          {nextStepTitle && (
            <div className="mt-5 flex justify-center">
              <Button
                variant="outline"
                style={{
                  height: ACCORDION.NEXT_BTN_HEIGHT,
                  borderRadius: ACCORDION.NEXT_BTN_RADIUS,
                }}
                className="border-brand-primary text-brand-primary hover:bg-brand-bg px-6 font-semibold text-xs cursor-pointer"
                onClick={() => setOpenStep(stepNumber + 1)}
              >
                Next: {nextStepTitle}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AccordionStep = React.memo(AccordionStepInner);