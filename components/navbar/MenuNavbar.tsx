import { CafeVandLogo } from "../ui";
import styles from "./navbar.module.css";

const MenuNavbar = () => {
    return (
        <nav className={`${styles.vandMenuNavbar} glass`}>
            <CafeVandLogo />
        </nav>
    );
};

export default MenuNavbar;
