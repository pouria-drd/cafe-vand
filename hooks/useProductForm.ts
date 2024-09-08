import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { PanelCategory, ProductFormData } from "@/types/panel";
import { createProduct, updateProductBySlug } from "@/actions";

interface CreateProductFormProps {
    type: "create";
    category: PanelCategory | PanelCategory[];
}

interface UpdateProductFormProps {
    type: "update";
    productSlug: string;
    category: PanelCategory | PanelCategory[];
    initialData: ProductFormData;
}

type ProductFormProps = CreateProductFormProps | UpdateProductFormProps;

export const useProductForm = (props: ProductFormProps) => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState<string>(
        props.type === "create" ? "" : props.initialData.name
    );
    const [slug, setSlug] = useState<string>(
        props.type === "create" ? "" : props.initialData.slug
    );
    const [category, setCategory] = useState<string>(() => {
        if (props.type === "create" && !Array.isArray(props.category)) {
            return props.category.id;
        } else if (props.type === "create" && Array.isArray(props.category)) {
            return props.category[0].id;
        } else if (props.type === "update") {
            return props.initialData.category;
        } else {
            return "";
        }
    });
    const [isActive, setIsActive] = useState<boolean>(
        props.type === "create" ? true : props.initialData.isActive
    );

    // Flag to control if the user has edited the name
    const [isNameEdited, setIsNameEdited] = useState<boolean>(false);

    // Update slug when name changes, but skip on initial load for update mode
    useEffect(() => {
        if (name && isNameEdited) {
            setSlug(slugify(name));
        }
    }, [name, isNameEdited]);

    // Handle name change and set the flag to indicate user input
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (!isNameEdited) {
            setIsNameEdited(true); // Set flag when user manually changes the name
        }
    };

    // Check form validity
    const isFormValid = useMemo(() => {
        return (
            name.trim() !== "" && slug.trim() !== "" && category.trim() !== ""
        );
    }, [name, slug, category]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return; // Prevent submission if form is not valid
        }

        // Prepare the product data
        const productData: ProductFormData = {
            name,
            slug,
            category,
            isActive,
        };

        if (props.type === "create") {
            // Call API to create the product
            const result = await createProduct(productData);
            if (result.error) {
                setError(result.error);
            } else {
                setError(null);
            }
        } else if (props.type === "update") {
            // Call API to update the product
            const result = await updateProductBySlug(
                props.productSlug,
                productData
            );
            if (result.error) {
                setError(result.error);
            } else {
                setError(null);
            }
            // Handle update logic here if needed
        }

        // Reset form data
        setName("");
        setSlug("");
        setIsActive(true);
        setIsNameEdited(false); // Reset flag
        if (!Array.isArray(props.category)) {
            router.push(`/vand-panel/categories/${props.category.slug}`);
        } else {
            router.push(`/vand-panel/products`);
        }
    };

    return {
        name,
        slug,
        category,
        error,
        isActive,
        isFormValid,
        setName: handleNameChange, // Use the new handleNameChange function
        setSlug,
        setCategory,
        setIsActive,
        handleSubmit,
    };
};
