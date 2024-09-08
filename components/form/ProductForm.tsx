"use client";

import { Button, Input } from "../ui";
import styles from "./form.module.css";
import { useProductForm } from "@/hooks";
import { PanelCategory, PanelProduct } from "@/types/panel";

interface CreateProductFormProps {
    type: "create";
    category: PanelCategory | PanelCategory[];
}

interface UpdateProductFormProps {
    type: "update";
    productSlug: string;
    category: PanelCategory | PanelCategory[];
    initialData: PanelProduct;
}

type ProductFormProps = CreateProductFormProps | UpdateProductFormProps;

const ProductForm = (props: ProductFormProps) => {
    const {
        name,
        slug,
        price,
        error,
        category,
        isActive,
        isFormValid,
        setName,
        setSlug,
        setPrice,
        setCategory,
        setIsActive,
        handleSubmit,
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
        </form>
    );
};

export default ProductForm;
