"use client";

import { cn } from "@/utils/base";
import { MenuIcon } from "@/components/icons";

interface MenuButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const MenuButton = (props: MenuButtonProps) => {
    return (
        <button
            className={cn(
                "transition-all sm:hidden border-2 hover:bg-vand-secondary-main/40 text-vand-primary-main rounded-xl p-1",
                props.className
            )}
            {...props}>
            <MenuIcon />
        </button>
    );
};

export default MenuButton;
