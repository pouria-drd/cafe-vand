import { getPanelProducts } from "@/actions";
import { ProductTable } from "@/components/ui";
import { ProductForm } from "@/components/form";

async function ProductsPage() {
    // Fetch categories from the server
    const result = await getPanelProducts();

    return (
        <section className="flex flex-col gap-8">
            <ProductTable
                products={result?.data}
                error={result?.error}
                showCategoryName
            />
            {/* <ProductForm  type="create" /> */}
        </section>
    );
}

export default ProductsPage;
