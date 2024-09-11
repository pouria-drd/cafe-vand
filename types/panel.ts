// Entities Data --------------------------------------------------------

/**
 * Base entity data interface for common properties.
 */
interface BaseEntityData {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

/**
 * Price entity interface.
 */
export interface Price {
    id: string;
    amount: number;
    createdAt: Date;
}

/**
 * Product entity extending base entity data.
 */
export interface Product extends BaseEntityData {
    price: number;
    categoryId: string;
    categoryName: string;
}

/**
 * Detailed product including prices.
 */
export interface ProductDetail extends Product {
    prices: Price[];
}

/**
 * Category entity extending base entity data.
 */
export interface Category extends BaseEntityData {
    icon: string;
}

/**
 * Detailed category including products.
 */
export interface CategoryDetail extends Category {
    products: Product[];
}

// Form Data ------------------------------------------------------------

/**
 * Base form data for common properties.
 */
interface BaseFormData {
    name: string;
    slug: string;
    isActive: boolean;
}

/**
 * Product form data with additional price and category info.
 */
export interface ProductFormData extends BaseFormData {
    newPrice: number | string;
    categoryId: string;
}

/**
 * Category form data with optional icon.
 */
export interface CategoryFormData extends BaseFormData {
    icon?: string;
}

// Form Props -----------------------------------------------------------

/**
 * Base props for modals.
 */
interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Base form props with type and method.
 */
interface BaseFormProps<T> {
    type: "form";
    initialData?: T;
}

/**
 * Base modal props with type and method.
 */
interface BaseModalFormProps<T> extends BaseModalProps {
    type: "modal";
    initialData?: T;
}

/**
 * Product form props including form and modal variants.
 */
export type ProductFormProps =
    | BaseFormProps<Product>
    | BaseModalFormProps<Product>;

/**
 * Category form props including form and modal variants.
 */
export type CategoryFormProps =
    | BaseFormProps<Category>
    | BaseModalFormProps<Category>;

// API Results ----------------------------------------------------------

/**
 * Generic API result interface.
 */
interface APIResult<T> {
    data?: T;
    error?: string;
}

// Price result type.
export type DeletePriceByIdResult = APIResult<string>;

// Product result types.
export type DeleteProductResult = APIResult<string>;
export type UpdateProductResult = APIResult<Product>;
export type CreateProductResult = APIResult<Product>;
export type RetrieveProductResult = APIResult<ProductDetail>;
export type RetrieveProductListResult = APIResult<Product[]>;

// Category result types.
export type DeleteCategoryResult = APIResult<string>;
export type UpdateCategoryResult = APIResult<Category>;
export type CreateCategoryResult = APIResult<Category>;
export type RetrieveCategoryResult = APIResult<CategoryDetail>;
export type RetrieveCategoryListResult = APIResult<Category[]>;
