import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://cafevand.ir"),
    title: {
        default: "Cafe Vand",
        template: "Cafe Vand | %s",
    },
    description:
        "از بهم ریختگی رویاها تا درآمیختن ایده‌ها Chaos in dreams, Unity in ideas",
    keywords: [
        "Cafe Vand",
        "کافه وند",
        "Cafe Vand Varamin",
        "کافه وند ورامین",
        "Best coffee in Varamin",
        "بهترین قهوه در ورامین",
        "Varamin coffee culture",
        "فرهنگ قهوه ورامین",
        "Iranian café Varamin",
        "کافه ایرانی ورامین",
        "Cafe Vand Persian coffee",
        "قهوه ایرانی کافه وند",
        "Cafe Vand ambiance",
        "فضای کافه وند",
        "Varamin coffee shop",
        "کافه ورامین",
        "Cafe Vand local events",
        "رویدادهای محلی کافه وند",
        "Varamin café experiences",
        "تجربیات کافه ورامین",
        "Creative café Varamin",
        "کافه خلاق ورامین",
        "Modern café Varamin",
        "کافه مدرن ورامین",
        "Pouria Darandi Varamin",
        "پوریادارندی ورامین",
        "Persian creativity",
        "خلاقیت ایرانی",
        "Cafe Vand Persian",
        "فرهنگ کافه ایرانی",
        "Chaotic dream exploration",
        "از بهم ریختگی رویاها تا درآمیختن ایده‌ها",
        "Idea unity",
        "اتحاد ایده‌ها",
        "Dreams and ideas fusion",
        "ترکیب رویاها و ایده‌ها",
        "Iranian innovation",
        "نوآوری ایرانی",
        "Cultural café experiences",
        "تجربیات فرهنگی کافه",
        "Modern Persian ideas",
        "ایده‌های مدرن ایرانی",
        "Creative chaos and unity",
        "آشوب خلاق و اتحاد",
        "Cafe Vand official site",
        "سایت رسمی کافه وند",
        "Pouria Darandi",
        "پوریا دارندی",
        "Persian artistic expression",
        "بیان هنری ایرانی",
        "Cafe Vand community",
        "جامعه کافه وند",
        "Shirkavand",
        "شیرکوند",
    ],

    creator: "Pouria Darandi",
    publisher: "Pouria Darandi",
    authors: [
        {
            name: "Pouria Darandi",
            url: "https://pouria-drd.ir",
        },
    ],
    openGraph: {
        type: "website",
        url: "https://cafevand.ir",
        title: "Cafe Vand",
        description:
            "از بهم ریختگی رویاها تا درآمیختن ایده‌ها Chaos in dreams, Unity in ideas",
        siteName: "Cafe Vand",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa-ir">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
