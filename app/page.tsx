import MenuNavbar from "@/components/navbar/MenuNavbar";
import { MenuCategoryTable } from "@/components/ui";

function HomePage() {
    return (
        <main className="pattern">
            <section
                className=" transition-all mx-auto
                flex flex-col items-center justify-between 
                min-h-screen max-w-full sm:max-w-sm">
                <MenuNavbar />

                <div className="size-full flex-1 bg-bgImage bg-cover bg-center overflow-auto"></div>

                <MenuCategoryTable />
            </section>
        </main>
    );
}
export default HomePage;
