import Link from "next/link";
import { cn } from "@/utils/base";
import styles from "./quickAccess.module.css";

interface QuickAccessProps {
    href?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    variant?: "red" | "sky" | "teal" | "blue" | "green" | "purple" | "yellow";
}

const QuickAccess = (props: QuickAccessProps) => {
    // Map the variant names to the corresponding classes
    const variantClasses: Record<
        "red" | "sky" | "teal" | "blue" | "green" | "purple" | "yellow",
        string
    > = {
        red: "bg-red-500",
        sky: "bg-sky-600",
        teal: "bg-teal-600",
        blue: "bg-blue-600",
        green: "bg-green-700",
        purple: "bg-indigo-500",
        yellow: "bg-yellow-500",
    };

    // Provide a default class if `props.variant` is undefined
    const selectedClass = props.variant
        ? variantClasses[props.variant]
        : variantClasses.purple; // Default class

    if (props.href) {
        return (
            <Link
                href={props.href}
                className={cn(
                    `${selectedClass} ${styles.vandQuickAccess} r2l`,
                    props.className
                )}>
                {props.children}
            </Link>
        );
    }

    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={cn(
                `${selectedClass} ${styles.vandQuickAccess} r2l`,
                props.className
            )}>
            {props.children}
        </button>
    );
};

export default QuickAccess;
