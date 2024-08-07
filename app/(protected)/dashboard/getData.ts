import { createServerComponentClient } from "@/lib/utils/createServerComponentClient";
import { DashboardFilterProps } from "./configs";

export const getAllData = (queryParams?: DashboardFilterProps) => {
    const supabase = createServerComponentClient();
}