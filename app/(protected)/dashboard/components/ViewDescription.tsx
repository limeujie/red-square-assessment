import { Modal } from "antd"
import { TaskType } from "../types"
import { Dispatch, SetStateAction } from "react"

interface ViewDescriptionProps {
    item: TaskType
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;

}
const ViewDescription = ({ item, open, setOpen }: ViewDescriptionProps) => {
    const onClose = () => setOpen(false)
    return (<Modal
        title={item.task_title}
        open={open}
        destroyOnClose
        closeIcon={null}
        footer={null}
        width={'50%'}
        onCancel={onClose}>
        <div>{item.task_description}</div>
    </Modal>)
}

export default ViewDescription