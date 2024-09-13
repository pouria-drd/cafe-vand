"use client";

import { useLoginForm } from "@/hooks/v1";
import { Button, Form, Input, Message, Title } from "../ui";

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
            className="rounded shadow-lg px-6 py-8 max-w-full sm:max-w-xs">
            {/* Title */}
            <Title>ورود به حساب</Title>
            {error && <Message className="text-center">{error}</Message>}

            {/* Username Input */}
            <div className="flex flex-col items-center justify-center gap-1 w-full">
                <Input
                    autoFocus
                    // required
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
            </div>

            {/* password Input */}
            <div className="flex flex-col items-center justify-center gap-1 w-full">
                <Input
                    // required
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
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={!isFormValid || pending}
                className="r2l">
                {pending ? "لطفا صبر کنید ..." : "ورود"}
            </Button>
        </Form>
    );
};

export default LoginForm;
