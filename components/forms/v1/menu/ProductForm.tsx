"use client";

import { useProductForm } from "@/hooks/v1/menu";
import {
    Button,
    Container,
    Form,
    Input,
    Message,
    Modal,
} from "@/components/ui";

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
        inputError,
        // functions
        setName,
        setSlug,
        setPrice,
        setIsActive,
        setCategoryId,
        handleProductSubmit,
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
            onClose={() => {
                props.onClose();
            }}
            title={
                props.initialData
                    ? `ویرایش ${props.initialData.name}`
                    : "ایجاد محصول"
            }>
            <Form
                onSubmit={handleProductSubmit}
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

                {/* Category Input */}
                <Container>
                    <select
                        name="category"
                        value={categoryId}
                        className="border p-2 rounded-md w-full"
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">انتخاب دسته</option>

                        {renderCategoryOptions()}
                    </select>

                    {inputError.categoryId && (
                        <Message status="error" className="text-right">
                            {inputError.categoryId}
                        </Message>
                    )}
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
                        label="نام محصول"
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

                {/* Price Input */}
                <Container>
                    <Input
                        required
                        id="price"
                        name="price"
                        type="number"
                        label="قیمت"
                        value={price}
                        error={inputError.newPrice}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Container>

                {/* Submit Button */}
                <Button type="submit" waiting={pending}>
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

export default ProductForm;
