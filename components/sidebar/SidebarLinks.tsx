"use client";

import SidebarLink from "./SidebarLink";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface SidebarLinksProps {
    isOpen: boolean;
    onClick?: () => void;
}

const SidebarLinks = (props: SidebarLinksProps) => {
    const pathName = usePathname();

    const container: Variants = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <AnimatePresence>
            {props.isOpen && (
                <motion.ul
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center w-full gap-2">
                    {navItems.map((item) => {
                        // Check exact match for the home route
                        const isActive =
                            pathName === item.path ||
                            (item.path !== "/vand-panel" &&
                                pathName.startsWith(`${item.path}/`));
                        return (
                            <SidebarLink
                                onClick={props.onClick}
                                key={item.path}
                                path={item.path}
                                name={item.name}
                                isActive={isActive}
                            />
                        );
                    })}
                </motion.ul>
            )}
        </AnimatePresence>
    );
};

export default SidebarLinks;
