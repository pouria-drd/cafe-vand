"use client";

import { Fragment, useState } from "react";
import { LoginForm, VerifyLoginForm } from "@/components/forms/v1/auth";

function AuthPage() {
    const [otpId, setOtpId] = useState<string>("");

    const handleContinue = (otpId: string) => {
        setOtpId(otpId);
    };

    const handleTryAgain = () => {
        setOtpId("");
    };

    return (
        <Fragment>
            {otpId ? (
                <VerifyLoginForm otpId={otpId} onTryAgain={handleTryAgain} />
            ) : (
                <LoginForm onContinue={handleContinue} />
            )}
        </Fragment>
    );
}

export default AuthPage;
