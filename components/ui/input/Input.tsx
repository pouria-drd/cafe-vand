"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = ({ className, ...restProps }: InputProps) => {
    return (
        <input
            className={cn(
                "border border-vand-secondary-8 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-vand-primary-main placeholder:text-sm rounded-xl px-3 py-2 min-h-11",
                className
            )}
            {...restProps}
        />
    );
};

export default Input;
