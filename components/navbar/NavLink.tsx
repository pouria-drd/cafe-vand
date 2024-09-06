import Link from "next/link";
import { motion } from "framer-motion";

interface NavLinkProps {
    path: string;
    name: string;
    isActive: boolean;
}

const NavLink = (props: NavLinkProps) => {
    return (
        <li key={props.path} className="inline-block">
            <Link
                href={props.path}
                className={`transition-all ${
                    props.isActive
                        ? "text-vand-primary-main"
                        : "text-vand-secondary-2"
                } mx-1`}>
                {props.name}
            </Link>
            {props.isActive && (
                <motion.span
                    layoutId="drd"
                    className="mt-0.5 h-0.5 bg-vand-primary-main w-full block"
                />
            )}
        </li>
    );
};

export default NavLink;
