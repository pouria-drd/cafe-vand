"use client";

import NavLink from "./NavLink";
import LinkList from "./LinkList";
import Sidebar from "../sidebar/Sidebar";
import styles from "./navbar.module.css";

import { AnimatePresence } from "framer-motion";
import { getUserAction } from "@/actions/v1/user";
import { Fragment, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminNavLinks, NavLinks } from "@/constants/routes";
import { CafeVandLogo, Container, MenuButton, UserProfile } from "../ui";

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname(); // To access current path
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserAction();
            if (!user) {
                router.push("/unauthorized");
            } else {
                setUser(user);
            }
        };
        fetchUser();
    }, []);

    return (
        <Fragment>
            <nav className={`${styles.vandNavbar} glass`}>
                <CafeVandLogo />
                <MenuButton onClick={() => setIsOpen(true)} />
                <Container className="hidden sm:flex flex-row w-fit gap-4">
                    <LinkList
                        className="flex-row-reverse"
                        data={
                            user?.isAdmin
                                ? [...NavLinks, ...AdminNavLinks]
                                : NavLinks
                        }
                        renderItem={(link, index) => {
                            const isActive =
                                pathName === link.path ||
                                (link.path !== "/admin" &&
                                    pathName.startsWith(`${link.path}/`));

                            return (
                                <NavLink
                                    link={link}
                                    isActive={isActive}
                                    key={index}
                                />
                            );
                        }}
                    />
                    <UserProfile user={user} />
                </Container>
            </nav>

            <AnimatePresence>
                {user && isOpen && (
                    <Sidebar
                        user={user}
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    />
                )}
            </AnimatePresence>
        </Fragment>
    );
};

export default Navbar;
