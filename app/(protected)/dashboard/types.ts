
export type DashboardFilterType = {
    startDate?: string;
    endDate?: string;
    status: "ALL" | "NEW" | "PENDING" | "COMPLETED";
    assignedTo?: string;
    createdBy?: string;
    isDeleted?: boolean;
    pageStart?: number,
    pageSize?: number,
    sortedBy: string
}

export type ProfileType = {
    value: string,
    label: string
}

export type TaskType = {
    id: string;
    task_title: string;
    task_status: 'NEW' | 'PENDING' | 'COMPLETED'; // You can define possible status values
    task_description: string;
    assignee: { name: string, id: string };
    expected_hours: number;
    created_at: string; // Alternatively, you could use Date type
    created_by: string;
    updated_at: string | null; // Alternatively, you could use Date type
    updated_by: string | null;
    deleted_by: string | null;
    deleted_at: string | null; // Alternatively, you could use Date type
}
