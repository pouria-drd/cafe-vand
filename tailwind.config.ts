import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                yekanX: "IRANYekanX",
            },
            colors: {
                vand: {
                    primary: "#268c43",
                    secondary: "#edeeee",
                },
            },
        },
    },
    plugins: [],
};
export default config;
