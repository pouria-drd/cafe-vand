import styles from "./menu.module.css";
import { MenuProduct } from "@/types/menu";

interface MenuProductCardProps {
    product: MenuProduct;
}
const MenuProductCard = (props: MenuProductCardProps) => {
    const { product } = props;
    return (
        <>
            <div className={`${styles.vandMenuProductCard} r2l`}>
                <span>{product.name}</span>
                <span>{product.price} T</span>
            </div>
        </>
    );
};

export default MenuProductCard;
