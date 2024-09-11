import { z } from "zod";
import { slugify } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { createProduct, updateProduct } from "@/actions/v1";
import { ProductFormData, ProductFormProps } from "@/types/panel";

// Zod schema
const productSchema = z.object({
    isActive: z.boolean(),
    name: z.string().min(3, "نام محصول الزامی است"),
    slug: z.string().min(3, "شناسه محصول الزامی است"),
    categoryId: z.string().min(16, "شناسه دسته محصول الزامی است"),
    newPrice: z.union([z.string(), z.number()]).refine(
        (val) => {
            if (typeof val === "string") {
                return !isNaN(parseFloat(val)) && parseFloat(val) > 0;
            }
            return typeof val === "number" && val > 0;
        },
        {
            message: "قیمت محصول الزامی است",
        }
    ),
});

export const useProductForm = (props: ProductFormProps) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{
        [key: string]: string | null;
    }>({
        name: null,
        slug: null,
        isActive: null,
        newPrice: null,
        categoryId: null,
    });

    const [name, setName] = useState<string>(
        props.initialData ? props.initialData.name : ""
    );

    const [slug, setSlug] = useState<string>(
        props.initialData ? props.initialData.slug : ""
    );

    const [price, setPrice] = useState<number | string>(
        props.initialData ? props.initialData.price : 0
    );

    const [categoryId, setCategoryId] = useState<string>(
        props.initialData ? props.initialData.category : ""
    );

    const [isActive, setIsActive] = useState<boolean>(
        props.initialData ? props.initialData.isActive : true
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

    // Validate form
    const validateForm = () => {
        const validation = productSchema.safeParse({
            name,
            slug,
            newPrice: price,
            isActive,
            categoryId,
        });

        if (!validation.success) {
            const errors: { [key: string]: string | null } = {};

            // Access the ZodFormattedError object
            const formattedErrors = validation.error.format();

            // Extract and map errors
            for (const [key, value] of Object.entries(formattedErrors)) {
                if (Array.isArray(value) && value.length > 0) {
                    errors[key] = value[0]; // Take the first message
                } else {
                    errors[key] = null;
                }
            }

            setFormErrors(errors);
            return false;
        }

        setFormErrors({
            name: null,
            slug: null,
            newPrice: null,
            isActive: null,
            categoryId: null,
        });
        return true;
    };

    // Form validity
    const isFormValid = useMemo(() => {
        return validateForm();
    }, [name, slug, price, categoryId, isActive]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return; // Prevent submission if form is not valid
        }

        setPending(true);

        // Prepare the product data
        const productData: ProductFormData = {
            name,
            slug,
            isActive,
            newPrice: price,
            categoryId: categoryId,
        };
        const result = props.initialData
            ? await updateProduct(props.initialData.slug, productData)
            : await createProduct(productData);

        setPending(false);

        if (result.error) {
            setError(result.error);
        } else {
            resetForm();
            props.type === "modal" && props.onClose();
        }
    };

    const resetForm = () => {
        if (props.initialData) {
            setName(props.initialData.name);
            setCategoryId(props.initialData.category);
            setPrice(props.initialData.price);
            setIsActive(props.initialData.isActive);
        } else {
            setName("");
            setPrice(0);
            setCategoryId("");
            setIsActive(true);
        }

        setError(null);
        setPending(false);
        setIsNameEdited(false);
        setFormErrors({
            name: null,
            slug: null,
            newPrice: null,
            categoryId: null,
            isActive: null,
        });
    };

    return {
        name,
        slug,
        price,
        error,
        pending,
        isActive,
        categoryId,
        formErrors,
        isFormValid,
        setName: handleNameChange, // Use the new handleNameChange function
        setSlug,
        setPrice,
        resetForm,
        setIsActive,
        handleSubmit,
        setCategoryId,
    };
};
