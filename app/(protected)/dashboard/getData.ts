import { createServerComponentClient } from "@/lib/utils/createServerComponentClient";
import { groupBy } from "lodash";
import { DashboardFilterType } from "./types";

export const getAllData = async (queryParams: DashboardFilterType) => {
    const supabase = createServerComponentClient();
    let query = supabase.from('tasklists').select(`* , 
        created_by:profiles!tasklists_created_by_fkey(id,name),
        assignee:profiles!tasklists_assignee_fkey(id,name),
        updated_by:profiles!tasklists_updated_by_fkey(id,name),
        deleted_by:profiles!tasklists_deleted_by_fkey(id,name)
        `)
        .gte('created_at', queryParams.startDate!)
        .lte('created_at', queryParams.endDate!)
    if (queryParams?.status !== 'ALL') {
        query = query.eq('task_status', queryParams.status);
    }
    if (queryParams?.isDeleted) {
        query = query.not('deleted_at', 'is', null);
    }
    else {
        query = query.is("deleted_at", null);
    }

    if (queryParams?.createdBy && queryParams?.createdBy !== "ALL") {
        query = query.eq('created_by', queryParams?.createdBy)
    }
    if (queryParams?.assignedTo && queryParams?.assignedTo !== "ALL") {
        query = query.eq('assignee', queryParams?.assignedTo)
    }
    if (queryParams.sortedBy) {
        switch (queryParams.sortedBy) {
            case ('CREATED_AT_EARLIEST'): {
                query = query.order('created_at',);
                break;
            }
            case ('CREATED_AT_LATEST'): {
                query = query.order('updated_at', { ascending: false });
                break;
            }
            case ('UPDATED_AT_EARLIEST'): {
                query = query.order('updated_at',);
                break;
            }
            case ('UPDATED_AT_LATEST'): {
                query = query.order('updated_at', { ascending: false });
                break;
            }
        }
    }
    else {
        query = query.order('updated_at', { ascending: false });
    }
    const { data } = await query;
    const groupDataByStatus = groupBy(data, x => x.task_status);
    return groupDataByStatus
}

export const getProfiles = async () => {
    const supabase = createServerComponentClient();

    const { data } = await supabase.from('profiles').select('id, name')
    const profiles = data?.map((x) => { return { value: x.id, label: x.name } })
    return profiles ?? []
}