// Price Data

export interface PanelPrice {
    id: string;
    amount: number;
    createdAt: Date;
}

export interface DeletePriceByIdResult {
    data?: string;
    error?: string;
}

// Product Data

export interface PanelProduct {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    categoryName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    prices: PanelPrice[];
}

export interface ProductFormData {
    name: string;
    slug: string;
    newPrice: number | string;
    category: string;
    isActive: boolean;
}

export interface GetProductBySlugResult {
    data?: PanelProduct;
    error?: string;
}

export interface GetPanelProductsResult {
    data?: PanelProduct[];
    error?: string;
}

export interface CreateProductResult {
    data?: PanelProduct;
    error?: string;
}

export interface UpdateProductBySlugResult {
    data?: PanelProduct;
    error?: string;
}

export interface DeleteProductBySlugResult {
    data?: string;
    error?: string;
}

// Category Data

export interface CategoryFormData {
    name: string;
    slug: string;
    icon?: string;
    isActive: boolean;
}

export interface PanelCategory {
    id: string;
    name: string;
    slug: string;
    icon: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface PanelCategoryDetail {
    id: string;
    name: string;
    slug: string;
    icon: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: PanelProduct[];
}

export interface GetPanelCategoryResult {
    data?: PanelCategory[];

    error?: string;
}

export interface CreateCategoryResult {
    data?: PanelCategory;
    error?: string;
}

export interface GetCategoryBySlugResult {
    data?: PanelCategoryDetail;

    error?: string;
}

export interface UpdateCategoryBySlugResult {
    data?: PanelCategory;
    error?: string;
}

export interface DeleteCategoryBySlugResult {
    data?: string;
    error?: string;
}
