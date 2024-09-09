"use client";
import styles from "./form.module.css";

interface FormProps {
    children?: React.ReactNode;
    onSubmit: React.FormHTMLAttributes<HTMLFormElement>["onSubmit"];
}

const Form = (props: FormProps) => {
    return (
        <form onSubmit={props.onSubmit} className={`${styles.vandForm}`}>
            {props.children}
        </form>
    );
};

export default Form;
