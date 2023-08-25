import { UserDeleteOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const deleteId = async (id, deleteUser) => {
    console.log(id, 'id');
    let result = await deleteUser(id)
    if (result.data.success) {
        notification.error({
            key: "deleted",
            message: `${result.data.deletedUser.username} user deleted`,
            duration: 3,
            icon: <UserDeleteOutlined />,
            style: { color: 'red' }
        })
    }
}

export const deleteProductById = async (id, deleteProduct) => {
    let res = await deleteProduct(id)
    console.log(id, res);
    if (res?.data?.success) {
        notification.error({
            key: "deleted",
            message: `${res?.data.deletedProduct.title} product deleted`,
            duration: 3,
            icon: <UserDeleteOutlined />,
            style: { color: 'red' }
        })
    }
}

export const editHandler = async (id, setisUpdate, findById, setFormData, setIsModalOpen) => {
    setisUpdate(id)
    let data = await findById(id)
    console.log(data);
    if (data?.data?.product) {
        setFormData(data.data.product)
    }
    setIsModalOpen(true)
}