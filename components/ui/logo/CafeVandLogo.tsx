import Link from "next/link";
import { VandIcon } from "@/components/icons";

const CafeVandLogo = () => {
    return (
        <Link href={"/"} className="flex items-center gap-2">
            <span>
                <VandIcon className="size-12" />
            </span>

            <h1 className="text-vand-secondary-main text-3xl font-bold font-sans">
                Cafe Vand
            </h1>
        </Link>
    );
};

export default CafeVandLogo;
