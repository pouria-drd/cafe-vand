"use client";

import { useProductForm } from "@/hooks/v1";
import { Button, Form, Input, Modal } from "../ui";
import { Category, ProductFormProps } from "@/types/panel";

type _ProductFormProps = ProductFormProps & { category: Category | Category[] };

const ProductForm = (props: _ProductFormProps) => {
    const {
        // variables
        name,
        slug,
        error,
        price,
        pending,
        isActive,
        categoryId,
        formErrors,
        isFormValid,
        // functions
        setName,
        setSlug,
        setPrice,
        resetForm,
        setIsActive,
        handleSubmit,
        setCategoryId,
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

    if (props.type === "modal")
        return (
            <Modal
                isOpen={props.isOpen}
                onClose={() => {
                    resetForm();
                    props.onClose();
                }}
                title={
                    props.initialData
                        ? `ویرایش ${props.isOpen && props.initialData.name}`
                        : "ایجاد محصول"
                }>
                <Form onSubmit={handleSubmit}>
                    {/* Display server error at the top */}
                    {error && (
                        <p className="text-center text-red-500 text-xs r2l">
                            {error}
                        </p>
                    )}

                    {/* Name Input */}
                    <Input
                        required
                        type="text"
                        name="name"
                        placeholder="نام محصول"
                        value={name}
                        onChange={setName}
                    />

                    {formErrors.name && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.name}
                        </p>
                    )}

                    {/* Slug Input */}
                    <Input
                        required
                        type="text"
                        name="slug"
                        value={slug}
                        placeholder="شناسه"
                        className="w-full"
                        onChange={(e) => setSlug(e.target.value)}
                    />

                    {formErrors.slug && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.slug}
                        </p>
                    )}

                    {/* Category Input */}
                    <select
                        name="category"
                        value={categoryId}
                        className="border p-2 rounded-md"
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">انتخاب دسته</option>

                        {renderCategoryOptions()}
                    </select>

                    {formErrors.categoryId && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.categoryId}
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
                            <label
                                className="cursor-pointer"
                                htmlFor="isActive">
                                {isActive ? "فعال" : "غیرفعال"}
                            </label>
                        </div>
                        <label className="cursor-pointer" htmlFor="isActive">
                            وضعیت
                        </label>
                    </div>

                    {formErrors.isActive && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.isActive}
                        </p>
                    )}

                    {/* Price Input */}
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

                    {formErrors.newPrice && (
                        <p className="absolute text-red-500 text-xs r2l">
                            {formErrors.newPrice}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" disabled={!isFormValid || pending}>
                        {pending
                            ? "لطفا صبر کنید ..."
                            : props.initialData
                            ? "ویرایش"
                            : "ایجاد"}
                    </Button>
                </Form>
            </Modal>
        );
    else {
        return (
            <Form onSubmit={handleSubmit} className="px-4 py-8">
                {/* Title */}
                <h1 className="font-bold text-xl sm:text-2xl text-right w-full r2l">
                    {props.initialData
                        ? `ویرایش ${props.initialData.name}`
                        : "ایجاد محصول"}
                </h1>

                {/* Display server error at the top */}
                {error && (
                    <p className="text-center text-red-500 text-xs r2l">
                        {error}
                    </p>
                )}

                {/* Name Input */}
                <Input
                    required
                    type="text"
                    name="name"
                    placeholder="نام محصول"
                    value={name}
                    onChange={setName}
                />

                {formErrors.name && (
                    <p className="absolute text-red-500 text-xs r2l">
                        {formErrors.name}
                    </p>
                )}

                {/* Slug Input */}
                <Input
                    required
                    type="text"
                    name="slug"
                    value={slug}
                    placeholder="شناسه"
                    className="w-full"
                    onChange={(e) => setSlug(e.target.value)}
                />

                {formErrors.slug && (
                    <p className="absolute text-red-500 text-xs r2l">
                        {formErrors.slug}
                    </p>
                )}

                {/* Category Input */}
                <select
                    name="category"
                    value={categoryId}
                    className="border p-2 rounded-md"
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">انتخاب دسته</option>

                    {renderCategoryOptions()}
                </select>

                {formErrors.categoryId && (
                    <p className="absolute text-red-500 text-xs r2l">
                        {formErrors.categoryId}
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

                {formErrors.isActive && (
                    <p className="absolute text-red-500 text-xs r2l">
                        {formErrors.isActive}
                    </p>
                )}

                {/* Price Input */}
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

                {formErrors.newPrice && (
                    <p className="absolute text-red-500 text-xs r2l">
                        {formErrors.newPrice}
                    </p>
                )}

                {/* Submit Button */}
                <Button type="submit" disabled={!isFormValid || pending}>
                    {pending
                        ? "لطفا صبر کنید ..."
                        : props.initialData
                        ? "ویرایش"
                        : "ایجاد"}
                </Button>
            </Form>
        );
    }
};

export default ProductForm;
