"use client";

import { useProductForm } from "@/hooks/v1";
import { Category, ProductFormProps } from "@/types/panel";
import { Button, Container, Form, Input, Message, Modal } from "../ui";

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

    return (
        <Modal
            onClose={() => {
                resetForm();
                props.onClose();
            }}
            title={
                props.initialData
                    ? `ویرایش ${props.initialData.name}`
                    : "ایجاد محصول"
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

                    {formErrors.categoryId && (
                        <Message>{formErrors.categoryId}</Message>
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
                        className="w-full r2l"
                        placeholder="نام محصول"
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

                {/* Price Input */}
                <Container>
                    <Input
                        required
                        id="price"
                        name="price"
                        type="number"
                        value={price}
                        placeholder="قیمت"
                        className="w-full r2l"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    {formErrors.newPrice && (
                        <Message>{formErrors.newPrice}</Message>
                    )}
                </Container>

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
};

export default ProductForm;
