"use client"
import { createClientComponentClient } from "@/lib/utils/createClientComponentClient";
import { Alert, Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signUp = async (values: any) => {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signUp({
        email: values.email, password: values.password,
    });
    if (error) {
        let errorMessage = "Something webt ";
        if (error.message === 'User already registered') {
            errorMessage = "Email Already Registered";
        }
        return { success: false, error: errorMessage };
    }
    return { success: true, error: "Successfully Signup" }
}

const SignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const router = useRouter();

    const onFinish = async (e: any) => {
        setLoading(true)
        setErrorMessage('');
        const data = await signUp(e);
        if (!data.success) {
            setErrorMessage(data?.error ?? '');
        }
        setIsComplete(true);
        message.success("Sign Up Success");
        router.replace("/");
        setLoading(false)
    }

    const generalRule = [{ required: true, message: "This Field is Required" }];
    return (
        <>
            {errorMessage && <Alert showIcon message={errorMessage} type="error" className="mb-4" />}
            <Form onFinish={onFinish} className="md:w-1/2 w-full ">
                <Form.Item name={"firstName"} required rules={generalRule}><Input maxLength={255} placeholder={"First Name"} /></Form.Item>
                <Form.Item name={"email"} required rules={[...generalRule, { type: 'email' }]}><Input type="email" maxLength={255} placeholder={"Email"} /></Form.Item>
                <Form.Item name={"password"} required rules={[...generalRule, { min: 8, message: "Min 8 Characters Required" }]}><Input.Password placeholder={"Password"} /></Form.Item>
                <Button disabled={isComplete} type="primary" htmlType="submit" loading={loading} block>Sign Up</Button>
            </Form>
        </>
    )
}
export default SignUpForm