import { getMenu } from "@/actions/v1";
import { Menu } from "@/components/menu/v1";

async function HomePage() {
    // Fetch menu from the server and cache it for 30 minutes
    const result = await getMenu({ cache: "force-cache", revalidate: 0.5 });

    return (
        <main className="pattern">
            <Menu result={result} />
        </main>
    );
}
export default HomePage;
