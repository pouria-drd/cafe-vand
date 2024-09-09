import { ReactNode } from "react";
import styles from "./backdrop.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface BackdropProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; // Modal will be passed here as children
}

const Backdrop = (props: BackdropProps) => {
    return (
        <AnimatePresence>
            {props.isOpen && (
                // Animate backdrop with fade in/out effect
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
            )}
        </AnimatePresence>
    );
};

export default Backdrop;
