import { getPanelCategories } from "@/actions";
import { CategoryTable } from "@/components/ui";

async function VandPanel() {
    // Fetch categories from the server
    const result = await getPanelCategories();

    return (
        <section className="">
            <div>VandPanel</div>

            <CategoryTable categories={result?.data} error={result?.error} />
        </section>
    );
}

export default VandPanel;
