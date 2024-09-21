import { useState } from "react";
import { cn } from "@/utils/base";
import styles from "./user.module.css";
import { AnimatePresence } from "framer-motion";
import { LoadingSpinner, ProfileImage, UserCard } from "..";

interface UserProfileProps {
    user: User | null;
    className?: string;
}

const UserProfile = (props: UserProfileProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cn("", props.className)}>
            <button
                onClick={handleClick}
                disabled={!props.user}
                className={`${styles.vandUserProfile}`}>
                {!props.user ? (
                    <LoadingSpinner borderSize={2} className="text-white w-5" />
                ) : (
                    <ProfileImage seed={props.user.username} />
                )}
            </button>

            <AnimatePresence>
                {props.user && isOpen && <UserCard user={props.user} />}
            </AnimatePresence>
        </div>
    );
};

export default UserProfile;
