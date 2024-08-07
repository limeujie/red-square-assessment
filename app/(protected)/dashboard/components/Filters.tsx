'use client'
import MyDatePicker from "@/lib/antd/DateTime";
import { Button, Checkbox, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { initialFilters, statusOptions } from "../configs";
import { DashboardFilterType, ProfileType } from "../types";

interface FilterProps {
    filters: DashboardFilterType
    profiles: ProfileType[]
}
const { RangePicker } = MyDatePicker;


const DashboardFilters = ({ filters, profiles }: FilterProps) => {
    const [form] = useForm();
    const router = useRouter();

    useEffect(() => {
        form.setFieldsValue({ ...filters, dateRange: [new Date(filters.startDate!), new Date(filters.endDate!)] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const onReset = () => {
        form.resetFields()
        router.replace('/dashboard');
    }

    const onFinish = (values: any) => {
        const { dateRange, ..._newValues } = values;
        let newValues = {
            ..._newValues,
            startDate: initialFilters.startDate,
            endDate: initialFilters.endDate

        }
        if (dateRange && dateRange.length > 1) {
            newValues = {
                ...newValues,
                startDate: new Date(dateRange[0]).toISOString(),
                endDate: new Date(dateRange[1]).toISOString()
            }
        }
        Object.keys(newValues).forEach(key => newValues[key] === undefined ? delete newValues[key] : {});
        const queryParam = new URLSearchParams(newValues).toString();
        router.replace(`/dashboard?${queryParam}`)
    }

    return (
        <Form form={form} onFinish={onFinish} className="md:!grid md:grid-cols-2 flex flex-col gap-4 ">
            <FormItem label="Status" name={'status'}>
                <Select options={statusOptions} />
            </FormItem>
            <FormItem label="Date Range" name={'dateRange'}>
                <RangePicker className="!w-full" />
            </FormItem>
            <FormItem label="Created By" name={'createdBy'} >
                <Select options={profiles} className="w-full !text-xs" />
            </FormItem>
            <FormItem label="Assigned To" name={'assignedTo'} >
                <Select options={profiles} className="w-full !text-xs" />
            </FormItem>
            <FormItem label="Show Deleted" className="!flex md:!flex-col !flex-row" name={'isDeleted'} valuePropName="checked">
                <Checkbox />
            </FormItem>
            <div className="flex gap-4">
                <Button block htmlType="submit" type="primary">Filter</Button>
                <Button block danger onClick={onReset}>Reset</Button>
            </div>
        </Form>
    )
}
export default DashboardFilters