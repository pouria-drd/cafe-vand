import { Modal } from "..";
import { CategoryFormProps } from "@/types/panel";

const CategoryModalForm = (props: CategoryFormProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={
                props.type === "create"
                    ? "ایجاد دسته بندی جدید"
                    : `ویرایش دسته بندی ${props.initialData.name}`
            }></Modal>
    );
};

export default CategoryModalForm;
