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

/**
 * Interface representing the result of the fetchMenu function.
 * Contains either the fetched data or an error message.
 */
export interface FetchMenuResult {
    /** The array of Category objects if the fetch is successful */
    data?: MenuCategory[];

    /** The error message if the fetch fails */
    error?: string;
}
