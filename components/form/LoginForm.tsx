"use client";

import { useLoginForm } from "@/hooks/v1";
import { Button, Container, Form, Input, Message, Title } from "../ui";

const LoginForm = () => {
    const {
        error,
        pending,
        username,
        password,
        formErrors,
        isFormValid,
        setUsername,
        setPassword,
        handleSubmit,
    } = useLoginForm();

    return (
        <Form
            onSubmit={handleSubmit}
            className="justify-center rounded-lg 
            shadow-lg px-8 py-12 max-w-full sm:max-w-xs">
            {/* Title */}
            <Title>ورود به حساب</Title>
            {error && <Message className="text-center">{error}</Message>}

            {/* Username Input */}
            <Container>
                <Input
                    autoFocus
                    required
                    type="text"
                    name="username"
                    value={username}
                    autoComplete="off"
                    className="w-full r2l"
                    placeholder="نام کاربری"
                    onChange={(e) => setUsername(e.target.value)}
                />

                {formErrors.username && (
                    <Message>{formErrors.username}</Message>
                )}
            </Container>

            {/* password Input */}
            <Container>
                <Input
                    required
                    type="password"
                    name="password"
                    value={password}
                    autoComplete="off"
                    className="w-full r2l"
                    placeholder="رمز عبور"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                    <Message>{formErrors.password}</Message>
                )}
            </Container>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={!isFormValid || pending}
                className="text-base r2l">
                {pending ? "لطفا صبر کنید ..." : "ورود"}
            </Button>
        </Form>
    );
};

export default LoginForm;
