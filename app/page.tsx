import { Menu } from "@/components/menu";
import { getCategories } from "@/actions";
import { MenuNavbar } from "@/components/navbar";

async function HomePage() {
    // Fetch categories from the server
    const result = await getCategories();

    return (
        <main className="pattern">
            <section
                className="transition-all mx-auto bg-bgImage bg-cover bg-center
                flex flex-col items-center justify-between 
                min-h-screen max-w-full sm:max-w-sm">
                <MenuNavbar />
                <Menu result={result} />
            </section>
        </main>
    );
}
export default HomePage;
