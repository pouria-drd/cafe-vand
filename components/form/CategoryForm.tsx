"use client";

import { Button, Input } from "../ui";
import { CategoryFormData } from "@/types/panel";
import { useCategoryForm } from "@/hooks/useCategoryForm";

interface CreateCategoryFormProps {
    type: "create";
}

interface UpdateCategoryFormProps {
    type: "update";
    initialData: CategoryFormData;
}

type CategoryFormProps = CreateCategoryFormProps | UpdateCategoryFormProps;

const CategoryForm = (props: CategoryFormProps) => {
    const {
        name,
        slug,
        error,
        isActive,
        iconError,
        iconPreview,
        isFormValid,
        setName,
        setSlug,
        setIsActive,
        handleSubmit,
        handleFileChange,
    } = useCategoryForm(props);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col gap-8 shadow-md rounded-lg mx-auto px-4 py-8">
            <h1 className="font-bold text-xl sm:text-2xl text-right w-full">
                {props.type === "create" ? "ایجاد دسته" : "ویرایش دسته"}
            </h1>

            {error && (
                <p className="text-center text-red-500 text-xs r2l">{error}</p>
            )}

            <Input
                required
                type="text"
                name="name"
                placeholder="نام دسته"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                required
                type="text"
                name="slug"
                value={slug}
                placeholder="شناسه"
                className="w-full"
                onChange={(e) => setSlug(e.target.value)}
            />

            <div className="flex items-center justify-end gap-4 w-full">
                <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={isActive}
                    className="cursor-pointer size-4"
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                <label className="cursor-pointer" htmlFor="isActive">
                    فعال
                </label>
            </div>

            <div className="flex items-center justify-between gap-2 w-full">
                <input
                    id="icon"
                    type="file"
                    name="icon"
                    accept={process.env.NEXT_PUBLIC_VALID_FILE_TYPES}
                    placeholder="آیکون"
                    className="cursor-pointer"
                    onChange={handleFileChange}
                />
                <label className="cursor-pointer" htmlFor="icon">
                    آیکون
                </label>
            </div>

            {iconPreview && (
                <div className="w-full">
                    <img
                        src={iconPreview}
                        alt="Preview"
                        className="size-14 object-cover mx-auto"
                    />
                </div>
            )}

            {iconError && (
                <p className="text-red-500 text-xs r2l">{iconError}</p>
            )}

            <Button type="submit" disabled={!isFormValid}>
                {props.type === "create" ? "ایجاد دسته" : "ویرایش دسته"}
            </Button>
        </form>
    );
};

export default CategoryForm;
