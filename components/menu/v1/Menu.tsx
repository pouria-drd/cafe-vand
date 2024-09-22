import styles from "./menu.module.css";
import { CategoryList, Navbar } from ".";

interface MenuProps {
    result: APIResponse<CategoryDetail[], string>;
}

const Menu = (props: MenuProps) => {
    if (!props.result || props.result.error || !props.result.data) {
        return (
            <div className="pattern">
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-red-500 text-center r2l">
                        اطلاعاتی برای نمایش منو یافت نشد!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="pattern">
            <div className={`${styles.vandMenu}`}>
                <div className="bg-vand-primary-2/70 glass flex flex-col h-full">
                    <Navbar />
                    <CategoryList categories={props.result.data} />
                </div>
            </div>
        </div>
    );
};

export default Menu;
