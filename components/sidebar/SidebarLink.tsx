import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./sidebar.module.css";

interface SidebarLinkProps {
    link: NavLink;
    isActive: boolean;
    onClick: () => void;
}

const SidebarLink = (props: SidebarLinkProps) => {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <motion.div
            onClick={props.onClick}
            variants={item}
            className={`${styles.vandSidebarLink} ${
                props.isActive && "bg-vand-secondary-main/45"
            }`}>
            <Link
                onClick={props.onClick}
                href={props.link.path}
                className={`transition-colors w-full ${
                    props.isActive
                        ? "text-vand-primary-main"
                        : "text-vand-primary-2"
                }`}>
                {props.link.name}
            </Link>

            {props.isActive && (
                <span className="bg-vand-primary-main rounded-xl h-full w-1 p-0.5" />
            )}
        </motion.div>
    );
};

export default SidebarLink;
