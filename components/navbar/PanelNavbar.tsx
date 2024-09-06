"use client";

import { useState } from "react";
import NavLinks from "./NavLinks";
import styles from "./navbar.module.css";
import Sidebar from "../sidebar/Sidebar";
import { CafeVandLogo, MenuButton } from "../ui";

const PanelNavbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <nav className={`${styles.vandPanelNavbar}`}>
                <CafeVandLogo
                    href="/vand-panel"
                    className="text-vand-secondary-2"
                />
                <NavLinks />
                <MenuButton onClick={() => setIsOpen(true)} />
            </nav>

            <Sidebar
                isOpen={isOpen}
                onClick={() => {
                    setIsOpen(false);
                }}
            />
        </>
    );
};

export default PanelNavbar;
