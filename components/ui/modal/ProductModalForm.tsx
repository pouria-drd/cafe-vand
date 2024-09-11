"use client";

import { useProductForm } from "@/hooks/v1";
import { Button, Form, Input, Modal } from "..";
import { ProductFormProps } from "@/types/panel";

const ProductModalForm = (props: ProductFormProps) => {
    const {
        // variables
        name,
        slug,
        error,
        pending,
        isActive,
        iconError,
        formErrors, // Add this line to access field-specific errors
        iconPreview,
        isFormValid,
        // functions
        setName,
        setSlug,
        resetForm,
        setIsActive,
        handleSubmit,
        handleFileChange,
    } = useProductForm(props);

    const renderCategoryOptions = () => {
        if (Array.isArray(props.category)) {
            return props.category.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ));
        } else if (!Array.isArray(props.category))
            return (
                <option value={props.category.id}>{props.category.name}</option>
            );
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                resetForm();
                props.onClose();
            }}
            title={
                props.type === "create"
                    ? "ایجاد محصول"
                    : `ویرایش ${props.isOpen && props.productData!.name}`
            }>
            <Form onSubmit={handleSubmit}>
                {error && (
                    <p className="text-center text-red-500 text-xs r2l">
                        {error}
                    </p>
                )}

                <Input
                    required
                    type="text"
                    name="name"
                    placeholder="نام محصول"
                    value={name}
                    onChange={setName}
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

                <div className="flex items-center justify-between gap-4 w-full">
                    <Input
                        id="price"
                        required
                        type="number"
                        name="price"
                        value={price}
                        placeholder="قیمت"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label htmlFor="price" className="cursor-pointer">
                        قیمت
                    </label>
                </div>

                <select
                    className="border p-2 rounded-md"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">انتخاب دسته</option>

                    {renderCategoryOptions()}
                </select>

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

                <Button type="submit" disabled={!isFormValid}>
                    {props.type === "create" ? "ایجاد" : "ویرایش"}
                </Button>
            </Form>
        </Modal>
    );
};

export default ProductModalForm;
