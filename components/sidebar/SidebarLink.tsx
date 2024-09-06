import Link from "next/link";
import { motion } from "framer-motion";

interface SidebarLinkProps {
    path: string;
    name: string;
    isActive: boolean;
    onClick?: () => void;
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
        <motion.li
            variants={item}
            key={props.path}
            className={`flex items-start justify-end gap-2 hover:bg-vand-secondary-main/35 ${
                props.isActive && "bg-vand-secondary-main/45"
            } text-right rounded-lg py-2 w-full`}>
            <Link
                onClick={props.onClick}
                href={props.path}
                className={`transition-colors w-full ${
                    props.isActive
                        ? "text-vand-primary-main"
                        : "text-vand-primary-2"
                }`}>
                {props.name}
            </Link>

            {props.isActive && (
                <span className="bg-vand-primary-main rounded-xl h-full w-1 p-0.5" />
            )}
        </motion.li>
    );
};

export default SidebarLink;
