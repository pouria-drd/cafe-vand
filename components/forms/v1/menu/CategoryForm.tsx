"use client";

import { useCategoryForm } from "@/hooks/v1/menu";
import {
    Button,
    Container,
    Form,
    Input,
    Message,
    Modal,
} from "@/components/ui";

const CategoryForm = (props: CategoryFormProps) => {
    const {
        // variables
        name,
        slug,
        error,
        pending,
        isActive,
        inputError,
        iconPreview,
        // functions
        setName,
        setSlug,
        setIsActive,
        handleFileChange,
        handleCategorySubmit,
    } = useCategoryForm(props);

    return (
        <Modal onClose={props.onClose} title="دسته بندی جدید">
            <Form
                onSubmit={handleCategorySubmit}
                className="p-0 w-auto max-w-full">
                {/* Display server error at the top */}
                {error && <Message className="text-center">{error}</Message>}

                {/* Active Checkbox */}
                <Container className="flex-row justify-between gap-4">
                    <Container className="flex-row justify-start gap-2">
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
                    </Container>
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
                        label="نام دسته"
                        autoComplete="off"
                        onChange={setName}
                        error={inputError.name}
                    />
                </Container>
                {/* Slug Input */}
                <Container>
                    <Input
                        required
                        type="text"
                        name="slug"
                        value={slug}
                        label="شناسه"
                        autoComplete="off"
                        error={inputError.slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                </Container>
                {/* Icon File Input */}
                <Container>
                    <label
                        className="cursor-pointer text-zinc-700 text-right w-full"
                        htmlFor="icon">
                        تصویر
                    </label>
                    <Input
                        id="icon"
                        type="file"
                        name="icon"
                        error={inputError.icon}
                        onChange={handleFileChange}
                        className="cursor-pointer w-full l2r"
                        accept={process.env.NEXT_PUBLIC_VALID_FILE_TYPES}
                    />
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
                <Button type="submit" waiting={pending} className="r2l">
                    {pending
                        ? "لطفا صبر کنید ..."
                        : props.initialData
                        ? `ویرایش ${props.initialData.name}`
                        : "ایجاد"}
                </Button>
            </Form>
        </Modal>
    );
};

export default CategoryForm;
