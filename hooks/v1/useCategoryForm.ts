import { z } from "zod";
import { convertToBase64, slugify } from "@/lib/utils";
import { createCategory, updateCategory } from "@/actions/v1";
import { useState, useEffect, useMemo, useCallback } from "react";
import { CategoryFormProps, CategoryFormData } from "@/types/panel";

// Constants
const MAX_FILE_SIZE_MB = parseInt(
    process.env.NEXT_PUBLIC_MAX_ICON_SIZE || "1",
    10
);
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const VALID_FILE_TYPES = (
    process.env.NEXT_PUBLIC_VALID_FILE_TYPES || "image/png,image/jpeg"
).split(",");

// Zod schema
const categorySchema = z.object({
    name: z.string().min(3, { message: "نام دسته‌بندی الزامی است" }),
    slug: z.string().min(3, { message: "شناسه دسته‌بندی الزامی است" }),
    isActive: z.boolean(),
    icon: z.string().optional(),
});

export const useCategoryForm = (props: CategoryFormProps) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{
        slug: string;
        name: string;
        icon: string;
    }>({
        slug: "",
        name: "",
        icon: "",
    });

    const [iconError, setIconError] = useState<string | null | undefined>(null);
    const [isNameEdited, setIsNameEdited] = useState<boolean>(false);

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
        props.initialData ? props.initialData?.icon : null
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

    const validateIcon = (
        file: File,
        setError: (error: string | null) => void
    ): boolean => {
        if (file.size > MAX_FILE_SIZE) {
            setError(`حجم فایل باید حداکثر ${MAX_FILE_SIZE_MB}MB باشد.`);
            return false;
        }
        if (!VALID_FILE_TYPES.includes(file.type)) {
            setError("فرمت فایل نامعتبر است. فقط png و jpg مجاز هستند.");
            return false;
        }
        setError(null);
        return true;
    };

    // Handle file input change
    const handleFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file && validateIcon(file, setIconError)) {
                setIcon(await convertToBase64(file));
                setIconPreview(URL.createObjectURL(file));
            } else {
                setIcon(null);
                setIconPreview(null);
            }
        },
        []
    );

    // Validate form
    const validateForm = () => {
        const validation = categorySchema.safeParse({
            name,
            slug,
            isActive,
            icon: props.initialData && iconPreview ? undefined : icon,
        });

        if (!validation.success) {
            // Clear the current errors
            const newFormErrors = {
                name: "",
                slug: "",
                icon: "",
            };

            // Map over Zod errors and assign them to formErrors
            validation.error.errors.forEach((error) => {
                if (error.path[0] === "slug") {
                    newFormErrors.slug = error.message;
                }
                if (error.path[0] === "name") {
                    newFormErrors.name = error.message;
                }
                if (error.path[0] === "icon") {
                    newFormErrors.icon = error.message;
                }
            });

            setFormErrors(newFormErrors); // Set errors into state
            return false;
        }

        setFormErrors({ name: "", slug: "", icon: "" });
        return true;
    };

    // Form validity
    const isFormValid = useMemo(() => {
        return validateForm() && !iconError;
    }, [name, slug, iconError, icon]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        setPending(true);

        const categoryData: CategoryFormData = {
            name,
            slug,
            isActive,
            icon: icon || undefined,
        };
        const result = props.initialData
            ? await updateCategory(props.initialData.slug, categoryData)
            : await createCategory(categoryData);

        setPending(false);

        if (result.error) {
            setError(result.error);
        } else {
            resetForm();
            props.type === "modal" && props.onClose();
        }
    };

    // Reset form fields
    const resetForm = () => {
        if (props.initialData) {
            setName(props.initialData.name);
            setSlug(props.initialData.slug);
            setIcon(props.initialData.icon);
            setIsActive(props.initialData.isActive);
        } else {
            setName("");
            setSlug("");
            setIcon(null);
            setIsActive(true);
        }

        setError(null);
        setPending(false);
        setIconError(null);
        setIconPreview(null);
        setIsNameEdited(false);
        setFormErrors({ name: "", slug: "", icon: "" });
    };

    return {
        name,
        slug,
        icon,
        error,
        pending,
        isActive,
        iconError,
        formErrors,
        iconPreview,
        isFormValid,
        setName: handleNameChange,
        setSlug,
        resetForm,
        setIsActive,
        handleSubmit,
        handleFileChange,
    };
};
