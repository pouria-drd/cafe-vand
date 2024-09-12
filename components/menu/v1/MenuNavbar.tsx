import styles from "./menu.module.css";
import { CafeVandLogo } from "@/components/ui";

const MenuNavbar = () => {
    return (
        <nav className={`${styles.vandMenuNavbar} glass`}>
            <CafeVandLogo />
        </nav>
    );
};

export default MenuNavbar;
