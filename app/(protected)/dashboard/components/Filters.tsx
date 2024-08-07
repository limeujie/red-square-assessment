'use client'
import MyDatePicker from "@/lib/antd/DateTime";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardFilterProps, initialFilters, statusOptions } from "../configs";

interface FilterProps {
    filters: DashboardFilterProps
}
const { RangePicker } = MyDatePicker;


const DashboardFilters = ({ filters }: FilterProps) => {
    const [form] = useForm();
    const router = useRouter();
    useEffect(() => {
        form.setFieldsValue({ ...filters, dateRange: [filters.startDate, filters.endDate] });
    }, [filters]);

    const onReset = () => {
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
                startDate: dateRange[0],
                endDate: dateRange[1]
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
                <Input />
            </FormItem>
            <FormItem label="Assigned To" name={'assignedTo'} >
                <Input />
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