import { cn } from "@/utils/base";
import styles from "./user.module.css";

interface ProfileImageProps {
    seed: string;
    className?: string;
}

const ProfileImage = (props: ProfileImageProps) => {
    return (
        <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.seed}`}
            alt="Profile Picture"
            className={cn(`${styles.vandProfileImage}`, props.className)}
        />
    );
};

export default ProfileImage;
