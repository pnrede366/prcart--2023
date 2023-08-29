import { Button, Modal, } from 'antd';
import React, { useEffect, useState } from 'react'
import './productform.scss';
import { generateForm } from '../../Login/constant';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ModalComp = ({ isModalOpen, setIsModalOpen, formData, setFormData, handleOk, isUpdate, title, comp, formFieldProduct, currentUser, total }) => {
    const [data, setdata] = useState()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (user) {
            setdata(user)
        }
    }, [user])

    const getText = () => {
        if (isUpdate) {
            return 'update'
        }
        else if (currentUser) {
            return 'place order'
        }
        else {
            return 'add'
        }
    }

    return (
        <>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={getText(isUpdate)}>
                {
                    comp === 'products' ?
                        <div className="form-container">
                            {formFieldProduct.map((item) => generateForm(item, formData, setFormData))}
                        </div>
                        :
                        <div className='cart__userDetails'>
                            <div className='cart__userDetails__row'> <span>username:</span>  {data?.username}</div>
                            <div className='cart__userDetails__row'> <span> name:</span> {data?.name}</div>
                            <div className='cart__userDetails__row'> <span>mobile:</span>  {data?.mobileNumber}</div>
                            <div className='cart__userDetails__row'> <span>address:</span> {data?.address}</div>
                            <div>Total Price: ₹{total}</div>
                            <Button color='#fff' type='primary' onClick={() => navigate(`/user`)}>Edit details<EditOutlined /></Button>
                        </div>
                }
            </Modal>
        </>
    )
}

export default ModalComp