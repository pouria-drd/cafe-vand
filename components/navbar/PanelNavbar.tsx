import NavLinks from "./NavLinks";
import { CafeVandLogo } from "../ui";
import styles from "./navbar.module.css";

const PanelNavbar = () => {
    return (
        <nav className={`${styles.vandPanelNavbar}`}>
            <CafeVandLogo className="text-vand-secondary-2" />
            <NavLinks />
        </nav>
    );
};

export default PanelNavbar;
