import { endOfDay, startOfDay, sub } from "date-fns";


export type DashboardFilterProps = {
    startDate?: Date;
    endDate?: Date;
    status?: "ALL" | "NEW" | "PENDING" | "COMPLETED";
    assignedTo?: string;
    createdBy?: string;
    isDeleted?: boolean;
    pageStart?: number,
    pageSize?: number,
}

export const initialFilters: DashboardFilterProps = {
    startDate: startOfDay(sub(new Date(), { months: 3 })),
    endDate: endOfDay(new Date()),
    status: "ALL",
    pageStart: 1,
    pageSize: 10
}

export const statusOptions = [
    { label: "ALL", value: "ALL" },
    { label: "NEW", value: "NEW" },
    { label: "PENDING", value: "PENDING" },
    { label: "COMPLETED", value: "COMPLETED" },
]
export const statuses = [
    'ALL',
    'NEW',
    'PENDING',
    "COMPLETED"
]