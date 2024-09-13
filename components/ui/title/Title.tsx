import { cn } from "@/lib/utils";

interface TitleProps {
    className?: string;
    children?: React.ReactNode;
}

const Title = (props: TitleProps) => {
    return (
        <h1
            className={cn(
                "font-bold text-xl sm:text-2xl text-center w-full r2l",
                props.className
            )}>
            {props.children}
        </h1>
    );
};

export default Title;
