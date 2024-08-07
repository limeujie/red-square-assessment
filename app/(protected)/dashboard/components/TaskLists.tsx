'use client'
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ProfileType, TaskType } from "../types";
import TaskCard from "./TaskCard";

const CreateModal = dynamic(() => import('./CreateTaskModal'))

interface TaskListProps {
    status: "NEW" | "PENDING" | "COMPLETED"
    items: TaskType[];
    profiles: ProfileType[];
}
const TaskLists = ({ status, items, profiles }: TaskListProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border p-4 rounded-md flex flex-col w-full gap-4  min-h-[30vh]">
            <div className="font-semibold">{status}</div>
            <div className="flex flex-col gap-4 overflow-scroll">
                {items.map(item => <div key={item.id}><TaskCard item={item} profiles={profiles} /></div>)}
                <Button onClick={() => setOpen(true)}> + </Button>
            </div>
            <CreateModal open={open} setOpen={setOpen} status={status} />
        </div>)
}
export default TaskLists;