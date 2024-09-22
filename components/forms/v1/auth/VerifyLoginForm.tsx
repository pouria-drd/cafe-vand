"use client";

import { VandIcon } from "../../../icons";
import { useVerifyLoginForm } from "@/hooks/v1/auth";
import {
    Button,
    Container,
    Form,
    Message,
    MultiInputCode,
    Title,
} from "@/components/ui";

interface VerifyLoginFormProps {
    otpId: string;
    onTryAgain: () => void;
}

const VerifyLoginForm = (props: VerifyLoginFormProps) => {
    const {
        error,
        pending,
        inputError,
        setOtpCode,
        handleTryAgain,
        handleVerifyLogin,
    } = useVerifyLoginForm(props);

    return (
        <Form onSubmit={handleVerifyLogin} className="bg-white/80">
            <VandIcon />
            <Container className="gap-1">
                <Title>ورود خود را تایید کنید</Title>
                <Message>
                    کد تایید به ایمیل شما ارسال شده است، در صورت عدم دریافت پوشه
                    اسپم را چک کتید
                </Message>
            </Container>

            {error && <Message status="error">{error}</Message>}

            <MultiInputCode onChange={(code) => setOtpCode(code)} />

            {inputError.otpCode && (
                <Message status="error">{inputError.otpCode}</Message>
            )}

            <button
                type="button"
                onClick={handleTryAgain}
                className="text-gray-500 text-xs">
                کد را دریافت نکرده اید؟ دوباره تلاش کنید
            </button>

            <Button as="button" type="submit" waiting={pending}>
                تایید
            </Button>
        </Form>
    );
};

export default VerifyLoginForm;
