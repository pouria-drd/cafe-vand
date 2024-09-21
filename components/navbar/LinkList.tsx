import { cn } from "@/utils/base";
import { motion, Variants } from "framer-motion";

interface LinkListProps {
    data: NavLink[];
    className?: string;
    renderItem: (item: NavLink, index: number) => React.ReactNode;
}

const LinkList = (props: LinkListProps) => {
    const container: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={cn(
                "hidden sm:flex items-center gap-4 truncate",
                props.className
            )}>
            {props.data.map((item, index) => props.renderItem(item, index))}
        </motion.div>
    );
};

export default LinkList;
