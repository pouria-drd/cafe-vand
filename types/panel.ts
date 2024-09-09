// Common Data Structures
interface PanelEntityBase {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface PanelPrice {
    id: string;
    amount: number;
    createdAt: Date;
}

// Generic Result Structure
interface Result<T> {
    data?: T;
    error?: string;
}

// Product Data
export interface PanelProduct extends PanelEntityBase {
    price: number;
    categoryId: string;
    categoryName: string;
    prices: PanelPrice[];
}

export interface ProductFormData {
    name: string;
    slug: string;
    newPrice: number | string;
    categoryId: string;
    isActive: boolean;
}

// API Results
export type GetProductBySlugResult = Result<PanelProduct>;
export type GetPanelProductsResult = Result<PanelProduct[]>;
export type CreateProductResult = Result<PanelProduct>;
export type UpdateProductBySlugResult = Result<PanelProduct>;
export type DeleteProductBySlugResult = Result<string>;

// Category Data
export interface CategoryFormData {
    name: string;
    slug: string;
    icon?: string;
    isActive: boolean;
}

export interface PanelCategory extends PanelEntityBase {
    icon: string;
}

export interface PanelCategoryDetail extends PanelCategory {
    products: PanelProduct[];
}

// API Results for Categories
export type GetPanelCategoryResult = Result<PanelCategory[]>;
export type CreateCategoryResult = Result<PanelCategory>;
export type GetCategoryBySlugResult = Result<PanelCategoryDetail>;
export type UpdateCategoryBySlugResult = Result<PanelCategory>;
export type DeleteCategoryBySlugResult = Result<string>;

// Modal & Form Props
interface BaseFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CreateCategoryFormProps extends BaseFormProps {
    type: "create";
}

interface UpdateCategoryFormProps extends BaseFormProps {
    type: "update";
    categoryData: CategoryFormData;
}

export type CategoryFormProps =
    | CreateCategoryFormProps
    | UpdateCategoryFormProps;
