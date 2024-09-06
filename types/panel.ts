export interface PanelCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface representing the result of the getPanelCategories function.
 * Contains either the fetched data or an error message.
 */
export interface getPanelCategoryResult {
    /** The array of Category objects if the fetch is successful */
    data?: PanelCategory[];

    /** The error message if the fetch fails */
    error?: string;
}

export interface deleteCategoryBySlugResult {
    data?: string;
    error?: string;
}
