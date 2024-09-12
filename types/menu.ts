// Common Base Entity
interface MenuEntityBase {
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

// Product Data
export interface MenuProduct extends MenuEntityBase {
    price: number;
}

// Category Data
export interface MenuCategory extends MenuEntityBase {
    icon: string;
    products: MenuProduct[];
}

// Generic Result Structure
interface Result<T> {
    data?: T;
    error?: string;
}

// API Result for Menu
export type GetMenuResult = Result<MenuCategory[]>;
