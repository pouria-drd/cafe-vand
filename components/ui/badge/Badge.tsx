interface BadgeProps {
    status: "active" | "inactive" | "pending" | "suspended";
    lang?: "en" | "fa"; // Adding support for English and Persian
}

const Badge = (props: BadgeProps) => {
    const statusStyles = {
        active: "bg-green-200 text-green-700",
        inactive: "bg-red-200 text-red-700",
        pending: "bg-blue-200 text-blue-700",
        suspended: "bg-gray-200 text-gray-700",
    };

    // Define translations for both English and Persian
    const statusTranslations = {
        en: {
            active: "Active",
            inactive: "Inactive",
            pending: "Pending",
            suspended: "Suspended",
        },
        fa: {
            active: "فعال",
            inactive: "غیرفعال",
            pending: "درحال بررسی",
            suspended: "معلق",
        },
    };

    // Determine the language, default to Persian if not provided
    const language = props.lang || "fa";

    return (
        <span
            className={`flex items-center justify-center
            text-center text-[10px] sm:text-xs px-2 py-1 min-w-12
            rounded-md font-medium ${statusStyles[props.status]}`}>
            {statusTranslations[language][props.status]}
        </span>
    );
};

export default Badge;
