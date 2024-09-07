"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = ({ className, ...restProps }: InputProps) => {
    return (
        <input
            className={cn(
                "transition-all duration-150 border-none outline outline-1 outline-gray-400 focus:outline-none focus:ring-2 focus:ring-vand-primary-main placeholder:text-sm rounded-lg px-3 py-2",
                className
            )}
            {...restProps}
        />
    );
};

export default Input;
