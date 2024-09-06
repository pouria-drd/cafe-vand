import { VandIcon } from "../icons";
import SidebarLinks from "./SidebarLinks";
import styles from "./sidebar.module.css";
import { AppVersion, CloseButton } from "../ui";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface SidebarProps {
    isOpen: boolean;
    onClick: () => void;
}

const Sidebar = (props: SidebarProps) => {
    // Sidebar animation variants (with simple, smooth transitions)
    const sidebarVariants: Variants = {
        hidden: {
            x: "100%", // Start off-screen to the right
            opacity: 0,
            transition: {
                duration: 0.3, // 0.3 seconds
                ease: "easeInOut", // Smooth easing in and out
            },
        },
        visible: {
            x: 0, // Moves into view
            opacity: 1,
            transition: {
                duration: 0.3, // 0.3 seconds
                ease: "easeInOut", // Smooth easing in and out
            },
        },
        exit: {
            x: "100%", // Moves off-screen to the right
            opacity: 0,
            transition: {
                duration: 0.3, // 0.3 seconds
                ease: "easeInOut", // Smooth easing in and out
            },
        },
    };

    return (
        <AnimatePresence>
            {props.isOpen && (
                <motion.aside
                    variants={sidebarVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`${styles.vandSidebar}`}
                    onClick={(e) => e.stopPropagation()} // Prevent click propagation
                >
                    <div className="flex items-center justify-between w-full">
                        <CloseButton onClick={props.onClick} />
                        <VandIcon />
                    </div>

                    <SidebarLinks
                        isOpen={props.isOpen}
                        onClick={props.onClick}
                    />

                    <AppVersion className="right-6" />
                </motion.aside>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
