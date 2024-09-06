interface BadgeProps {
    status: "active" | "inactive" | "pending" | "suspended";
}

const Badge = (props: BadgeProps) => {
    const statusStyles = {
        active: "bg-green-200 text-green-700",
        inactive: "bg-gray-200 text-gray-700",
        pending: "bg-yellow-200 text-yellow-700",
        suspended: "bg-red-200 text-red-700",
    };

    return (
        <span
            className={`inline-flex items-center 
            text-xs px-2 py-1 
            rounded-full font-medium ${statusStyles[props.status]}`}>
            {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
        </span>
    );
};

export default Badge;
