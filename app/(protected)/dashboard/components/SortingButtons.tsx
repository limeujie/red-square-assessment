'use client'

import { Radio, RadioChangeEvent } from "antd"
import { sortedOptions } from "../configs";
import { useRouter } from "next/navigation";
import { DashboardFilterType } from "../types";
import { useEffect, useState } from "react";

interface SortingButtonsProps {
    queryParams: DashboardFilterType
}


const SortingButtons = ({ queryParams }: SortingButtonsProps) => {
    const [value, setValue] = useState<string>();
    const router = useRouter();
    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        const newValues: any = {
            ...queryParams,
            sortedBy: value as string
        }
        setValue(value)
        Object.keys(newValues).forEach(key => newValues[key] === undefined ? delete newValues[key] : {});
        const queryParam = new URLSearchParams(newValues).toString();
        router.replace(`/dashboard?${queryParam}`)
    };

    useEffect(() => {
        if (queryParams.sortedBy) {
            setValue(queryParams.sortedBy)
        }
    }, [queryParams.sortedBy])

    return (
        <div className="flex gap-4">
            <Radio.Group options={sortedOptions} onChange={onChange} value={value} />
        </div>)
}
export default SortingButtons