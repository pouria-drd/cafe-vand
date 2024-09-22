import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyLoginAction } from "@/actions/v1/authentication";

interface UseVerifyLoginFormProps {
    otpId: string;
    onTryAgain: () => void;
}

export default function useVerifyLoginForm(props: UseVerifyLoginFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [otpCode, setOtpCode] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const [otpId, setOtpId] = useState<string>(props.otpId);
    const [inputError, setInputError] = useState<VerifyLoginInputErrors>({});

    const handleVerifyLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setInputError({});
        setPending(true);

        const result = await verifyLoginAction({
            data: {
                otpId: otpId,
                otpCode: otpCode,
            },
        });

        if (result.data?.user) {
            if (result.data.user.isAdmin) {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        }

        if (result.inputError) {
            setInputError(result.inputError);
        }

        if (result.error) {
            setError(result.error);
        }

        setPending(false);
    };

    const handleTryAgain = () => {
        setOtpId("");
        setOtpCode("");
        props.onTryAgain();
    };

    return {
        error,
        pending,
        inputError,
        setOtpCode,
        handleTryAgain,
        handleVerifyLogin,
    };
}
