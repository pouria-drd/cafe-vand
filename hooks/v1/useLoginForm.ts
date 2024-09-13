import { z } from "zod";
import { loginUser } from "@/actions/v1";
import { useMemo, useState } from "react";
import { LoginUserFormData } from "@/types/auth";

const loginSchema = z.object({
    username: z.string().min(3, { message: "نام کاربری الزامی است" }),
    password: z.string().min(1, { message: "رمز عبور الزامی است" }),
});

export const useLoginForm = () => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<LoginUserFormData>({
        username: "",
        password: "",
    });

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // New state to track if the form has been touched or submitted
    const [touched, setTouched] = useState<boolean>(false);

    // Validate form
    const validateForm = () => {
        const validation = loginSchema.safeParse({
            username,
            password,
        });

        if (!validation.success) {
            // Clear the current errors
            const newFormErrors = { username: "", password: "" };

            // Map over Zod errors and assign them to formErrors
            validation.error.errors.forEach((error) => {
                if (error.path[0] === "username") {
                    newFormErrors.username = error.message;
                }
                if (error.path[0] === "password") {
                    newFormErrors.password = error.message;
                }
            });

            setFormErrors(newFormErrors); // Set errors into state
            return false;
        }

        // Clear errors if validation passes
        setFormErrors({ username: "", password: "" });
        return true;
    };

    // Form validity
    const isFormValid = useMemo(() => {
        // Validate form only after form has been touched
        if (touched) {
            return validateForm();
        }
        return true; // If untouched, consider form valid initially
    }, [username, password, touched]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTouched(true); // Set touched state when user submits the form

        // Validate form before submission
        const isFormValid = validateForm();
        if (!isFormValid) return;

        setPending(true);

        const loginData: LoginUserFormData = {
            username,
            password,
        };

        const result = await loginUser(loginData);

        setPending(false);

        if (result.error) {
            setError(result.error);
        } else {
            setError(null);
        }
    };

    return {
        error,
        pending,
        username,
        password,
        formErrors,
        isFormValid,
        setUsername,
        setPassword,
        handleSubmit,
    };
};
