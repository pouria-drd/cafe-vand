"use client";

import styles from "./menu.module.css";
import { MenuProduct } from "@/types/menu";
import MenuProductCard from "./MenuProductCard";

interface MenuProductListProps {
    products?: MenuProduct[];
}

const MenuProductList = (props: MenuProductListProps) => {
    if (!props.products || props.products.length === 0) {
        return (
            <div
                className={`${styles.vandMenuProductList} glass justify-center`}>
                <p className="text-center text-vand-secondary-main r2l">
                    هیچ محصولی یافت نشد!
                </p>
            </div>
        );
    }

    return (
        <div className={`${styles.vandMenuProductList} glass`}>
            {props.products.map((product) => (
                <>
                    <MenuProductCard key={product.id} product={product} />
                </>
            ))}
        </div>
    );
};

export default MenuProductList;
