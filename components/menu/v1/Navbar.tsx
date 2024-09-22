import styles from "./menu.module.css";
import { CafeVandLogo } from "@/components/ui";

const Navbar = () => {
    return (
        <nav className={`${styles.vandMenuNavbar} glass`}>
            <CafeVandLogo className="text-white" />
        </nav>
    );
};

export default Navbar;
