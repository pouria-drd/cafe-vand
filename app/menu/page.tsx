import { Menu2 } from "@/components/menu/v2";
import { getMenuAction } from "@/actions/v1/menu/menu";

async function MenePage() {
    const result = await getMenuAction();

    return <Menu2 result={result} />;
}

export default MenePage;
