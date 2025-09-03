export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  sku: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  features: string[];
  variants?: ProductVariant[];
  tags: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  warranty: string;
  powerConsumption?: string;
  tankCapacity?: string;
  airThrow?: string;
  coolingArea?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  inStock: boolean;
  attributes: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  filters: ProductFilter[];
}

export interface ProductFilter {
  id: string;
  name: string;
  type: 'range' | 'select' | 'checkbox' | 'color';
  options?: FilterOption[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}