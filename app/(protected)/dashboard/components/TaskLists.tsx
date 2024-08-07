interface TaskListProps {
    status: "NEW" | "PENDING" | "COMPLETED"
}
const TaskLists = ({ status }: TaskListProps) => {
    return (
        <div className="border p-4 h-full rounded-md">
            {status}
        </div>)
}
export default TaskLists;