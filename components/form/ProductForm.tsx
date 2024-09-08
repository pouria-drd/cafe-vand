"use client";

import { Button, Input } from "../ui";
import styles from "./form.module.css";
import { useProductForm } from "@/hooks";
import { PanelCategory, ProductFormData } from "@/types/panel";

interface CreateProductFormProps {
    type: "create";
    category: PanelCategory;
}

interface UpdateProductFormProps {
    type: "update";
    productSlug: string;
    category: PanelCategory;
    initialData: ProductFormData;
}

type ProductFormProps = CreateProductFormProps | UpdateProductFormProps;

const ProductForm = (props: ProductFormProps) => {
    const {
        name,
        slug,
        category,
        error,
        isActive,
        isFormValid,
        setName,
        setSlug,
        setCategory,
        setIsActive,
        handleSubmit,
    } = useProductForm(props);

    return (
        <form onSubmit={handleSubmit} className={`${styles.vandForm}`}>
            <h1 className="font-bold text-xl sm:text-2xl text-right w-full r2l">
                {props.type === "create"
                    ? "ایجاد محصول"
                    : `ویرایش ${props.initialData.name}`}
            </h1>

            {error && (
                <p className="text-center text-red-500 text-xs r2l">{error}</p>
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

            {props.type === "create" && (
                <select
                    className="border p-2 rounded-md"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">انتخاب دسته</option>
                    <option value={props.category.id}>
                        {props.category.name}
                    </option>
                </select>
            )}

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
        </form>
    );
};

export default ProductForm;
