import { VandIcon } from "../icons";
import SidebarLink from "./SidebarLink";
import styles from "./sidebar.module.css";
import LinkList from "../navbar/LinkList";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { AdminNavLinks, UserNavLinks } from "@/constants/routes";
import { AppVersion, CloseButton, Container, UserCard } from "../ui";

interface SidebarProps {
    user: User;
    onClick: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const pathName = usePathname();

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
        <motion.aside
            exit="exit"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className={`${styles.vandSidebar}`}
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
        >
            <Container>
                <Container className="flex-row justify-between">
                    <CloseButton onClick={props.onClick} />
                    <VandIcon />
                </Container>

                <LinkList
                    className="flex flex-col items-center w-full gap-2 mt-8"
                    data={
                        props.user.isAdmin
                            ? [...UserNavLinks, ...AdminNavLinks]
                            : UserNavLinks
                    }
                    renderItem={(link, index) => {
                        const isActive =
                            pathName === link.path ||
                            (link.path !== "/admin" &&
                                pathName.startsWith(`${link.path}/`));

                        return (
                            <SidebarLink
                                link={link}
                                key={link.name}
                                isActive={isActive}
                                onClick={props.onClick}
                            />
                        );
                    }}
                />
            </Container>
            <Container className="flex-1 justify-end">
                <UserCard className="shadow-none static" user={props.user} />
            </Container>
            <AppVersion className="right-6" />
        </motion.aside>
    );
};

export default Sidebar;
