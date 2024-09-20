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
                menuBG: "url('/images/menuBG.jpg')",
                loginBG: "url('/images/loginBg.jpg')",
                loginBGMobile: "url('/images/loginBgMobile.png')",
            },
            fontFamily: {
                vazir: "Vazir",
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
                        7: "#166C30",
                        8: "#127F37",
                        9: "#268C43",
                        10: "#0F7E36",
                        11: "#70D083",
                        12: "#ABF7B7",
                    },
                    secondary: {
                        main: "#EDEEEE",
                        1: "#101111",
                        2: "#181919",
                        3: "#212323",
                        4: "#292A2A",
                        5: "#303131",
                        6: "#393A3A",
                        7: "#474848",
                        8: "#5F6060",
                        9: "#6C6E6E",
                        10: "#7A7B7B",
                        11: "#B3B4B4",
                        12: "#EDEEEE",
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
