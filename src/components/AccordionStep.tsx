import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useBundleStore } from "@/store/useBundleStore";
import { Button } from "@/components/ui/button";
import { ACCORDION } from "@/lib/constants";
import { getNextAccordionState, formatStepHeader } from "@/lib/helpers";

interface AccordionStepProps {
  stepNumber: number;
  totalSteps?: number;
  title: string;
  categoryId: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  nextStepTitle?: string;
}

export const AccordionStep: React.FC<AccordionStepProps> = ({
  stepNumber,
  totalSteps = 4,
  title,
  categoryId,
  icon,
  children,
  nextStepTitle,
}) => {
  const { openStep, setOpenStep, getStepSelectedCount } = useBundleStore();
  const isOpen = openStep === stepNumber;
  const selectedCount = getStepSelectedCount(categoryId);

  const toggleAccordion = () => {
    setOpenStep(getNextAccordionState(openStep as number, stepNumber));
  };

  return (
    <div 
      style={{ borderRadius: ACCORDION.RADIUS }} 
      className="w-full border border-gray-200 bg-white overflow-hidden mb-4"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggleAccordion}
        style={{ padding: ACCORDION.PADDING }}
        className="w-full flex items-center justify-between hover:bg-gray-50/50 transition-colors"
      >
        {/* Left: icon + step label + title */}
        <div className="flex items-center gap-3">
          {icon && <span className="text-brand-heading">{icon}</span>}
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold tracking-wider text-brand-price uppercase leading-none">
              {formatStepHeader(stepNumber, totalSteps)}
            </span>
            <h2 className="text-base font-bold text-brand-heading leading-snug mt-0.5">
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
          style={{ padding: ACCORDION.PADDING }} 
          className="border-t border-gray-100"
        >
          {/* 2-column card grid */}
          <div 
            style={{ gap: ACCORDION.GAP }} 
            className="grid grid-cols-1 md:grid-cols-2 justify-items-center"
          >
            {children}
          </div>

          {/* Next button */}
          {nextStepTitle && (
            <div className="mt-5 flex justify-center">
              <Button
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-bg rounded-lg px-6 font-semibold text-xs"
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