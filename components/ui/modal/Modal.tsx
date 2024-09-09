import { Backdrop } from "..";
import { motion } from "framer-motion";
import styles from "./modal.module.css";
import { CloseIcon } from "@/components/icons";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
    const title = props.title || "تیتر";

    const handleCloseModal = () => {
        props.onClose();
    };

    const stopPropagation = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    return (
        <Backdrop isOpen={props.isOpen} onClose={handleCloseModal}>
            {props.isOpen && (
                <motion.div
                    onClick={stopPropagation}
                    className={`${styles.vandModal} `}
                    initial={{ y: "-100vh", opacity: 0 }} // Modal starts above the screen
                    animate={{ y: 0, opacity: 1 }} // Animates to its normal position
                    exit={{ y: "-100vh", opacity: 0 }} // Exit back to top of the screen
                    transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth and controlled animation
                >
                    <div className="flex items-center justify-between gap-2 w-full">
                        <button onClick={handleCloseModal}>
                            <CloseIcon />
                        </button>
                        <h3 className="text-xl">{title}</h3>
                    </div>

                    <div className="w-full">{props.children}</div>
                </motion.div>
            )}
        </Backdrop>
    );
};

export default Modal;
