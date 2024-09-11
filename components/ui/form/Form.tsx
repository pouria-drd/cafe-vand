"use client";
import { cn } from "@/lib/utils";
import styles from "./form.module.css";

interface FormProps {
    className?: string;
    children?: React.ReactNode;
    onSubmit: React.FormHTMLAttributes<HTMLFormElement>["onSubmit"];
}

const Form = (props: FormProps) => {
    return (
        <form
            onSubmit={props.onSubmit}
            className={cn(styles.vandForm, props.className)}>
            {props.children}
        </form>
    );
};

export default Form;
