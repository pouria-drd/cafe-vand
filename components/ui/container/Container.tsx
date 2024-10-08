import { cn } from "@/utils/base";

interface InputContainerProps {
    className?: string;
    children?: React.ReactNode;
}
const Container = (props: InputContainerProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-1 truncate w-full max-w-full",
                props.className
            )}>
            {props.children}
        </div>
    );
};

export default Container;
