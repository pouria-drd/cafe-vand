import { useRouter } from "next/navigation";
import { CategoryFormData } from "@/types/panel";
import { convertToBase64, slugify } from "@/lib/utils";
import { createCategory, updateCategoryBySlug } from "@/actions";
import { useState, useEffect, useMemo, useCallback } from "react";

// Access environment variables
const MAX_FILE_SIZE =
    parseInt(process.env.NEXT_PUBLIC_MAX_ICON_SIZE || "1", 10) * 1024 * 1024;
const VALID_FILE_TYPES = (
    process.env.NEXT_PUBLIC_VALID_FILE_TYPES || "image/png,image/jpeg"
).split(",");

interface CreateCategoryFormProps {
    type: "create";
}

interface UpdateCategoryFormProps {
    type: "update";
    categorySlug: string;
    initialData: CategoryFormData;
}

type CategoryFormProps = CreateCategoryFormProps | UpdateCategoryFormProps;

export const useCategoryForm = (props: CategoryFormProps) => {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState<string>(
        props.type === "create" ? "" : props.initialData.name
    );
    const [slug, setSlug] = useState<string>(
        props.type === "create" ? "" : props.initialData.slug
    );
    const [isActive, setIsActive] = useState<boolean>(
        props.type === "create" ? true : props.initialData.isActive
    );
    const [icon, setIcon] = useState<string | null>(null); // Icon file input
    const [iconError, setIconError] = useState<string | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(
        props.type === "create"
            ? null
            : props.initialData.icon
            ? props.initialData.icon
            : null
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

    // Validate icon file
    const isValidIcon = (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            setIconError(
                `حجم فایل باید حداکثر ${MAX_FILE_SIZE / 1024 / 1024}MB باشد.`
            );
            return false;
        }
        if (!VALID_FILE_TYPES.includes(file.type)) {
            setIconError("فرمت فایل نامعتبر است. فقط png و jpg مجاز هستند.");
            return false;
        }
        setIconError(null);
        return true;
    };

    // Handle file input change
    const handleFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (isValidIcon(file)) {
                    const imageBase64String = await convertToBase64(file);
                    setIcon(imageBase64String);
                    setIconPreview(URL.createObjectURL(file)); // Update the preview
                } else {
                    setIcon(null); // Clear the icon if it's invalid
                    setIconPreview(null);
                }
            }
        },
        []
    );

    // Check form validity
    const isFormValid = useMemo(() => {
        return name.trim() !== "" && slug.trim() !== "" && !iconError;
    }, [name, slug, iconError, icon]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return; // Prevent submission if form is not valid
        }

        // Prepare the category data
        const categoryData: CategoryFormData = {
            name,
            slug,
            isActive,
            icon: icon ? icon : undefined,
        };

        if (props.type === "create") {
            // Call API to create the category
            const result = await createCategory(categoryData);
            if (result.error) {
                setError(result.error);
            } else {
                setError(null);
            }
        } else if (props.type === "update") {
            // Call API to update the category
            const result = await updateCategoryBySlug(
                props.categorySlug,
                categoryData
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
        setIcon(null);
        setIconError(null);
        setIconPreview(null);
        setIsNameEdited(false); // Reset flag
        router.push("/vand-panel/categories");
    };

    return {
        name,
        slug,
        icon,
        error,
        isActive,
        iconError,
        iconPreview,
        isFormValid,
        setName: handleNameChange, // Use the new handleNameChange function
        setSlug,
        setIsActive,
        handleSubmit,
        handleFileChange,
    };
};
