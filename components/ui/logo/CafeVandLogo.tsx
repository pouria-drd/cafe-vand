import Link from "next/link";
import { cn } from "@/lib/utils";
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
                <VandIcon className="size-10 sm:size-12 transition-all" />
            </span>

            <h1
                className={cn(
                    "text-vand-secondary-main text-2xl sm:text-3xl font-bold font-sans transition-all",
                    props.className
                )}>
                Cafe Vand
            </h1>
        </Link>
    );
};

export default CafeVandLogo;
