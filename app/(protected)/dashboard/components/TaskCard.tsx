import { useAuthState } from "@/lib/hooks/useAuthState";
import { createClientComponentClient } from "@/lib/utils/createClientComponentClient";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, message, Select } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileType, TaskType } from "../types";

const EditModal = dynamic(() => import('./CreateTaskModal'))

interface TaskCardProps {
    item: TaskType;
    profiles: ProfileType[]
}

const TaskCard = ({ item, profiles }: TaskCardProps) => {
    const [assignedTo, setAssignedTo] = useState<ProfileType>();
    const [open, setOpen] = useState(false);
    const currentDate = new Date().toISOString();
    const { authState } = useAuthState();
    const router = useRouter();
    useEffect(() => {
        if (item.assignee) {
            setAssignedTo(profiles.find(x => x.value === item.assignee.id));
        }
    }, [item, profiles])

    const assignNewUser = async (id: any) => {
        const supabase = createClientComponentClient();
        const { error } = await supabase.from('tasklists').update({ assignee: id, updated_at: currentDate, updated_by: authState.uid }).eq('id', item.id);
        if (error) {
            message.error("Something went wrong")
        }
        else {
            message.success("Successfully Assigned Task");
            router.refresh()
        }
    }
    const deleteTask = async () => {
        const supabase = createClientComponentClient();
        const { error } = await supabase.from('tasklists').update({
            deleted_at: currentDate,
            updated_at: currentDate,
            updated_by: authState.uid,
            deleted_by: authState.uid
        }).eq('id', item.id);

        if (error) {
            message.error("Something went wrong")
        }
        else {
            message.success("Successfully Deleted Task")
            router.refresh()
        }
    }

    const completed = async () => {
        const supabase = createClientComponentClient();
        const { error } = await supabase.from('tasklists').update({
            task_status: "COMPLETED",
            deleted_at: currentDate,
            updated_at: currentDate,
            updated_by: authState.uid,
            deleted_by: authState.uid
        }).eq('id', item.id);

        if (error) {
            message.error("Something went wrong")
        }
        else {
            message.success("Successfully Completed Task")
            router.refresh()
        }
    }

    return (
        <Card className="!flex !flex-col font-semibold">
            <div >{item.task_title}</div>
            <div className="flex gap-4">Est. Hours
                <div className="font-normal">{item.expected_hours} Hrs</div>
            </div>
            <div className="flex flex-col">Assigned To
                <Select options={profiles} onSelect={(value) => assignNewUser(value)} value={assignedTo} className="w-full !text-xs" />
            </div>
            <br />
            <div className="flex justify-between gap-4">
                <Button className="!w-full" onClick={() => setOpen(true)}>
                    <EditOutlined />
                </Button>
                <Button className="!w-full" onClick={deleteTask}>
                    <DeleteOutlined className="!text-red-500" />
                </Button>
                <Button className="!w-full" onClick={completed}>
                    <CheckOutlined className="!text-green-500" />
                </Button>
            </div>
            <EditModal open={open} setOpen={setOpen} status={item.task_status} item={item} />
        </Card>
    )
}
export default TaskCard