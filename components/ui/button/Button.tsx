"use client";

import Link from "next/link";
import { cn } from "@/utils/base";
import { LoadingSpinner } from "..";
import {
    ReactNode,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useState,
} from "react";

// Define button props when 'as' is 'button'
interface AsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: "button";
}

// Define link props when 'as' is 'link' (and 'href' is required)
interface AsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    as: "link";
    href: string;
}

// Define shared props
interface BaseButtonProps {
    waiting?: boolean;
    className?: string;
    children?: ReactNode;
    variant?: "filled" | "outlined";
}

// Union of the two types for Button
type ButtonProps = BaseButtonProps & (AsButtonProps | AsLinkProps);

const Button = (props: ButtonProps) => {
    const {
        children,
        className,
        as = "button", // Default is 'button'
        waiting = false, // Default is false
        variant = "filled",
        ...restProps
    } = props;

    // Define base class based on variant
    const baseClass =
        variant === "outlined"
            ? "outline outline-2 outline-vand-primary-main text-vand-primary-main hover:outline-none hover:text-vand-secondary-main hover:bg-vand-primary-main"
            : "text-white bg-vand-primary-main hover:bg-vand-primary-10";

    const commonClasses = cn(
        baseClass,
        "flex item-center justify-center text-center text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-opacity-60 transition-all rounded-md px-3 py-1.5 w-full",
        className
    );

    // Render button if 'as' is 'button'
    if (as === "button")
        return (
            <button
                disabled={waiting}
                className={commonClasses}
                {...(restProps as AsButtonProps)}>
                {waiting ? (
                    <LoadingSpinner borderSize="2" className="text-white w-6" />
                ) : (
                    children
                )}
            </button>
        );

    // Render anchor if 'as' is 'link'
    if (as === "link") {
        const { href, ...linkProps } = restProps as AsLinkProps;
        return (
            <Link href={href} {...linkProps} className={commonClasses}>
                {waiting ? (
                    <LoadingSpinner borderSize="2" className="text-white w-6" />
                ) : (
                    children
                )}
            </Link>
        );
    }
};

export default Button;
