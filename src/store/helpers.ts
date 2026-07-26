export type StepType = 'cameras' | 'sensors' | 'accessories' | 'plan';

export const makeCartKey = (productId: string, variantId: string | null): string => {
  return `${productId}_${variantId || 'default'}`;
};