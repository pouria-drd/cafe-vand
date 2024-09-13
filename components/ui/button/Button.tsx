"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    FC,
    ReactNode,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
} from "react";

// Define button props when 'as' is 'button'
interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: "button";
}

// Define link props when 'as' is 'link' (and 'href' is required)
interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    as: "link";
    href: string;
}

// Define shared props
interface BaseButtonProps {
    className?: string;
    children?: ReactNode;
    variant?: "filled" | "outlined";
}

// Union of the two types for Button
type ButtonProps = BaseButtonProps & (ButtonAsButtonProps | ButtonAsLinkProps);

const Button: FC<ButtonProps> = (props) => {
    const {
        variant = "filled",
        className,
        as = "button", // Default is 'button'
        children,
        ...restProps
    } = props;

    // Define base class based on variant
    const baseClass =
        variant === "outlined"
            ? "outline outline-2 outline-vand-primary-main text-vand-primary-main hover:outline-none hover:text-vand-secondary-main hover:bg-vand-primary-main"
            : "text-white bg-vand-primary-main hover:brightness-95";

    const commonClasses = cn(
        baseClass,
        "text-center text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-opacity-50 transition-all rounded-md px-3 py-2",
        className
    );

    // Render anchor if 'as' is 'link'
    if (as === "link") {
        const { href, ...linkProps } = restProps as ButtonAsLinkProps;
        return (
            <Link href={href} {...linkProps} className={commonClasses}>
                {children}
            </Link>
        );
    }

    // Render button if 'as' is 'button'
    return (
        <button
            className={commonClasses}
            {...(restProps as ButtonAsButtonProps)}>
            {children}
        </button>
    );
};

export default Button;
