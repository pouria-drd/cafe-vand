"use client";

import React from "react";
import { cn } from "@/utils/base";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    className?: string;
}

// Use React.forwardRef to pass the ref to the input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ error, label, className, ...restProps }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label className={`${styles.vandInputLabel} r2l`}>
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        `${styles.vandInput} ${
                            error ? "outline-red-500" : "outline-gray-300"
                        } r2l`,
                        className
                    )}
                    ref={ref} // Attach the ref here
                    {...restProps}
                />
                {error && (
                    <span className={`${styles.vandInputError} r2l`}>
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input"; // Optional, but helps with debugging in React dev tools

export default Input;
