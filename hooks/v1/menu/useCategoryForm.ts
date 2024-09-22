import { useRouter } from "next/navigation";
import { convertToBase64, slugify } from "@/utils/base";
import { useState, useEffect, useCallback } from "react";
import {
    createCategoryAction,
    updateCategoryAction,
} from "@/actions/v1/menu/category";

// Constants
const MAX_FILE_SIZE_MB = parseInt(
    process.env.NEXT_PUBLIC_MAX_ICON_SIZE || "1",
    10
);
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const VALID_FILE_TYPES = (
    process.env.NEXT_PUBLIC_VALID_FILE_TYPES || "image/png,image/jpeg"
).split(",");

const useCategoryForm = (props: CategoryFormProps) => {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const [isNameEdited, setIsNameEdited] = useState<boolean>(false);
    const [inputError, setInputError] = useState<CategoryInputErrors>({});

    // Initialize form states
    const [name, setName] = useState<string>(
        props.initialData ? props.initialData.name : ""
    );
    const [slug, setSlug] = useState<string>(
        props.initialData ? props.initialData.slug : ""
    );
    const [isActive, setIsActive] = useState<boolean>(
        props.initialData ? props.initialData.isActive : true
    );
    const [icon, setIcon] = useState<string | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(
        props.initialData ? props.initialData.icon : null
    );

    // Update slug when name changes (only after user edits)
    useEffect(() => {
        if (name && isNameEdited) setSlug(slugify(name));
    }, [name, isNameEdited]);

    // Handle name change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (!isNameEdited) setIsNameEdited(true);
    };

    const validateIcon = (file: File): boolean => {
        if (file.size > MAX_FILE_SIZE) {
            setInputError({
                icon: `حجم فایل باید حداکثر ${MAX_FILE_SIZE_MB}MB باشد.`,
            });
            return false;
        }
        if (!VALID_FILE_TYPES.includes(file.type)) {
            setInputError({
                icon: "فرمت فایل نامعتبر است. فقط png و jpg مجاز هستند.",
            });
            return false;
        }
        setInputError({ icon: "" });
        return true;
    };

    // Handle file input change
    const handleFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file && validateIcon(file)) {
                setIcon(await convertToBase64(file));
                setIconPreview(URL.createObjectURL(file));
            } else {
                setIcon(null);
                setIconPreview(null);
            }
        },
        []
    );

    // Handle form submission
    const handleCategorySubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setPending(true);

        const categoryData: CategoryFormData = {
            name,
            slug,
            isActive,
            icon: icon || undefined,
        };

        try {
            const result = props.initialData
                ? await updateCategoryAction(
                      props.initialData.slug,
                      categoryData
                  )
                : await createCategoryAction(categoryData);

            setPending(false);

            if (!result || result.error === "invalid-credentials") {
                router.push("/unauthorized");
                return;
            }

            if (result.error) {
                setError(result.error);
            } else if (result.inputError) {
                setInputError(result.inputError);
            } else if (result.data?.category) {
                props.type === "modal" && props.onClose();
            }
        } catch (error) {
            // console.log(error);
        }
    };

    return {
        name,
        slug,
        icon,
        error,
        pending,
        isActive,
        inputError,
        iconPreview,
        setName: handleNameChange,
        setSlug,
        setIsActive,
        handleFileChange,
        handleCategorySubmit,
    };
};

export default useCategoryForm;
