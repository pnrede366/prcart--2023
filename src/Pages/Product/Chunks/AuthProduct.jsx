import React, { useEffect } from 'react'
import { useGetcartsQuery } from '../../../Service/cart'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../Redux/Slice/Cart'
import ProductInfo from './ProductInfo'

const AuthProduct = ({ item, handleCart, showBtn }) => {
    const { data: cartData, isError, isLoading: isLoadingCart, refetch } = useGetcartsQuery()
    const cart = useSelector((state) => state.CartReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (cartData) {
            refetch()
            dispatch(addProduct(cartData))
        }
    }, [cartData,cart])
    return (
        <div>
            <ProductInfo data={item} cart={cart} handleCart={handleCart} showBtn={showBtn} />
        </div>
    )
}

export default AuthProduct