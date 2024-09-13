import { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./backdrop.module.css";

interface BackdropProps {
    onClose: () => void;
    children?: ReactNode; // Modal will be passed here as children
}

const Backdrop = (props: BackdropProps) => {
    return (
        <motion.div
            onClick={props.onClose}
            className={`${styles.vandBackdrop}`}
            initial={{ opacity: 0 }} // Initial state for animation
            animate={{ opacity: 1 }} // Animate to this state
            exit={{ opacity: 0 }} // Exit animation
            transition={{ duration: 0.4 }} // Smooth transition timing
        >
            {props.children} {/* Modal passed as children */}
        </motion.div>
    );
};

export default Backdrop;
