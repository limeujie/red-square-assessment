import { endOfDay, startOfDay, sub } from "date-fns";
import { DashboardFilterType } from "./types";


export const initialFilters: DashboardFilterType = {
    startDate: startOfDay(sub(new Date(), { months: 3 })).toISOString(),
    endDate: endOfDay(new Date()).toISOString(),
    status: "ALL",
    pageStart: 1,
    pageSize: 10,
    sortedBy: "UPDATED_AT"
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
export const allOption = { label: "ALL", value: 'ALL' };
export const sortedButton = ["CREATED_AT_LATEST", "CREATED_AT_EARLIEST", "UPDATED_AT_LATEST", "UPDATED_AT_EARLIEST"]
export const sortedOptions = [
    { value: 'CREATED_AT_LATEST', label: "By Latest Created Date" },
    { value: 'CREATED_AT_EARLIEST', label: "By Earliest Created Date" },
    { value: 'UPDATED_AT_LATEST', label: "By Latest Updated Date" },
    { value: 'UPDATED_AT_EARLIEST', label: "By Earliest Updated Date" },
];
