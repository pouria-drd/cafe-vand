import MenuNavbar from "@/components/navbar/MenuNavbar";
import { MenuCategoryTable } from "@/components/ui";

function HomePage() {
    return (
        <main className="pattern">
            <section
                className="bg-bg1 bg-cover bg-center transition-all mx-auto
                flex flex-col items-center justify-between 
                min-h-screen max-w-full sm:max-w-sm">
                <MenuNavbar />

                <div className="size-full flex-1"></div>

                <MenuCategoryTable />
            </section>
        </main>
    );
}
export default HomePage;
