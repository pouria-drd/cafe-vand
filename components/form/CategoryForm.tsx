"use client";

import { useCategoryForm } from "@/hooks/v1";
import { CategoryFormProps } from "@/types/panel";
import { Button, Form, Container, Input, Message, Modal } from "../ui";

const CategoryForm = (props: CategoryFormProps) => {
    const {
        // variables
        name,
        slug,
        error,
        pending,
        isActive,
        iconError,
        formErrors,
        iconPreview,
        isFormValid,
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
            onClose={() => {
                resetForm();
                props.onClose();
            }}
            title={
                props.initialData
                    ? `ویرایش ${props.initialData.name}`
                    : "دسته بندی جدید"
            }>
            <Form onSubmit={handleSubmit}>
                {/* Display server error at the top */}
                {error && <Message className="text-center">{error}</Message>}

                {/* Active Checkbox */}
                <Container className="flex-row justify-between gap-4">
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
                </Container>

                {/* Name Input */}
                <Container>
                    <Input
                        required
                        autoFocus
                        type="text"
                        name="name"
                        value={name}
                        onChange={setName}
                        autoComplete="off"
                        className="w-full r2l"
                        placeholder="نام دسته"
                    />
                    {formErrors.name && <Message>{formErrors.name}</Message>}
                </Container>

                {/* Slug Input */}
                <Container>
                    <Input
                        required
                        type="text"
                        name="slug"
                        value={slug}
                        autoComplete="off"
                        placeholder="شناسه"
                        className="w-full r2l"
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    {formErrors.slug && <Message>{formErrors.slug}</Message>}
                </Container>

                {/* Icon File Input */}
                <Container>
                    <label
                        className="cursor-pointer text-right w-full"
                        htmlFor="icon">
                        تصویر
                    </label>
                    <Input
                        id="icon"
                        type="file"
                        name="icon"
                        placeholder="آیکون"
                        onChange={handleFileChange}
                        className="cursor-pointer w-full"
                        accept={process.env.NEXT_PUBLIC_VALID_FILE_TYPES}
                    />
                    {/* Icon Error */}
                    {iconError && <Message>{iconError}</Message>}
                </Container>

                {/* Icon Preview */}
                {iconPreview && (
                    <Container className="bg-gray-50 border-2 border-dashed rounded-lg p-4">
                        <img
                            src={iconPreview}
                            alt="Preview"
                            className="size-20 rounded"
                        />
                    </Container>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={!isFormValid || pending}
                    className="r2l">
                    {pending
                        ? "لطفا صبر کنید ..."
                        : props.initialData
                        ? "ویرایش"
                        : "ایجاد"}
                </Button>
            </Form>
        </Modal>
    );
};

export default CategoryForm;
