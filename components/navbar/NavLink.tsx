import Link from "next/link";
import { motion } from "framer-motion";

interface NavLinkProps {
    link: NavLink;
    isActive: boolean;
}

const NavLink = (props: NavLinkProps) => {
    return (
        <div>
            <Link
                href={props.link.path}
                className={`transition-all ${
                    props.isActive ? "text-vand-primary-main" : "text-zinc-700"
                } mx-1`}>
                {props.link.name}
            </Link>

            {props.isActive && (
                <motion.span
                    layoutId="drd"
                    className="mt-0.5 h-0.5 bg-vand-primary-main w-full block"
                />
            )}
        </div>
    );
};

export default NavLink;
