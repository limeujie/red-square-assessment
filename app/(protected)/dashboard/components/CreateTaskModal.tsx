'use client'
import { useAuthState } from "@/lib/hooks/useAuthState";
import { Modal } from "antd"
import { Dispatch, SetStateAction } from "react";

interface CreateTaskProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    type: "EDIT" | "CREATE",

}


const CreateTaskModal = ({ open, setOpen, type }: CreateTaskProps) => {
    const { authState } = useAuthState();
    const onClosed = () => setOpen(false);

    return (
        <Modal
            title={type === 'CREATE' ? "Create New Task" : "Edit Task"}
            footer={false}
            open={open}
            onCancel={onClosed}
        >

        </Modal>
    )
}
export default CreateTaskModal