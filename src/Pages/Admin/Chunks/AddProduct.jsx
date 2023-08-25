import { Modal, } from 'antd';
import React from 'react'
import './productform.scss';
import { generateForm } from '../../Login/constant';
import { useGetCategoryQuery } from '../../../Service/category';

const AddProduct = ({ isModalOpen, setIsModalOpen, formData, setFormData, handleOk, isUpdate }) => {
    const { data, isSuccess, isError } = useGetCategoryQuery()
    const formFieldProduct = [
        {
            label: 'Title:',
            type: 'text',
            id: 'title',
            placeholder: 'title',
            name: "title"
        },
        {
            label: 'price:',
            type: 'number',
            id: 'price',
            placeholder: 'price',
            name: "price"
        },
        {
            label: 'description:',
            type: 'text',
            id: 'description',
            placeholder: 'description',
            name: "description"
        },
        {
            label: 'features:',
            type: 'textarea',
            id: 'features',
            placeholder: 'features',
            name: "features"
        },
        {
            label: 'category:',
            type: 'select',
            id: 'category',
            placeholder: 'category',
            name: "category",
            options: data?.result.map((item) => item.type)
        },
        {
            label: 'file:',
            type: 'file',
            id: 'file',
            placeholder: 'file',
            name: "file",
        },
    ]


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal title="Add Product +" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={isUpdate ? 'update' : 'add'}>
                <div className="form-container">
                    {formFieldProduct.map((item) => generateForm(item, formData, setFormData))}
                </div>
            </Modal>
        </>
    )
}

export default AddProduct