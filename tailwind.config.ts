import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                bg1: "url('/images/bg1.jpg')",
            },
            fontFamily: {
                yekanX: "IRANYekanX",
            },
            colors: {
                vand: {
                    primary: {
                        main: "#268c43",
                        1: "#0B140C",
                        2: "#111B13",
                        3: "#152C19",
                        4: "#0E3D1B",
                        5: "#114B22",
                        6: "#145B29",
                    },
                    secondary: "#edeeee",
                },
            },
        },
    },
    plugins: [],
};
export default config;
