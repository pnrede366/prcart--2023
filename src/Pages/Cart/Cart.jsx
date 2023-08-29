import React, { useEffect, useState } from 'react'
import "./cart.scss"
import { useDeletecartsMutation, useFindcartMutation, useGetcartsQuery } from '../../Service/cart'
import { useFindProductMutation, useGetProductsQuery } from '../../Service/product'
import ProductInfo from '../Product/Chunks/ProductInfo'
import { Button, notification } from 'antd'
import { useSelector } from 'react-redux'
import { ShoppingCartOutlined } from '@ant-design/icons'
import ModalComp from '../Admin/Chunks/ModalComp'
import { useGetUserByIdQuery } from '../../Service/getUsers'
import { useCreateordersMutation } from '../../Service/orders'
import { useNavigate } from 'react-router'
import NoDataFound from '../../Component/NoDataFound/NoDataFound'

const Cart = () => {
    const { data: cartData, isLoading, isSuccess } = useGetcartsQuery()
    const { data: productData } = useGetProductsQuery()
    const [findByIds] = useFindProductMutation()
    const [products, setproducts] = useState()
    const cartdataReducer = useSelector((state) => state.CartReducer)
    const [updateCart] = useFindcartMutation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: currentUser } = useGetUserByIdQuery()
    const [postOrder] = useCreateordersMutation()
    const [deleteOrder] = useDeletecartsMutation()
    const [total, settotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const getdata = async () => {
            if (cartData) {
                let res = await findByIds(cartData)
                if (res) {
                    setproducts(res?.data?.product)
                }
            }
        }
        getdata()
    }, [cartData, isSuccess, productData, isLoading, setproducts, currentUser])

    const checkout = () => {
        setIsModalOpen(true)
        settotal(0)
        cartdataReducer.map((item) => {
            settotal((prev) => prev + (parseInt(item.price) * parseInt(item.quantity)))
        })
        cartdataReducer.map((item) => {
            updateCart({ id: item._id, data: item })
        })
    }

    const handleOk = async () => {
        if (currentUser && cartdataReducer) {
            try {
                cartdataReducer.map(async (item) =>
                    await postOrder({ userId: currentUser?.result?.result._id, productId: item?.productId, quantity: item?.quantity, price: item?.price })
                )
                notification.info({ message: "Orders placed successfully" })
            } catch (error) {
                notification.error({ message: 'something went wrong try again later' })
                console.error("Error while posting orders:", error);
            }

            cartdataReducer.map((item) => deleteOrder({ id: item?.productId }))
            navigate('/')
        }
    }
    return (
        <div className='cart'>
            <h1>
                Cart
            </h1>
            <div className='cart__wrapper'>
                {
                    !products?.length && <NoDataFound />
                }
                {
                    products?.map((item) => {
                        return (
                            <div >
                                <ProductInfo data={item.product} showBtn={false} cartBtn={true} total={total} settotal={settotal} />
                            </div>
                        )
                    })
                }
            </div>
            <Button size='large' onClick={checkout} className='cart__checkout' disabled={!products?.length} ><ShoppingCartOutlined />Checkout</Button>
            <ModalComp total={total} isModalOpen={isModalOpen} handleOk={handleOk} setIsModalOpen={setIsModalOpen} title='Checkout' currentUser={currentUser} />

        </div>
    )
}

export default Cart