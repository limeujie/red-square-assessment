import { Collapse, CollapseProps } from "antd";
import DashboardFilters from "./components/Filters";
import SortingButtons from "./components/SortingButtons";
import TaskLists from "./components/TaskLists";
import { allOption, initialFilters, sortedButton, statuses } from "./configs";
import { getAllData, getProfiles } from "./getData";
import { DashboardFilterType, TaskType } from "./types";


const DashbaordPage = async ({ searchParams }: { searchParams: DashboardFilterType }) => {
    const profiles = await getProfiles();
    const createdBy = profiles.find(x => x.value === searchParams.createdBy) ?? allOption;
    const assignedTo = profiles.find(x => x.value === searchParams.assignedTo) ?? allOption;
    const filters: DashboardFilterType = {
        ...initialFilters,
        ...searchParams,
        assignedTo: assignedTo.value,
        createdBy: createdBy.value,
        isDeleted: searchParams?.isDeleted?.toString() === 'true',
        status: searchParams.status && statuses.includes(searchParams.status) ? searchParams.status : "ALL",
        sortedBy: !sortedButton.includes(searchParams.sortedBy) ? 'UPDATED_AT_LATEST' : searchParams.sortedBy
    }
    const data = await getAllData(filters);
    const collapseItems: CollapseProps['items'] = [
        {
            key: 'filters',
            showArrow: false,
            label: "Filters",
            children: <DashboardFilters filters={filters} profiles={[{ value: 'ALL', label: "ALL" }].concat(profiles)} />
        }
    ]
    return (
        <div className="flex flex-col w-full bg-white text-black p-12 gap-8">
            <div className="flex ">
                <Collapse items={collapseItems} expandIcon={undefined} className="!w-full" />
            </div>
            <SortingButtons queryParams={filters} />
            <div className="flex h-full w-full justify-evenly md:flex-row flex-col gap-4">
                <TaskLists status={"NEW"} items={data['NEW'] as TaskType[] ?? []} profiles={profiles} />
                <TaskLists status={"PENDING"} items={data['PENDING'] as TaskType[] ?? []} profiles={profiles} />
                <TaskLists status={"COMPLETED"} items={data['COMPLETED'] as TaskType[] ?? []} profiles={profiles} />
            </div>
        </div>)
}
export default DashbaordPage