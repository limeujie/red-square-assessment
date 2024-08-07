'use client'
import { useAuthState } from "@/lib/hooks/useAuthState";
import { createClientComponentClient } from "@/lib/utils/createClientComponentClient";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { statusOptions } from "../configs";
import { TaskType } from "../types";

interface CreateTaskProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item?: TaskType;
    status: "ALL" | "NEW" | "PENDING" | "COMPLETED";
}


const CreateTaskModal = ({ open, setOpen, item, status }: CreateTaskProps) => {
    const { authState } = useAuthState();
    const onClosed = () => setOpen(false);
    const [form] = useForm();
    const router = useRouter();

    useEffect(() => {
        if (open && !item) {
            form.setFieldValue('task_status', status);
        }
        else if (open && item) {
            console.log(item)
            form.setFieldsValue({ ...item })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const onFinish = async (values: any) => {
        const supabase = createClientComponentClient();
        if (!item) {
            const { error } = await supabase.from('tasklists').upsert({
                ...values,
                task_status: values.task_status ?? "NEW",
                created_by: authState.uid
            })
            if (error) {
                message.error("Something Went Wrong")
            }
            else {
                message.success(`Successfully Created Task ${values.task_title}`)
                onClosed();
                router.refresh()
            }
        }
        else {
            console.log(values.status)
            const { error } = await supabase.from('tasklists').update({
                ...values,
                task_status: values.task_status ?? "NEW",
                updated_by: authState.uid,
                updated_at: new Date().toISOString()
            }).eq('id', item.id)
            if (error) {
                message.error("Something Went Wrong")
            }
            else {
                message.success(`Successfully Edited Task ${values.task_title}`)
                onClosed();
                router.refresh()
            }
        }



    }

    return (
        <Modal
            title={!item ? "Create New Task" : "Edit Task"}
            footer={false}
            destroyOnClose
            open={open}
            onCancel={onClosed}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <FormItem label="Task Title" name={"task_title"} className="!w-full">
                    <Input />
                </FormItem>
                <FormItem label="Description" name={"task_description"} className="!w-full">
                    <TextArea />
                </FormItem>
                <FormItem label="Expected Hours" name={"expected_hours"} className="!w-full">
                    <InputNumber controls={false} className="!w-full" />
                </FormItem>
                <FormItem label="Status" name={'task_status'} >
                    <Select options={statusOptions.filter(x => x.value !== 'ALL')} />
                </FormItem>
                <div className="flex gap-4">
                    <Button block htmlType="submit" type="primary">Submit</Button>
                    <Button block danger onClick={onClosed}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    )
}
export default CreateTaskModal