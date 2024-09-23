import Menu from "@/components/menu/v1/Menu";
import { getMenuAction } from "@/actions/v1/menu/menu";

async function HomePage() {
    const result = await getMenuAction();

    return <Menu result={result} />;
}
export default HomePage;
