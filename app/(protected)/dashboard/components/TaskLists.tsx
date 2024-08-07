'use client'
import { Button } from "antd";
import { useState } from "react";
import dynamic from "next/dynamic";

const CreateModal = dynamic(() => import('./CreateTaskModal'))


interface TaskListProps {
    status: "NEW" | "PENDING" | "COMPLETED"
}
const TaskLists = ({ status }: TaskListProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border p-4 h-full rounded-md flex flex-col w-full">
            {status}
            <Button onClick={() => setOpen(true)}> + </Button>
            <CreateModal open={open} setOpen={setOpen} type="CREATE" />
        </div>)
}
export default TaskLists;