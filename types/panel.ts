// Base Data Structures --------------------------------------------------------

interface BaseEntityData {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

interface BaseFormData {
    name: string;
    slug: string;
    isActive: boolean;
}

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Generic Structures ----------------------------------------------------------
interface APIResult<T> {
    data?: T;
    error?: string;
}

// Entities Data ---------------------------------------------------------------

export interface Price {
    id: string;
    amount: number;
    createdAt: Date;
}

export interface Product extends BaseEntityData {
    price: number;
    categoryId: string;
    categoryName: string;
}

export interface ProductDetail extends Product {
    prices: Price[];
}

export interface Category extends BaseEntityData {
    icon: string;
}

export interface CategoryDetail extends Category {
    products: Product[];
}

// API Results -----------------------------------------------------------------

// Product Results
export type DeleteProductResult = APIResult<string>;
export type UpdateProductResult = APIResult<Product>;
export type CreateProductResult = APIResult<Product>;
export type RetrieveProductResult = APIResult<ProductDetail>;
export type RetrieveProductListResult = APIResult<Product[]>;

// Category Results
export type DeleteCategoryResult = APIResult<string>;
export type UpdateCategoryResult = APIResult<Category>;
export type CreateCategoryResult = APIResult<Category>;
export type RetrieveCategoryResult = APIResult<CategoryDetail>;
export type RetrieveCategoryListResult = APIResult<Category[]>;

// Price Results
export type DeletePriceByIdResult = APIResult<string>;

// Form Data ----------------------------------------------------------------------

export interface ProductFormData extends BaseFormData {
    newPrice: number | string;
    categoryId: string;
}

export interface CreateProductFormProps {
    type: "create";
}

export interface UpdateProductFormProps {
    type: "update";
    productData: ProductFormData;
}

export interface CategoryFormData extends BaseFormData {
    icon?: string;
}

// Modal Data ----------------------------------------------------------------------

interface CreateCategoryModalProps extends BaseModalProps {
    type: "create";
}

interface UpdateCategoryModalProps extends BaseModalProps {
    type: "update";
    categoryData: CategoryFormData;
}

export type CategoryModalProps =
    | CreateCategoryModalProps
    | UpdateCategoryModalProps;
