import { Collapse, CollapseProps } from "antd";
import DashboardFilters from "./components/Filters";
import TaskLists from "./components/TaskLists";
import { DashboardFilterProps, initialFilters, statuses } from "./configs";
import { getAllData } from "./getData";


const DashbaordPage = ({ searchParams }: { searchParams: DashboardFilterProps }) => {
    const filters: DashboardFilterProps = {
        ...initialFilters,
        ...searchParams,
        isDeleted: searchParams?.isDeleted?.toString() === 'true',
        status: searchParams.status && statuses.includes(searchParams.status) ? searchParams.status : "ALL"
    }
    const items = getAllData(filters);

    const collapseItems: CollapseProps['items'] = [
        {
            key: 'filters',
            showArrow: false,
            label: "Filters",
            children: <DashboardFilters filters={filters} />
        }
    ]
    return (
        <div className="flex flex-col w-full bg-white min-h-screen text-black p-12 gap-8">
            <div className="flex ">
                <Collapse defaultActiveKey={['filters']} items={collapseItems} expandIcon={undefined} className="!w-full" />
            </div>
            <div className="flex h-full w-full justify-evenly md:flex-row flex-col gap-4">
                <TaskLists status={"NEW"} />
                <TaskLists status={"PENDING"} />
                <TaskLists status={"COMPLETED"} />
            </div>
        </div>)
}
export default DashbaordPage