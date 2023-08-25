import {  Modal, } from 'antd';
import React from 'react'
import './productform.scss';
import { formFieldProduct,  } from '../constant';
import { generateForm } from '../../Login/constant';

const AddProduct = ({ isModalOpen, setIsModalOpen, formData,setFormData,handleOk,isUpdate }) => {

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