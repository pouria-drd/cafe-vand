import { CategoryList2, Navbar2 } from ".";
import { GetMenuResult } from "@/types/menu";

interface MenuProps {
    result: GetMenuResult;
}

const Menu2 = (props: MenuProps) => {
    if (!props.result || props.result.error || !props.result.data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-center r2l">
                    اطلاعاتی برای نمایش منو یافت نشد!
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col h-screen max-h-screen">
            <Navbar2 />
            <CategoryList2 categories={props.result.data} />
        </div>
    );
};

export default Menu2;
