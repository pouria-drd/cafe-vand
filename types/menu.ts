export interface MenuProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MenuCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    products: MenuProduct[];
}
