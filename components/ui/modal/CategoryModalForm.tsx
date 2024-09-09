"use client";

import { useCategoryForm } from "@/hooks";
import { Button, Form, Input, Modal } from "..";
import { CategoryFormProps } from "@/types/panel";

const CategoryModalForm = (props: CategoryFormProps) => {
    const {
        // variables
        name,
        slug,
        error,
        isActive,
        iconError,
        iconPreview,
        isFormValid,
        formErrors, // Add this line to access field-specific errors
        // functions
        setName,
        setSlug,
        resetForm,
        setIsActive,
        handleSubmit,
        handleFileChange,
    } = useCategoryForm(props);

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                resetForm();
                props.onClose();
            }}
            title={
                props.type === "create"
                    ? "دسته بندی جدید"
                    : `ویرایش دسته بندی ${props.initialData.name}`
            }>
            <Form onSubmit={handleSubmit}>
                {/* Display server error at the top */}
                {error && (
                    <p className="text-center text-red-500 text-xs r2l">
                        {error}
                    </p>
                )}

                {/* Active Checkbox */}
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2">
                        <input
                            id="isActive"
                            type="checkbox"
                            name="isActive"
                            checked={isActive}
                            className="cursor-pointer size-4"
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <label className="cursor-pointer" htmlFor="isActive">
                            {isActive ? "فعال" : "غیرفعال"}
                        </label>
                    </div>
                    <label className="cursor-pointer" htmlFor="isActive">
                        وضعیت
                    </label>
                </div>

                {/* Name Input */}
                <div className="flex flex-col items-center justify-center gap-1 w-full">
                    <Input
                        autoFocus
                        required
                        type="text"
                        name="name"
                        value={name}
                        autoComplete="off"
                        className="w-full"
                        onChange={setName}
                        placeholder="نام دسته"
                    />
                    {formErrors.name && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.name}
                        </p>
                    )}
                </div>

                {/* Slug Input */}
                <div className="flex flex-col items-center justify-center gap-1 w-full">
                    <Input
                        required
                        type="text"
                        name="slug"
                        value={slug}
                        autoComplete="off"
                        className="w-full"
                        placeholder="شناسه"
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    {formErrors.slug && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.slug}
                        </p>
                    )}
                </div>

                {/* Icon File Input */}
                <div className="flex flex-col items-center justify-center gap-1 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label
                            className="cursor-pointer text-right w-full"
                            htmlFor="icon">
                            آیکون
                        </label>
                        <Input
                            id="icon"
                            type="file"
                            name="icon"
                            accept={process.env.NEXT_PUBLIC_VALID_FILE_TYPES}
                            placeholder="آیکون"
                            className="cursor-pointer w-full"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/* Icon Error */}
                    {iconError && (
                        <p className="text-red-500 text-xs text-right r2l w-full">
                            {iconError}
                        </p>
                    )}
                </div>

                {/* Icon Preview */}
                {iconPreview && (
                    <div className="w-full">
                        <img
                            src={iconPreview}
                            alt="Preview"
                            className="size-14 object-cover mx-auto"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <Button type="submit" disabled={!isFormValid}>
                    {props.type === "create" ? "ایجاد" : "ویرایش"}
                </Button>
            </Form>
        </Modal>
    );
};

export default CategoryModalForm;
