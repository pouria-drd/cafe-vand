"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "filled" | "outlined";
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { variant = "filled", className, ...restProps } = props;

    const baseClass =
        variant === "outlined"
            ? "outline outline-2 outline-vand-primary-main text-vand-primary-main hover:outline-none hover:text-vand-secondary-main hover:bg-vand-primary-main"
            : "text-white bg-vand-primary-main hover:brightness-95";

    return (
        <button
            className={cn(
                baseClass,
                "disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all rounded-lg px-3 py-2",
                className
            )}
            {...restProps}
        />
    );
};

export default Button;
