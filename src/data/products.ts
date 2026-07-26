import productsData from './products.json';
import { Category, Product, ProductsData } from '../types/product';

const data = productsData as unknown as ProductsData;

export const categories: Category[] = data.categories;
export const initialSelectedItems = data.initialSelectedItems || {};

export const allProducts: Product[] = categories.flatMap((c) => c.products);

//  Optimization: O(1) Lookup Maps
export const productMap = new Map<string, Product>(
  allProducts.map((p) => [p.id, p])
);

// Map Category ID -> Set of Product IDs
export const categoryProductIdsMap = new Map<string, Set<string>>(
  categories.map((c) => [c.id, new Set(c.products.map((p) => p.id))])
);