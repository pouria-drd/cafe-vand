import { cn } from "@/utils/base";

interface TitleProps {
    className?: string;
    children?: React.ReactNode;
}

const Title = (props: TitleProps) => {
    return (
        <h3
            className={cn(
                "transition-all font-bold text-zinc-700 text-xl sm:text-[22px] text-center w-full r2l",
                props.className
            )}>
            {props.children}
        </h3>
    );
};

export default Title;
