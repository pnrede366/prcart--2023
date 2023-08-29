import React, { useEffect, useState } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../Service/getUsers';
import { fields } from '../Signup/constant';
import { generateForm } from '../Login/constant';
import "./user.scss";
import { Button, message, notification } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../../Redux/Slice/user';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetOrderByUserQuery } from '../../Service/orders';
import { useFindProductMutation } from '../../Service/product';
import ProductInfo from '../Product/Chunks/ProductInfo';

const User = () => {
    const { data: currentUser, isSuccess, isError, error } = useGetUserByIdQuery();
    const [updateUser] = useUpdateUserMutation();
    const userReducer = useSelector((state) => state.user)
    const [userDetails, setuserDetails] = useState();
    const userField = fields.slice(0, 5);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { data: orders, refetch } = useGetOrderByUserQuery()
    const [getProducts] = useFindProductMutation()
    const [allOrders, setAllOrders] = useState([])
    // const auth = useSelector((state) => state.auth)
    useEffect(() => {
        // if (error?.data) {
        //     navigate('/login')
        // }
        if (currentUser && isSuccess && !userReducer.username) {
            setuserDetails(currentUser);
        }
        if (!userDetails) {
            setuserDetails(userReducer)
        }
        if (!userReducer.username) {
            dispatch(storeUser(currentUser));
        }
    }, [currentUser, isSuccess, dispatch]);

    useEffect(() => {
        const getOrder = async () => {
            refetch()
            const res = await getProducts(orders)
            if (res.data) {
                setAllOrders(res?.data?.product)
            }
        }
        getOrder()
    }, [orders])


    const updateHandler = async () => {
        let res = await updateUser(userDetails);
        if (res?.data?.success) {
            console.log(res.data.result);
            setuserDetails(res.data.result);
            dispatch(storeUser(res.data.result))
            notification.info({ message: 'User updated' });
        } else {
            notification.error({ message: 'Something went wrong' });
        }
    };

    return (
        <div className='user'>
            <Button onClick={() => navigate(-1)} className='back' type='primary'> <ArrowLeftOutlined /> Back</Button>
            <div className='user__form'>
                {
                    userField.map((item) => generateForm(item, userDetails, setuserDetails))
                }
                <Button type='primary' onClick={updateHandler}>Update</Button>
            </div>
            <div className='user__orders'>
                <h2>Orders</h2>
                <div className='user__orders__wrapper'>
                    {
                        allOrders.map((item) => {
                            return (
                                <div>
                                <ProductInfo data={item.product} cartBtn={false} showBtn={false} quantity={item.quantity}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default User;
