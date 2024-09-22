import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/v1/authentication";

export default function useLoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const [inputError, setInputError] = useState<LoginInputErrors>({});

    const [otpId, setOtpId] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setPending(true);
        setInputError({});
        const result = await loginAction({
            data: {
                username: username,
                password: password,
            },
        });

        if (result.data?.success) {
            router.push("/dashboard");
        }

        if (result.data?.otpId) {
            setOtpId(result.data.otpId);
        }

        if (result.inputError) {
            setInputError(result.inputError);
        }

        if (result.error) {
            setError(result.error);
        }

        setPending(false);
    };
    return {
        otpId,
        error,
        pending,
        username,
        password,
        inputError,
        handleLogin,
        setPassword,
        setUsername,
    };
}
