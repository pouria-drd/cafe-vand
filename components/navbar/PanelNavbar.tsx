import { CafeVandLogo } from "../ui";
import styles from "./navbar.module.css";

const PanelNavbar = () => {
    return (
        <nav
            className={`${styles.vandPanelNavbar} bg-gray-100 transition-all p-4`}>
            <CafeVandLogo className="text-vand-secondary-2" />
        </nav>
    );
};

export default PanelNavbar;
