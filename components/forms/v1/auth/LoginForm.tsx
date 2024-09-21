"use client";

import { useEffect } from "react";
import { useLoginForm } from "@/hooks/v1";
import { VandIcon } from "@/components/icons";
import {
    Button,
    Container,
    Form,
    Input,
    Message,
    Title,
} from "@/components/ui";

interface LoginFormProps {
    onContinue?: (otpId: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
    const {
        otpId,
        error,
        pending,
        username,
        password,
        inputError,
        setPassword,
        setUsername,
        handleLogin,
    } = useLoginForm();

    useEffect(() => {
        if (otpId && props.onContinue) {
            props.onContinue(otpId);
        }
    }, [otpId]);

    return (
        <Form onSubmit={handleLogin}>
            <VandIcon />
            <Container className="gap-1">
                <Title>ورود به کافه وند</Title>
                <Message>برای ادامه باید وارد حساب خود شوید</Message>
            </Container>

            {error && <Message status="error">{error}</Message>}

            <Container className="gap-3">
                <Input
                    required
                    autoFocus
                    type="text"
                    value={username}
                    autoComplete="off"
                    label="نام کاربری"
                    error={inputError.username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    required
                    type="password"
                    value={password}
                    label="رمز عبور"
                    autoComplete="off"
                    error={inputError.password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Container>

            <Button
                as="button"
                type="submit"
                waiting={pending}
                className="mt-2">
                ادامه
            </Button>
        </Form>
    );
};

export default LoginForm;
