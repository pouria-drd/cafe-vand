"use client";

import Link from "next/link";
import { cn } from "@/utils/base";
import { LoadingSpinner } from "..";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/v1/authentication";
import {
    ReactNode,
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    useState,
} from "react";

// Define button props when 'as' is 'button'
interface AsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: "button" | "logout-button";
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
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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
            : "text-white bg-vand-primary-main hover:brightness-95";

    const commonClasses = cn(
        baseClass,
        "flex item-center justify-center text-center text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-opacity-60 transition-all rounded-md px-3 py-1.5 w-full",
        className
    );

    const router = useRouter();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        // Call the server action to clear cookies
        await logoutAction();
        setIsLoggingOut(false);
        // Redirect to login page
        router.push("/auth");
    };

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

    // Render logout button if 'as' is 'logout-button'
    if (as === "logout-button")
        return (
            <button
                disabled={isLoggingOut}
                className={commonClasses}
                onClick={handleLogout}
                {...(restProps as AsButtonProps)}>
                {isLoggingOut ? (
                    <LoadingSpinner borderSize="2" className="text-white w-6" />
                ) : (
                    "خروج"
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
