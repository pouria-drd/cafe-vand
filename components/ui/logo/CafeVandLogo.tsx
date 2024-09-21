import Link from "next/link";
import { cn } from "@/utils/base";
import { VandIcon } from "@/components/icons";

interface CafeVandLogoProps {
    href?: string;
    className?: string;
}

const CafeVandLogo = (props: CafeVandLogoProps) => {
    return (
        <Link
            href={props.href || "/"}
            className="flex items-center gap-2 w-fit">
            <span>
                <VandIcon className="size-10 sm:size-11 transition-all" />
            </span>

            <h1
                className={cn(
                    "transition-all text-zinc-700 hover:text-zinc-800 text-2xl sm:text-[28px] font-bold font-sans",
                    props.className
                )}>
                Cafe Vand
            </h1>
        </Link>
    );
};

export default CafeVandLogo;
