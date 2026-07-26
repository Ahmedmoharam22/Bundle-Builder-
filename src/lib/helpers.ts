// src/lib/helpers.ts
import { Product } from "@/types/product";
/**
 * Calculates the next step value based on current state.
 * Returns 0 if clicking the currently open step (closes it), otherwise returns target step number.
 */
export const getNextAccordionState = (
  currentOpenStep: number | string,
  targetStep: number
): number => {
  return currentOpenStep === targetStep ? 0 : targetStep;
};

/**
 * Helper to generate step status string (e.g., "STEP 1 OF 4")
 */
export const formatStepHeader = (stepNumber: number, totalSteps: number = 4): string => {
  return `STEP ${stepNumber} OF ${totalSteps}`;
};





/**
 * Determines active variant ID falling back to first variant or null
 */
export const getActiveVariantId = (
  product: Product,
  activeVariants: Record<string, string>
): string | null => {
  if (!product.variants || product.variants.length === 0) return null;
  return activeVariants[product.id] ?? product.variants[0].id;
};

/**
 * Checks if a product is selected (any variant or base product qty > 0)
 */
export const isProductSelected = (
  product: Product,
  getItemQuantity: (productId: string, variantId: string | null) => number
): boolean => {
  if (product.variants && product.variants.length > 0) {
    return product.variants.some((v) => getItemQuantity(product.id, v.id) > 0);
  }
  return getItemQuantity(product.id, null) > 0;
};

/**
 * Formats currency price to 2 decimal places
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Checks if the decrease action in stepper should be disabled
 */
export const isStepperDecreaseDisabled = (quantity: number, min: number = 0): boolean => {
  return quantity <= min;
};


/**
 * Calculates estimated monthly payment option (e.g., total / 10)
 */
export const calculateMonthlyPayment = (total: number, months: number = 10): string => {
  return `$${(total / months).toFixed(2)}/mo`;
};

/**
 * Formats a savings success message
 */
export const formatSavingsMessage = (savings: number): string => {
  return `Congrats! You're saving $${savings.toFixed(2)} on your security bundle!`;
};

/**
 * Checks if a category name represents a recurring service plan
 */
export const isPlanCategory = (categoryName: string): boolean => {
  return categoryName.toUpperCase() === "PLAN";
};