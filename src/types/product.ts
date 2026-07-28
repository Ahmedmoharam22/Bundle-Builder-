export enum CategoryType {
  CAMERAS = 'cameras',
  PLAN = 'plan',
  SENSORS = 'sensors',
  ACCESSORIES = 'accessories',
}

export interface Variant {
  id: string;
  label: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  learnMoreUrl?: string;
  discountBadge?: string | null;
  basePrice: number;
  salePrice: number;
  image: string;
  category?: CategoryType | string;
  isMonthly?: boolean;
  variants: Variant[];
}

export interface Category {
  id: string;
  stepNumber: number;
  title: string;
  icon: string;
  products: Product[];
}

export interface CartItemSeed {
  productId: string;
  variantId: string | null;
  quantity: number;
}

export interface ProductsData {
  categories: Category[];
  initialSelectedItems: Record<string, CartItemSeed>;
}

export interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  billing: string;
  description: string;
  features: string[];
  learnMoreUrl?: string;
  category: "plan";
  isMonthly?: boolean;
}