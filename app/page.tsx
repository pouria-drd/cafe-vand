import { getMenu } from "@/actions/v1";
// import { Menu } from "@/components/menu/v1";
import { Menu2 } from "@/components/menu/v2";

async function HomePage() {
    // Fetch menu from the server and cache it for 30 minutes
    const result = await getMenu({ cache: "force-cache", revalidate: 0.5 });

    return (
        <main>
            {/* <Menu result={result} /> */}
            <Menu2 result={result} />
        </main>
    );
}
export default HomePage;
