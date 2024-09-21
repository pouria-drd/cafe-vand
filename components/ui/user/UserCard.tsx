"use client";

import { useState } from "react";
import { cn } from "@/utils/base";
import styles from "./user.module.css";
import { useRouter } from "next/navigation";
import { LogoutIcon } from "@/components/icons";
import { motion, Variants } from "framer-motion";
import { logoutAction } from "@/actions/v1/authentication";
import { Button, Container, Message, ProfileImage, Title } from "..";

interface UserCardProps {
    user: User;
    className?: string;
}

const UserCard = (props: UserCardProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        setIsLoading(true);
        // Call the server action to clear cookies
        await logoutAction();
        setIsLoading(false);
        // Redirect to login page
        router.push("/auth");
    };

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
        <motion.div
            exit="exit"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className={cn(
                `${styles.vandUserCard} gap-2 shadow-xl absolute top-[90px] right-4`,
                props.className
            )}>
            <Container>
                <ProfileImage seed={props.user.username} />
                <Title>{props.user.username}</Title>
            </Container>
            <Container>
                {props.user.fullName && (
                    <Message className="text-gray-500">
                        {props.user.fullName}
                    </Message>
                )}
                {props.user.email && <Message>{props.user.email}</Message>}
            </Container>
            <Button
                waiting={isLoading}
                className="bg-zinc-700 hover:bg-zinc-800 text-white rounded
                            flex items-center justify-center gap-1 py-1.5 mt-2"
                onClick={handleLogout}>
                <p className="text-sm">خروج</p>
                <LogoutIcon />
            </Button>
        </motion.div>
    );
};

export default UserCard;
