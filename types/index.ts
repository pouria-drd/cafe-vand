// Models ----------------------------------------------------------------------
interface Token {
    exp: number;
    iat: number;
    jti: string;
    email: string;
    user_id: string;
    isAdmin: boolean;
    fullName: string;
    username: string;
    token_type: string;
}

interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    fullName: string;
    username: string;
}

interface BaseEntityData {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

interface Price {
    id: string;
    amount: number;
    createdAt: Date;
}

interface Product extends BaseEntityData {
    price: number;
    category: string;
    categoryName: string;
}

interface ProductDetail extends Product {
    prices: Price[];
}

interface Category extends BaseEntityData {
    icon: string;
}

interface CategoryDetail extends Category {
    products: Product[];
}

interface APIResponse<TSuccess, TInputError> {
    error?: string;
    data?: TSuccess;
    inputError?: TInputError;
}

// Forms -----------------------------------------------------------------------

// login form
interface LoginFormData {
    username: string;
    password: string;
}

interface LoginSuccessData {
    otpId?: string;
    success?: string;
}

interface LoginInputErrors {
    username?: string;
    password?: string;
}

// VerifyLogin form
interface VerifyLoginFormData {
    otpId: string;
    otpCode: string;
}

interface VerifyLoginSuccessData {
    user?: User;
}

interface VerifyLoginInputErrors {
    otpId?: string;
    otpCode?: string;
}

/**
 * Base form data for common properties.
 */
interface BaseFormData {
    name: string;
    slug: string;
    isActive: boolean;
}

// Product form
interface ProductFormData extends BaseFormData {
    newPrice: number | string;
    category: string;
}

interface ProductSuccessData {
    product?: Product;
}

interface ProductInputErrors {
    name?: string;
    slug?: string;
    newPrice?: string;
    categoryId?: string;
}

// Category form
interface CategoryFormData extends BaseFormData {
    icon?: string;
}

interface CategorySuccessData {
    category?: Category;
}

interface CategoryInputErrors {
    name?: string;
    slug?: string;
    icon?: string;
    isActive?: string;
}

// Modals ----------------------------------------------------------------------

interface BaseModalProps {
    onClose: () => void;
}

interface BaseFormProps<T> {
    type: "form";
    initialData?: T;
}

interface BaseModalFormProps<T> extends BaseModalProps {
    type: "modal";
    initialData?: T;
}

type ProductFormProps = BaseModalFormProps<Product>;

type CategoryFormProps = BaseModalFormProps<Category>;
