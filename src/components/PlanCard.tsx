import React from "react";
import { Check, ExternalLink } from "lucide-react";
import type { PlanItem } from "@/types/product";
import { useBundleStore } from "@/store/useBundleStore";

interface PlanCardProps {
  plan: PlanItem;
}

const PlanCardInner: React.FC<PlanCardProps> = ({ plan }) => {
  // Read selection quantity directly from store using fine-grained selector
  const isSelected = useBundleStore(
    (s) => s.getItemQuantity(plan.id, null) > 0
  );
  const setQuantity = useBundleStore((s) => s.setQuantity);

  const handleTogglePlan = () => {
    // If selected, toggle off (0), else select it (1)
    setQuantity(plan.id, null, isSelected ? 0 : 1);
  };

  const name = plan?.name || "";
  const words = name.split(" ");
  const firstWord = words[0] || "";
  const restOfTitle = words.slice(1).join(" ");

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 w-full max-w-[350px] flex flex-col justify-between ${
        isSelected
          ? "border-brand-primary bg-brand-panel shadow-md ring-2 ring-brand-primary/20"
          : "border-gray-200 bg-white shadow-sm hover:border-gray-300"
      }`}
    >
      <div>
        {/* Header: Title & Subtitle */}
        <div className="mb-4">
          <h3 className="text-xl tracking-tight leading-tight">
            <span className="font-black text-brand-heading">{firstWord}</span>
            {restOfTitle && (
              <>
                {" "}
                <span className="font-bold text-brand-primary">
                  {restOfTitle}
                </span>
              </>
            )}
          </h3>
          {plan.subtitle && (
            <p className="text-sm text-brand-body mt-1">{plan.subtitle}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-brand-heading">
            ${plan.price != null ? plan.price.toFixed(2) : ""}
          </span>
          <span className="text-sm font-medium text-brand-price">
            {plan.billing}
          </span>
        </div>

        {/* Description */}
        {plan.description && (
          <p className="text-sm font-semibold text-brand-heading mb-3">
            {plan.description}
          </p>
        )}

        {/* Features List */}
        {plan.features && plan.features.length > 0 && (
          <ul className="space-y-2.5 mb-6">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-brand-body"
              >
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-100">
        {/* Select / Deselect Button */}
        <button
          type="button"
          onClick={handleTogglePlan}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
            isSelected
              ? "bg-brand-primary text-white shadow-sm hover:bg-brand-primary/90"
              : "bg-gray-100 text-brand-heading hover:bg-gray-200"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" /> Selected
            </>
          ) : (
            "Select Plan"
          )}
        </button>

        {/* Learn More Link */}
        {plan.learnMoreUrl && (
          <div className="text-center">
            <a
              href={plan.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-brand-link hover:text-brand-link-hover hover:underline"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const PlanCard = React.memo(PlanCardInner);
export default PlanCard;