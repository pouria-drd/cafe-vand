"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { useState } from "react";
import { Products } from "../product";
import { Categories } from "../category";
import { InstagramIcon, PhoneIcon, WebIcon } from "@/components/icons";

interface MenuProps {
    result: APIResponse<CategoryDetail[], string>;
}

const Menu = (props: MenuProps) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryDetail>();

    const onSelect = (category: CategoryDetail) => {
        setSelectedCategory(category);
    };

    return (
        <main
            className="transition-all bg-loginBGMobile md:bg-loginBG
            bg-cover bg-center flex flex-col min-h-screen max-h-screen overflow-hidden">
            <Navbar />
            <Products products={selectedCategory?.products} />
            <Categories
                categories={props.result.data}
                onSelect={onSelect}
                selectedCategory={selectedCategory}
            />
            <div className="bg-black/60 glass flex flex-col gap-2 w-full py-2">
                <p className="text-white w-full text-center">
                    از بهم ریختگی رویاها تا درآمیختن ایده‌ها
                </p>
                <div className="flex items-center justify-between gap-4 px-4 w-fulls">
                    <Link
                        className="text-vand-primary-main flex items-center gap-2 w-fit"
                        href="/"
                        target="_blank">
                        <span className="bg-vand-primary-main text-white rounded-md p-1">
                            <WebIcon className="size-4" />
                        </span>

                        <span>cafevand.ir</span>
                    </Link>
                    <Link
                        className="text-vand-primary-main flex items-center gap-2 w-fit"
                        href={
                            "https://www.instagram.com/cafevand.ir?igsh=NmdkbTJ6cXd1dWlw"
                        }
                        target="_blank">
                        <span className="bg-vand-primary-main text-white rounded-md p-1">
                            <InstagramIcon className="size-4" />
                        </span>

                        <span>cafevand.ir</span>
                    </Link>
                    <Link
                        className="text-vand-primary-main flex items-center gap-2 w-fit"
                        href="tel:02136260926">
                        <span className="bg-vand-primary-main text-white rounded-md p-1">
                            <PhoneIcon className="size-4" />
                        </span>
                        <span>021-36260926</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Menu;
