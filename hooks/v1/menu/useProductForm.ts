import { slugify } from "@/utils/base";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    createProductAction,
    updateProductAction,
} from "@/actions/v1/menu/product";

const useProductForm = (props: ProductFormProps) => {
    const router = useRouter();
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [inputError, setInputError] = useState<ProductInputErrors>({});

    const [name, setName] = useState<string>(
        props.initialData ? props.initialData.name : ""
    );

    const [slug, setSlug] = useState<string>(
        props.initialData ? props.initialData.slug : ""
    );

    const [price, setPrice] = useState<number | string>(
        props.initialData?.price ? props.initialData.price : ""
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

    // Handle form submission
    const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);

        // Prepare the product data
        const productData: ProductFormData = {
            name,
            slug,
            isActive,
            newPrice: price,
            category: categoryId,
        };

        try {
            const result = props.initialData
                ? await updateProductAction(props.initialData.slug, productData)
                : await createProductAction(productData);

            setPending(false);

            if (!result || result.error === "invalid-credentials") {
                router.push("/unauthorized");
                return;
            }

            if (result.error) {
                setError(result.error);
            } else if (result.inputError) {
                setInputError(result.inputError);
            } else if (result.data?.product) {
                props.type === "modal" && props.onClose();
            }
        } catch (error) {
            // console.log(error);
        }
    };

    return {
        name,
        slug,
        price,
        error,
        pending,
        isActive,
        categoryId,
        inputError,
        setName: handleNameChange, // Use the new handleNameChange function
        setSlug,
        setPrice,
        setIsActive,
        setCategoryId,
        handleProductSubmit,
    };
};

export default useProductForm;
