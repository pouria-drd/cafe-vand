import Link from "next/link";
import { VandIcon } from "../../icons";

const Navbar = () => {
    return (
        <nav
            className="sticky top-0 bg-black/25
            flex items-center justify-between
            p-4">
            <Link
                href="/"
                className="text-white hover:text-vand-primary-7 transition-all flex items-center gap-1 group">
                <VandIcon className="text-white group-hover:text-vand-primary-7 size-8" />
                <h1 className="font-bold mt-1 text-white group-hover:text-vand-primary-7 transition-all">
                    Cafe Vand
                </h1>
            </Link>
        </nav>
    );
};

export default Navbar;
