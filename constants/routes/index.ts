const baseAdminPath = "/admin";

export const UserNavLinks: NavLink[] = [
    {
        name: "داشبورد",
        path: "/dashboard",
    },
];

export const AdminNavLinks: NavLink[] = [
    {
        name: "خانه",
        path: baseAdminPath,
    },
    {
        name: "دسته بندی‌ها",
        path: baseAdminPath + "/categories",
    },
    {
        name: "محصولات",
        path: baseAdminPath + "/products",
    },
];
