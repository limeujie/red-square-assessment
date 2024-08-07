"use client"
import { createClientComponentClient } from "@/lib/utils/createClientComponentClient";
import { Alert, Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const login = async (values: any) => {
    try {
        // TODO: IMPLEMENT SOCIAL LOGIN
        const { email, password } = values;
        if (email && password) {
            const supabase = createClientComponentClient();
            const authRes = await supabase.auth.signInWithPassword({ email, password });
            if (authRes.error) {
                return { success: false, error: "Login Failed" };
            }

            return { success: true, user: authRes.data.user }
        }
    } catch (e) {
        console.log(e)
        return { success: false }
    }
}

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const onFinish = async (values: any) => {
        setLoading(true)
        const data: any = await login(values);
        if (!data?.success) {
            setLoading(false)
            setErrorMessage(data?.error);
            router.replace('/dashboard')
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    }

    const generalRule = [{ required: true, message: "Please Fill in this field" }];
    return (
        <>
            {errorMessage && <Alert showIcon message={errorMessage} type="error" className="mb-4" />}
            <Form onFinish={onFinish} className="md:w-1/2 w-full">
                <Form.Item name={"email"} required rules={[...generalRule]}><Input type="email" placeholder={"Email"} /></Form.Item>
                <Form.Item name={"password"} required rules={[...generalRule]}><Input.Password placeholder={"Password"} /></Form.Item>
                <Button type="primary" loading={loading} htmlType="submit" block>Login</Button>
            </Form>
        </>
    )
}
export default LoginForm