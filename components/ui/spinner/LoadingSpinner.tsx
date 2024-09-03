import { cn } from "@/lib/utils";
import styles from "./spinner.module.css";

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
    return (
        <div
            className={cn(
                styles.loader,
                "w-[50px] text-vand-primary-main",
                props.className
            )}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingSpinner;
