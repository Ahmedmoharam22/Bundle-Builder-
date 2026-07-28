import React from "react";
import { Check, ExternalLink } from "lucide-react";
import type { PlanItem } from "@/types/product";

interface PlanCardProps {
  plan: PlanItem;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const name = plan?.name || "";
  const words = name.split(" ");
  const firstWord = words[0] || "";
  const restOfTitle = words.slice(1).join(" ");

  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 w-full max-w-[350px]">
      {/* Header: Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl tracking-tight leading-tight">
          <span className="font-black text-brand-heading">{firstWord}</span>
          {restOfTitle && (
            <>
              {" "}
              <span className="font-bold text-brand-primary">{restOfTitle}</span>
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
        <span className="text-sm font-medium text-brand-price">{plan.billing}</span>
      </div>

      {/* Description */}
      {plan.description && (
        <p className="text-sm font-semibold text-brand-heading mb-3">{plan.description}</p>
      )}

      {/* Features List */}
      {plan.features && plan.features.length > 0 && (
        <ul className="space-y-2.5 mb-6">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-body">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Learn More Link */}
      {plan.learnMoreUrl && (
        <a
          href={plan.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-link hover:text-brand-link-hover hover:underline"
        >
          Learn More <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};

export default PlanCard;