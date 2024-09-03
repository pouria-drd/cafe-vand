import Link from "next/link";
import { VandIcon } from "../icons";
import styles from "./navbar.module.css";

const MenuNavbar = () => {
    return (
        <nav className={`${styles.vandMenuNavbar} glass`}>
            <Link href={"/"}>
                <VandIcon className="size-14" />
            </Link>
        </nav>
    );
};

export default MenuNavbar;
