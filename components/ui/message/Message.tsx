import { cn } from "@/lib/utils";

interface MessageProps {
    className?: string;
    children?: React.ReactNode;
    status?: "success" | "error" | "warning" | "info";
}

const Message = (props: MessageProps) => {
    const status = props.status || "error";

    const statusStyles = {
        success: "text-green-600",
        error: "text-red-500",
        warning: "text-yellow-500",
        info: "text-blue-600",
    };

    return (
        <p
            className={cn(
                `text-wrap text-xs text-right r2l w-full ${statusStyles[status]}`,
                props.className
            )}>
            {props.children}
        </p>
    );
};

export default Message;
