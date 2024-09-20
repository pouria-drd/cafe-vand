"use client";

import { cn } from "@/utils/base";
import { CloseIcon } from "@/components/icons";

interface CloseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}
const CloseButton = (props: CloseButtonProps) => {
    return (
        <button
            className={cn(
                "transition-all text-vand-secondary-8 hover:text-vand-secondary-6",
                props.className
            )}
            {...props}>
            <CloseIcon />
        </button>
    );
};

export default CloseButton;
